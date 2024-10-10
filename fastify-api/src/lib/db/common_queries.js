import { z } from 'zod';
const parse_uuid = z.string().uuid();
/**
 * @typedef {{name:string, query_string:string}|{name:string, query_gen:(...any)=>string}} query_type
 */

/**
 * @type {Record<string,query_type>}
 */
export const queries_object = {
  GetAllOrganisations: {
    name: 'GetAllOrganisations',
    query_string: `select * from "billing".organisations`,
  },
  GetVisitMetadata: {
    name: 'GetVisitMetadata',
    query_gen: (visitor_id) => {
      parse_uuid.parse(visitor_id);
      return `select * from user_accounts.visits 
where visitor_id = ${visitor_id}
limit 1`;
    },
  },
  GetSessionTokens: {
    name: 'GetSessionTokens',
    query_string: `select session_token, user_id, expires, "name", email, email_verified, image, client_org, contact_info from user_accounts."session" 
right JOIN user_accounts."user" ON session.user_id = user_accounts."user".id
where session.expires > NOW()`,
  },
};
