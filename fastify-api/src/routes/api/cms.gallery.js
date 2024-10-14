import { users } from '../../lib/db/users.js';
import fs from 'fs';
import { getUnique } from '../../lib/utils/global_reference.js';

const setup_gallery = getUnique('setup:gallery', () => {
  /**
   * @typedef {import("fastify").RouteHandlerMethod} RouteHandlerMethod
   *
   */

  const gallery_static_dir = 'public/gallery';
  if (!fs.existsSync(gallery_static_dir)) {
    fs.mkdirSync(gallery_static_dir, { recursive: true });
  }

  Object.keys(users.data).map((user_id, i) => {
    const gallery_user_dir = `${gallery_static_dir}/${user_id}`;
    if (!fs.existsSync(gallery_user_dir)) {
      fs.mkdirSync(gallery_user_dir, { recursive: true });
    }

    const metadata_file_name = `${gallery_user_dir}/metadata`;

    /**
     * @type {Record<string,any>& {
     *    user_id:string
     * }}
     */
    let metadata = {
      user_id,
    };
    if (!fs.existsSync(metadata_file_name)) {
      fs.writeFileSync(metadata_file_name, JSON.stringify(metadata, null, 4), {
        flag: 'w',
        encoding: 'utf-8',
      });
      console.log(`created file: ${metadata_file_name}`);
    }
  });

  return 'done';
});

/**
 * @type {Record<string, RouteHandlerMethod>}
 */
export const gallery_routes = {
  '/api/cms/gallery': async function handler(request, reply) {
    if (!setup_gallery?.data) {
      console.log('refreshing gallery');
      setup_gallery.refresh();
    }
    const { body, method, url, headers } = request;
    const { 'client-id': client_id, 'visitor-id': visitor_id } = headers;

    if (!client_id || !visitor_id) {
      return { success: false };
    }
    const user = users.data[client_id];

    console.log({ method, url, headers, user, client_id });
    return { success: false };
  },
};
