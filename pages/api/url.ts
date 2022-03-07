// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getUrl } from '../../util/atlasdb'

type Data = {
    url?: string,
    short?: string,
    status: string
}

const shorten = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (!req.body.short) {
        res.status(400).json({ status: "No short provided" })
    }

    const url = await getUrl(req.body.short)
    res.status(200).json({ url: url, short: req.body.short, status: "Successfully retrieved URL" })
}

export default shorten
