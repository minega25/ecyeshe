import { NextApiRequest, NextApiResponse } from 'next'
import { getBusinessInfo } from 'src/graphql/queries'
import { graphQLClient } from '../../src/lib/graphql-client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email } = JSON.parse(req.body)
  let result = null
  try {
    result = await graphQLClient.request(getBusinessInfo, {
      email,
    })
  } catch (error) {
    console.error(error)
  }

  return res.json(result)
}
