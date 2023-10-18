/** @type {import('./$types').PageLoad} */
import { SECRET_API_KEY } from '$env/static/private';

export function load() {
	return {
		apikey: SECRET_API_KEY
	};
}
