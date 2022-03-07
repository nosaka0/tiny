// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ping } from '../../util/atlasdb'

type Data = {
    status: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await ping()
    res.status(200).json({ status: 'Successfully connected to Atlas' })
}

export default handler
