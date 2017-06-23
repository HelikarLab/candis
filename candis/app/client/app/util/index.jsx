// TODO: can be written better.
const filterFiles = (resource, filter = null) => {
  let collection  = [ ]

  resource.files.forEach((file) => {
    if ( filter == null || filter.includes(file.format) ) {
      collection.push({...file, path: resource.path})
    }
  })

  resource.dirs.map((dir) => {
    return { path: dir.resource.path, files: filterFiles(dir.resource) }
  })
  .forEach(({ path, files }) => {
    files.forEach((file) => {
      if ( filter == null || filter.includes(file.format) ) {
        collection.push({...file, path: path})
      }
    })
  })

  return collection
}

export { filterFiles }
