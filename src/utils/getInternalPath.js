const getInternalPath = (node) => {
  let category = ''
  switch (node?.internal?.type ?? '') {
    case 'ContentfulJob':
      category = 'allasok/'
      break
    case 'ContentfulNews':
      category = 'hirek/'
      break
    case 'ContentfulPost':
      category = 'gondolatok/'
      break
    case 'ContentfulPersonell':
      category = 'iskola/'
      break
    case 'ContentfulImageGallery':
      category = 'galeria/'
      break
    case 'ContentfulPage':
    default:
  }

  return `/${category}${node.slug}`
}

export default getInternalPath
