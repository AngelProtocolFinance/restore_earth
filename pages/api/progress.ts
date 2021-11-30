// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  totalUsd: string;
  lastUpdated: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(500)
    .json({ totalUsd: "40000.42", lastUpdated: "2021-11-29 22:44:04" });
}
