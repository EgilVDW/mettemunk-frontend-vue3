import { GraphQLClient } from "graphql-request";

declare interface IVariablesObject {
	limit?: number;
}

export async function request(query: string, variables: IVariablesObject): Promise<any> {
	const endpoint = `https://graphql.datocms.com/`;
	const client = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer 7e14bb36a56f472af689be530bc110`,
		},
	});

	const response = await client.rawRequest(query, variables);

	if (response.status === 429) {
		const resetHeader = response.headers.get("X-RateLimit-Reset");
		let retryTimeoutSeconds = parseInt(resetHeader || "3");
		if (isNaN(retryTimeoutSeconds)) {
			retryTimeoutSeconds = 3;
		}

		retryTimeoutSeconds++;

		console.error(`Request limit hit. Retry in ${retryTimeoutSeconds} seconds.`);

		// eslint-disable-next-line promise/param-names
		await new Promise((r) => setTimeout(r, retryTimeoutSeconds * 1000));

		return await request(query, variables);
	} else {
		return response.data;
	}
}
