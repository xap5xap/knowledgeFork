import { NextApiRequest, NextApiResponse } from "next";

import { getStats } from "../../lib/stats";
import { StatsSchema } from "../../src/knowledgeTypes";

async function handler(req: NextApiRequest, res: NextApiResponse<StatsSchema>) {
  try {
    const stats = await getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
}

export default handler;
