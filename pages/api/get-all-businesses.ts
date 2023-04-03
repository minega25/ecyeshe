import { NextApiRequest, NextApiResponse } from 'next'
import { getAllBusinesses } from 'src/graphql/queries'
import { graphQLClient } from '../../src/lib/graphql-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let result = null
  try {
    result = await graphQLClient.request(getAllBusinesses)
  } catch (error) {
    console.error(error)
  }

  return res.json(result)
}
