declare global {
	namespace App {
		interface Locals {
			/** DTU-brugernavn for en logget-ind superuser, ellers null. */
			user: string | null;
		}
	}
}

export {};
