//@ts-nocheck

function searchArrays(searchString, allBusinesses, allServices) {
  const matchingItems = []

  allBusinesses.forEach((business) => {
    if (business.name.includes(searchString)) {
      matchingItems.push(business)
    }
  })

  allServices.forEach((service) => {
    if (service.name.includes(searchString)) {
      matchingItems.push(service)
    }
  })

  return matchingItems
}

export default searchArrays
