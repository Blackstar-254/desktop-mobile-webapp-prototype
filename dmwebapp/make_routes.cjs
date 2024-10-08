const dotenv = require("dotenv");
const { z } = require("zod");
const nodeEnvSchema = z
	.enum(["development", "test", "production", "debug"])
	.default("development");
dotenv.config();
const envSchema = z.object({
	NODE_ENV: nodeEnvSchema,
});
const env = envSchema.parse(process.env);

const fs = require("node:fs") /** @type {import("fs")} */;
const in_development = false;
const print_routes = false;

/** @type {string[]} */
const valid_resources_list = ["png", "css", "jpg", "js", "ico", "webp"];

/**
 * @typedef {import("fs").Dirent} Dirent
 */

/**@type {string[]} */
const valid_directories = ["public", "src/pages"].map((v) => v.toLowerCase());
/**@type {string[]} */
const invalid_directories = ["node_modules", ".git", ".next"].map((v) =>
	v.toLowerCase(),
);

/**
 * @typedef {{
 * linux_path:string
 * dir_ent:fs.Dirent
 * }} file_item
 */

/**
 * @type {file_item[]}
 */
const all_files_list = fs
	.readdirSync(".", {
		encoding: "utf-8",
		recursive: true,
		withFileTypes: true,
	})
	.map((v) => {
		if (in_development) console.log("going through: ", v);
		return {
			dir_ent: v,
			linux_path: v.parentPath.replaceAll("\\", "/"),
		};
	})
	.filter((v) => {
		const linux_path = v.linux_path.toLowerCase();
		if (!v.dir_ent.isFile()) {
			return false;
		}

		for (const dir of invalid_directories) {
			if (linux_path.includes(dir)) {
				return false;
			}
		}

		for (const dir of valid_directories) {
			if (linux_path.includes(dir)) {
				return true;
			}
		}

		if (v.dir_ent.name.toLowerCase().includes(".tsx")) {
			if (in_development) console.log("missing:", { ...v });
		}
		return false;
	});

/**
 * @param {string} p_
 * @param {string} slice_prefix
 */
const path_after = (p_, slice_prefix) => {
	if (slice_prefix.length >= p_.length) {
		if (p_ !== slice_prefix) {
			throw Error(
				JSON.stringify(
					{
						p_,
						slice_prefix,
						message: "slice_prefix is too long or p_ is too short",
					},
					null,
					2,
				),
			);
		}
	}

	const b = p_
		.slice(slice_prefix.length + 1)
		.split("/")
		.map((v) => v.trim())
		.filter((v) => v.length);
	if (in_development) console.log({ p_, slice_prefix, b });
	return b;
};
/**
 * @type {Record<string,string|object>}
 */
const routes = {};

/**
 * @type {Record<string,string|object>}
 */
const resource_urls = {};

/** @typedef {{
 * source:string
 * destination:string
 * permanent:boolean
 * }} redirect_instruction */
/** @typedef {{
 * source:string
 * destination:string
 * }} rewrite_instruction */

/**
 * @type {{
 * redirects:redirect_instruction[],
 * rewrites:rewrite_instruction[]}}
 */
const reroutes = {
	redirects: [],
	rewrites: [],
};

