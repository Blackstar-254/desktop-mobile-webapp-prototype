import { getUnique } from '../utils/global_reference.js';
import { make_query } from './common_queries.js';

export let users = getUnique('db:users', () => {
  /**
   * @typedef {{organisations_id: number,
   *      organisations_created_at: Date,
   *      organisations_updated_at: Date,
   *      name: string,
   *      address: string,
   *      domain_name: string,
   *      client_id: string,
   *      contact_information: Record<string,any>,
   *      social_media_integration: Record<string,any>[]}} organisation_row
   */

  /**
   *
   * @type{Record<string,{}>}
   */
  let users = {};
  make_query(`select * from billing.organisations`).then((db_req_01) => {
    /**
     * @type {organisation_row[]}
     */
    let db_resp_01 = db_req_01;

    console.log({ db_req_01 });
    db_resp_01.map((user_row) => {
      users[user_row.client_id] = user_row;
    });
  });

  return users;
});
