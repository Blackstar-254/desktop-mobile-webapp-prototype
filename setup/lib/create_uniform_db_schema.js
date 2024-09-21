const cp = require("node:child_process");
const fs = require("node:fs");

try {
	if (fs.existsSync("golang_api/src/lib/db_access/sql/schema")) {
		cp.execSync(
			"cd golang_api/src/lib/db_access/sql && rm -r schema",
		).toString();
	}
	if (fs.existsSync("database_management/schema")) {
		cp.execSync("cd database_management && rm -r schema ").toString();
	}
	cp.execSync("cd database_management && npm run db:generate").toString();
	console.log("successfully generated db schema");
} catch (err) {
	console.log(err);
	process.exit(-1);
}

/**
 * @typedef {{
 *  full_path:string
 * index:number
 * name:string
 * dir_path:string
 * new_path?:string
 * new_dirpath?:string
 * } }path_item
 */

/**
 *
 * @type {path_item}
 */
let latest_schema;

/**
 * @type {path_item[]}
 */
const schemas = fs
	.readdirSync("./database_management", {
		withFileTypes: true,
		recursive: true,
	})
	.filter((v) => !v.path.includes("node_modules") && v.isFile())
	.filter(
		(v) =>
			v.path.includes("schema") &&
			((v.name.endsWith(".ts") && !v.name.endsWith(".d.ts")) ||
				v.name.endsWith(".sql")),
	)
	.map((v, i) => {
		return {
			full_path: `${v.path}/${v.name}`.replaceAll("\\", "/"),
			dir_path: v.path.replaceAll("\\", "/"),
			index: i,
			name: v.name,
		};
	})
	.map((v) => {
		/**
		 * @type {path_item}
		 */
		const curr = v;

		if (v.name.endsWith(".ts")) {
			curr.new_path = curr.full_path.replace(
				"database_management/src/schema",
				"dmwebapp/src/server/db/schema",
			);
		} else if (v.name.endsWith(".sql")) {
			curr.new_path = curr.full_path.replace(
				"database_management/schema",
				"golang_api/src/lib/db_access/sql/schema",
			);
			latest_schema = curr;
		}
		if (curr.new_path) {
			curr.new_dirpath = curr.new_path.split("/").slice(0, -1).join("/");
		}
		return {
			...curr,
		};
	});

// copy ts schemas to

let data = "";

schemas.map((v, _i) => {
	// if (i > 0) {
	//   return
	// }
	console.log("printed new schema file", {
		file_path: v.new_path,
	});
	if (v?.new_dirpath && !fs.existsSync(v.new_dirpath)) {
		fs.mkdirSync(v.new_dirpath, { recursive: true });
		console.log(`make new directory: ${v.new_dirpath}`);
	}
	try {
		// const res = cp.execSync(`cp ${v.full_path} ${v.new_path}`)
		data = fs.readFileSync(v.full_path, { encoding: "utf-8", flag: "r" });
		fs.writeFileSync(v.new_path, data, { encoding: "utf-8", flag: "w+" });
		console.log(`created new file: ${v.new_path}`);
	} catch (e) {
		console.log("error");
		console.error(e);
		process.exit(-1);
	}
});

console.log("completed creating schema files in webapp and golang api");

{
	const b = fs
		.readFileSync(latest_schema.new_path, { encoding: "utf-8", flag: "r" })
		.toString()
		.split("\n");
	let skip = false;
	let break_point = false;
	const d = b
		.map((v) => {
			const a = v.trim();
			if (
				(a.toLowerCase().includes("table") &&
					a.toLowerCase().includes("create")) ||
				(a.toLowerCase().includes("schema") &&
					a.toLowerCase().includes("create"))
			) {
				skip = true;
			}
			if (skip === true) {
				if (a.endsWith(";")) {
					skip = false;
				}
				return "";
			}

			return a;
		})
		.filter((v) => v.length)
		.filter((v) => {
			const small_v = v.toLowerCase();
			for (const banned_word of ["do", "exception", "when", "end"]) {
				if (small_v.startsWith(banned_word)) {
					return false;
				}
			}
			if (break_point) {
				if (small_v.includes("statement-breakpoint")) {
					return false;
				}
				break_point = false;
				return true;
			}
			if (small_v.includes("statement-breakpoint")) {
				break_point = true;
				return true;
			}

			return true;
		});

	fs.writeFileSync(
		`${latest_schema.new_dirpath}/constraints_schema.sql`,
		d.join("\n"),
		{
			encoding: "utf-8",
			flag: "w+",
		},
	);
	// console.log(d)
}

try {
	cp.execSync("cd golang_api/src && sqlc generate").toString();
	console.log("successfully generated golang db file types");
} catch (err) {
	console.log("error");
	console.error(err);
	process.exit(-1);
}
