const fs = require('fs')
const invalid_files_folders = ['.git', 'node_modules', 'tmp']

/**
 * @typedef {{
 *   index: number,
 *   name: string,
 *   parentPath: string,
 *   path: string,
 *   [Symbol(type)]: 1
 * }} read_dir_item
 */

/**
 * @type {{
 * files_list: read_dir_item[],
 * directory_structure: Record<string,any>
 * }}
 */
const file_structure = {
  files_list: [],
  directory_structure: {},
}

file_structure.files_list = fs
  .readdirSync('.', {
    recursive: true,
    withFileTypes: true,
  })
  .filter((v) => {
    for (const invalid of invalid_files_folders) {
      if (v.name.includes(invalid)) {
        return false
      }
      if (v.parentPath.includes(invalid)) {
        return false
      }
    }

    return true
  })
  .map((file_folder, i) => {
    file_folder.parentPath = file_folder.parentPath.split('\\').join('/')

    return {
      index: i,
      ...file_folder,
      path: `${file_folder.parentPath.length ? `${file_folder.parentPath}/` : ``}${file_folder.name}`,
    }
  })
  .map((v) => {
    const split_p = v.path.split('/')
    let item
    for (let i = split_p.length - 1, j = 0; j < i; j++) {
      item = file_structure.directory_structure[split_p[j]]
    }

    return v
  })

const place_holder = 'place_holder'

// file_structure.files_list.map((v) => console.log(v))

module.exports = {
  place_holder,
  file_structure,
}
