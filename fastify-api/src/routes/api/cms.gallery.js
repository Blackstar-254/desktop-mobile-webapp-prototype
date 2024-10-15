import { users } from '../../lib/db/users.js';
import fs from 'fs';
import { getUnique } from '../../lib/utils/global_reference.js';

/**
 * @type {Record<string, RouteHandlerMethod>}
 */
export const gallery_routes = {
  '/api/cms/gallery': async function handler(request, reply) {
    const { body, method, url, headers } = request;
    const { 'client-id': client_id, 'visitor-id': visitor_id } = headers;

    if (!client_id || !visitor_id) {
      return { success: false };
    }

    const user = users.data[client_id];
    const { metadata, valid } = await setup_gallery(client_id);

    console.log({ method, url, headers, user, client_id });
    return { success: false };
  },
};

/**
 * @typedef {{
 *  client_id:string
 *  photos: Array<{name:string,route:string,uuid?:string}>
 * }} metadata_t
 *
 * @type {(client_id:string)=>({valid:boolean, metadata:Record<string,any> & Partial<metadata_t> })}}
 */

var setup_gallery = async (client_id) => {
  const gallery_static_dir = `public/gallery/${client_id}`;
  if (!fs.existsSync(gallery_static_dir)) {
    fs.mkdirSync(gallery_static_dir, { recursive: true });
    console.log(`successfully mkdir ${gallery_static_dir}`);
  }
  /**
   * @type {metadata_t}
   */
  let metadata = {
    client_id,
    photos: [],
  };
  const metadata_filename = `${gallery_static_dir}/metadata`;
  if (fs.existsSync(metadata_filename)) {
    const filedata = fs.readFileSync(metadata_filename, {
      encoding: 'utf-8',
      flag: 'r',
    });
    try {
      const tmp = JSON.parse(filedata);
      Object.keys(tmp).map((key) => {
        metadata[key] = tmp[key];
      });
      // console.log({ metadata });
    } catch (err) {
      console.error({ err, loc: 'setup_gallery' });
    }
  }

  const files = fs.readdirSync(gallery_static_dir, {
    recursive: true,
    withFileTypes: true,
  });

  files
    .filter((v) => {
      if (v.name === 'metadata') {
        return false;
      }
      const ext = v.name.toLowerCase().split('.').pop();
      for (const file_ext of [
        'jpg',
        'png',
        'jpeg',
        'webp',
        'mp3',
        'mp4',
        'tiff',
      ]) {
        if (ext === file_ext) {
          return true;
        }
      }

      return false;
    })
    .map((file, i) => {
      console.log({ file });
    });

  fs.writeFileSync(metadata_filename, JSON.stringify(metadata, null, 2), {
    encoding: 'utf-8',
    flag: 'w',
  });

  return {
    valid: true,
    metadata,
  };
};
