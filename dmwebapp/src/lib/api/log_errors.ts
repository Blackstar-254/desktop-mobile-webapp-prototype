export type log_type = Record<string, any> & {
	loc: string;
	message: string;
	error?: Record<string, any>;
};

export const send_log = async (log: log_type) => {
	await fetch("/api/cms/log", {
		method: "POST",
		body: JSON.stringify({
			...log,
			time: new Date(),
		}),
	})
		.then((res) => res.json())
		.then((res) => {
			const { success } = res;
			if (!success) {
				setTimeout(() => send_log(log), 1000 * 5);
				return;
			}
			console.log(log);
		})
		.catch((e: any) => {
			const new_log = {
				loc: "send_log",
				message: "error sending log",
				parent: log,
			};
			setTimeout(() => send_log(new_log), 1000 * 5);
			console.log(new_log);
		});
};
