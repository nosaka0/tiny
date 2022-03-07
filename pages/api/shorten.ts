// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createDoc } from '../../util/atlasdb'

type Data = {
    url?: string,
    short?: string,
    status: string
}

const shorten = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    if (!req.body.url) {
        res.status(400).json({ status: "No url provided" })
    }
    const short = await createDoc(req.body.url)
    res.status(200).json({ url: req.body.url, short: short, status: "Sucessfully shortened URL" })
}

export default shorten
