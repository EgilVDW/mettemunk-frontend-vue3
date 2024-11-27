// import { Handler } from "@netlify/functions";
import axios from "axios";

const mcRegion = process.env.MC_REGION;
const mailChimpListID = process.env.MC_LIST_ID;
const mailChimpAPI = process.env.MC_API;

export const handler: any = async (event: any) => {
	// data and error message declaration
	let errorMessage = null;
	const formData = JSON.parse(event.body);
	const email = formData.email;	
	// if api is called witout data
	if (!formData) {
		errorMessage = "No form data supplied";
		throwError(errorMessage);
	}
	
	// if api is called witout email
	if (!email) {
		errorMessage = "No emailaddress supplied";
		throwError(errorMessage);
	}
	
	// if process env variables is missing
	if (!mailChimpListID) {
		errorMessage = "No LIST_ID supplied";
		throwError(errorMessage);
	}
	
	const data = {
		full_name: `${formData.firstName} ${formData.lastName}`,
		email_address: email,
		tags: [formData.business],
		status: "subscribed",
		merge_fields:
		{
            FNAME: `${formData.firstName}`,
            LNAME: `${formData.lastName}`
		}
	};

	const response = await axios
		.put(
			`https://${mcRegion}.api.mailchimp.com/3.0/lists/${mailChimpListID}/members/${email}`,
			data,
			{
				auth: {
					username: `anystring`,
					password: `${mailChimpAPI}`,
				},
			}
		)
		.then(() => {
			// SUCCESS
			return {
				statusCode: 200,
				body: JSON.stringify({
					status: "New contact saved",
				}),
			};
		})
		.catch((err) => {
			throw new Error(JSON.stringify(err));
		});

	return response;
	// call mailchimp api
};

const throwError = (errorMessage: string) => {
	throw new Error(
		JSON.stringify({
			statusCode: 500,
			body: {
				message: `${errorMessage}`,
			},
		})
	);
};
