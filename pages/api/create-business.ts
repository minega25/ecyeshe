import { NextApiRequest, NextApiResponse } from 'next'
import { createBusiness } from 'src/graphql/mutations'
import { graphQLClient } from '../../src/lib/graphql-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data } = req.body
  let result = null
  try {
    const result = await graphQLClient.request(createBusiness, { data })
  } catch (error) {
    console.error(error)
  }

  return res.json(result)
}
