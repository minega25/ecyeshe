import { NextApiRequest, NextApiResponse } from 'next'
import { updateBusiness } from 'src/graphql/mutations'
import { graphQLClient } from '../../src/lib/graphql-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data, id } = JSON.parse(req.body)
  let result = null
  try {
    result = await graphQLClient.request(updateBusiness, {
      data: { ...data },
      id,
    })
  } catch (error) {
    console.error(error)
  }

  return res.json(result)
}
