import { users } from '../../lib/db/users.js';
import fs from 'fs';
import { getUnique } from '../../lib/utils/global_reference.js';
import { make_query } from '../../lib/db/common_queries.js';
import { z } from 'zod';

const parse_uuid = z.string().uuid();

/**
 * @type {Record<string, RouteHandlerMethod>}
 */
export const gallery_routes = {
  'GET,POST|/api/cms/gallery': async function handler(request, reply) {
    const { body, method, url, headers } = request;
    const [client_id, visitor_id] = [
      headers['client-id'],
      headers['visitor-id'],
    ];

    if (
      !client_id ||
      !visitor_id ||
      !parse_uuid.safeParse(client_id).success ||
      !parse_uuid.safeParse(visitor_id).success
    ) {
      console.log(`client_id: ${client_id}, visitor-id: ${visitor_id}`);
      console.log({ headers });
      return { success: false };
    }

    const user = users.data[client_id];
    switch (method) {
      case 'GET':
        {
          const { metadata, valid } = await setup_gallery(client_id);
          return { success: true, metadata };
        }
        break;
      case 'POST': {
        /** @type {Record<string,any>} */
        let Data = {};
        try {
          const tmp = JSON.parse(body);
          Object.keys(tmp).map((key) => {
            Data[key] = tmp[key];
          });
          console.log({ Data, tmp });
        } catch (err) {
          console.log({
            headers,
            error: err,
          });
        }
      }
    }

    console.log({ method, url, headers, user, client_id });
    return { success: false };
  },
};

/**
 * @typedef {{
 * name:string,
 * url:string,
 * uuid:string
 * size:number
 * type:string
 *  label: string
 * url: string
 * alt: string
 * }} photo_t
 *
 * @typedef {{
 *  client_id:string
 *  photos: Array<photo_t>
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
  let make_write = false;
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
  } else {
    make_write = true;
  }

  const files = fs.readdirSync(gallery_static_dir, {
    recursive: true,
    withFileTypes: true,
  });

  /**
   * @type {Record<string,photo_t>}
   *
   */
  let unique_file = {};
  metadata.photos.map((value) => {
    unique_file[value.url] = value;
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
    .filter((v) => v.parentPath.includes(client_id))
    .map((file, i) => {
      let file_p = `${file.parentPath}/${file.name}`;
      console.log({ file_p });
      const url = file_p.slice('public/'.length);
      if (unique_file[url]) {
        return;
      }

      const stats = fs.statSync(file_p);
      unique_file[url] = {
        name: file.name,
        url,
        uuid: crypto.randomUUID(),
        size: stats.size,
        label: '',
        alt: '',
      };
      make_write = true;
    });

  if (make_write) {
    metadata.photos = [...Object.values(unique_file)];

    fs.writeFileSync(metadata_filename, JSON.stringify(metadata, null, 2), {
      encoding: 'utf-8',
      flag: 'w',
    });
  }

  return {
    valid: true,
    metadata,
  };
};
