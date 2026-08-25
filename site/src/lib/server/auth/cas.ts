/**
 * DTU CAS (auth.dtu.dk) - protokol 2.
 * Flow: redirect til loginUrl(service) -> CAS sender brugeren tilbage til
 * service?ticket=ST-... -> validateTicket(service, ticket) -> brugernavn.
 * Service-URL'en SKAL vaere identisk i begge kald.
 */
const CAS_BASE = 'https://auth.dtu.dk/dtu';

export const loginUrl = (service: string) => `${CAS_BASE}/?service=${encodeURIComponent(service)}`;
export const logoutUrl = () => `${CAS_BASE}/logout`;

export type CasUser = { username: string; name?: string; mail?: string };

const pick = (xml: string, tag: string) =>
	xml.match(new RegExp(`<(?:cas:)?${tag}[^>]*>([^<]*)</(?:cas:)?${tag}>`, 'i'))?.[1]?.trim();

export async function validateTicket(service: string, ticket: string): Promise<CasUser | null> {
	const url = `${CAS_BASE}/serviceValidate?service=${encodeURIComponent(service)}&ticket=${encodeURIComponent(ticket)}`;
	const res = await fetch(url);
	const xml = await res.text();
	if (!/authenticationSuccess/i.test(xml)) return null;
	const username = pick(xml, 'user')?.toLowerCase();
	if (!username) return null;
	return { username, name: pick(xml, 'cn') ?? pick(xml, 'displayName'), mail: pick(xml, 'mail') };
}