if (env.NODE_ENV === "development") {
	all_files_list
		.filter(
			({ dir_ent: v }) =>
				v.isFile() &&
				(v.name.endsWith(".tsx") ||
					(v.parentPath.includes("api") && v.name.endsWith(".ts"))),
		)
		.map((v) => {
			const j = path_after(v.linux_path, "src/pages");
			if (in_development) console.log({ v, j });

			executor(j, "src/pages", v, routes);
		});

	all_files_list
		.filter(
			({ dir_ent: v }) =>
				v.isFile() && (v.name.endsWith(".html") || v.name.endsWith(".htm")),
		)
		.map((v) => {
			const j = path_after(v.linux_path, "public");
			if (in_development) console.log({ v, j });
			// console.log({v,j})

			executor(j, "public", v, routes);
		});

	{
		const routes_json_path = "./src/lib/utils/routes.json";

		if (fs.existsSync(routes_json_path)) {
			fs.rmSync(routes_json_path);
		}
		fs.writeFileSync(routes_json_path, JSON.stringify(routes, null, 4), {
			encoding: "utf-8",
			flag: "w",
		});
	}

	all_files_list
		.filter(({ dir_ent: v }) => {
			if (!v.isFile()) {
				return false;
			}
			for (const f of valid_resources_list) {
				if (v.name.endsWith(`.${f}`)) {
					return true;
				}
			}
			return false;
		})
		.map((v) => {
			const j = path_after(v.linux_path, "public");
			if (in_development) console.log({ v, j });
			// console.log({v,j})

			executor_resource_urls(j, "public", v, resource_urls);
		});

	{
		const resources_urls_json_path = "./src/lib/utils/resources_urls.json";

		if (fs.existsSync(resources_urls_json_path)) {
			fs.rmSync(resources_urls_json_path);
		}
		fs.writeFileSync(
			resources_urls_json_path,
			JSON.stringify(resource_urls, null, 4),
			{
				encoding: "utf-8",
				flag: "w",
			},
		);
	}

	all_files_list
		.filter((v) => {
			if (v.dir_ent.name.includes(".htm")) {
				return true;
			}
			return false;
		})
		.map((v) => {
			const subpath = v.linux_path.slice("public".length);
			const f_name = v.dir_ent.name;
			let route_path = f_name.includes("index")
				? subpath
				: `${subpath}/${f_name.split(".")?.shift() ?? ""}`;
			reroutes.rewrites.push({
				source: route_path,
				destination: `${subpath}/${f_name}`,
			});
		});

	all_files_list
		.filter(({ dir_ent: v }) => {
			if (!v.isFile()) {
				return false;
			}
			for (const f of valid_resources_list) {
				if (v.name.endsWith(`.${f}`)) {
					return true;
				}
			}
			return false;
		})
		.map((v) => {
			const subpath = v.linux_path.slice("public".length);
			const f_name = v.dir_ent.name;
			let route_path = f_name.includes("index.htm")
				? subpath
				: `${subpath}/${f_name}`;
			reroutes.redirects.push({
				source: route_path,
				destination: `${subpath}/${f_name}`,
				permanent: true,
			});
			if (v.linux_path.includes("test")) {
				reroutes.redirects.push({
					source: route_path.slice("/test".length),
					destination: `${subpath}/${f_name}`,
					permanent: true,
				});
			}
		});
	{
		const reroutes_json_path = "./src/lib/utils/reroutes.json";

		if (fs.existsSync(reroutes_json_path)) {
			fs.rmSync(reroutes_json_path);
		}
		fs.writeFileSync(reroutes_json_path, JSON.stringify(reroutes, null, 4), {
			encoding: "utf-8",
			flag: "w",
		});
	}
}
if (in_development || print_routes)
	console.log(JSON.stringify({ routes, resource_urls, reroutes }, null, 4));
module.exports = {
	routes,
	resource_urls,
	reroutes,
	ping() {
		if (in_development) console.log("ping");
	},
	print() {
		if (in_development) console.log(routes);
	},
};

/**
 *
 * @param {string[]} paths
 * @param {string} path_after_s
 * @param {file_item} dirent
 * @param {Record<string,string|object>} grimace
 * @return {object}
 */
function executor(paths, path_after_s, dirent, grimace) {
	const first_item_in_paths = paths.shift();
	// console.log({grimace, paths, name, n})
	if (!first_item_in_paths && !paths.length) {
		const f_name = dirent.dir_ent.name;
		const file_name = f_name.slice(0, f_name.lastIndexOf("."));
		if (!file_name) {
			throw new Error("invalid name");
		}

		const sub_path = path_after(dirent.linux_path, path_after_s).join("/");
		const url_link = `${sub_path ? `/${sub_path}` : ""}${file_name !== "index" ? `/${file_name}` : ""}`;
		grimace[file_name] = url_link === "" ? "/" : url_link;

		if (in_development) {
			console.log({
				first_item_in_paths,
				sub_path,
				url_link,
				grimace,
				...dirent,
			});
		}
		return grimace;
	}

	if (first_item_in_paths) {
		if (!grimace[first_item_in_paths]) {
			grimace[first_item_in_paths] = {};
		}

		grimace[first_item_in_paths] = executor(
			paths,
			path_after_s,
			dirent,
			/** @type {Record<string,string|object>} */ (
				grimace[first_item_in_paths]
			),
		);
		return grimace;
	}

	return {};
}

/**
 *
 * @param {string[]} paths
 * @param {string} path_after_s
 * @param {file_item} dirent
 * @param {Record<string,string|object>} grimace
 * @return {object}
 */
function executor_resource_urls(paths, path_after_s, dirent, grimace) {
	const first_item_in_paths = paths.shift();
	if (in_development && print_routes)
		console.log(
			JSON.stringify({ paths, first_item_in_paths, dirent }, null, 4),
		);
	if (!first_item_in_paths && !paths.length) {
		const f_name = dirent.dir_ent.name;
		const file_name = f_name.slice(0, f_name.lastIndexOf("."));
		if (!file_name) {
			throw new Error("invalid name");
		}

		const sub_path = path_after(dirent.linux_path, path_after_s).join("/");
		const url_link = `${sub_path ? `/${sub_path}` : ""}/${dirent.dir_ent.name}`;
		grimace[file_name] = url_link === "" ? "/" : url_link;

		if (in_development) {
			console.log({
				first_item_in_paths,
				sub_path,
				url_link,
				grimace,
				...dirent,
			});
		}
		return grimace;
	}

	if (first_item_in_paths) {
		if (!grimace[first_item_in_paths]) {
			grimace[first_item_in_paths] = {};
		}

		grimace[first_item_in_paths] = executor_resource_urls(
			paths,
			path_after_s,
			dirent,
			/** @type {Record<string,string|object>} */ (
				grimace[first_item_in_paths]
			),
		);
		return grimace;
	}

	return {};
}
