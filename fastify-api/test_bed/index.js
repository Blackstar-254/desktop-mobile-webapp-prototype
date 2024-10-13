import * as db from '../src/lib/db/common_queries.js';

console.log('testbed');

const get_all_organisations = await db.make_query(
  db.queries_object.GetAllOrganisations.query_string,
);
console.log({ get_all_organisations });
