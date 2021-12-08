// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const response = {
  Items: [
    { totalDonation: 3662.199612157163, allianceMember: "ApolloDAO" },
    { totalDonation: 7526.344343580001, allianceMember: "Flipside Crypto" },
    { totalDonation: 3113.0886494200004, allianceMember: "Kujira" },
    { totalDonation: 1.00449468, allianceMember: "OnePlanet" },
    { totalDonation: 202.62604986, allianceMember: "Loop" },
    { totalDonation: 215.96786342608203, allianceMember: "White Whale" },
    { totalDonation: 501.29825999999997, allianceMember: "Deviants NFT " },
    {
      totalDonation: 1203.8178959999998,
      allianceMember: "La Femme Collective",
    },
    { totalDonation: 101.48165663, allianceMember: "Tiiik" },
    { totalDonation: 503.29982046, allianceMember: "HERO NFT" },
    { totalDonation: 300.889212, allianceMember: "Talis" },
    { totalDonation: 2885.3571277349997, allianceMember: "Astronorcs NFT" },
    { totalDonation: 110.22794090000001, allianceMember: "Kash" },
    { totalDonation: 876.6499259904941, allianceMember: "Tales of Terra NFT" },
    { totalDonation: 503.63511928297555, allianceMember: "Alice" },
    { totalDonation: 250.6412175, allianceMember: "Gavert NFT" },
    { totalDonation: 200.60727599999998, allianceMember: "LunaDoctors NFT" },
    { totalDonation: 20.0583186, allianceMember: "Tsunami Protocol" },
    { totalDonation: 1520.65336847, allianceMember: "TerraBites" },
    { totalDonation: 100.26660999999999, allianceMember: "Astral" },
    { totalDonation: 855.6380327999999, allianceMember: "StarTerra" },
    { totalDonation: 8099.125084207, allianceMember: "Galactic Punks NFT" },
    { totalDonation: 704.3535589844, allianceMember: "Pylon Money" },
    { totalDonation: 100.34891999999999, allianceMember: "Kado " },
    { totalDonation: 203.82199143, allianceMember: "Orion Money" },
    { totalDonation: 19047.091800850005, allianceMember: "Ceres/Terrafirma" },
    { totalDonation: 100.263699, allianceMember: "Terrapins NFT" },
    { totalDonation: 726.333410039, allianceMember: "LunaBulls NFT" },
    { totalDonation: 5013.70305, allianceMember: "LunArt NFT" },
  ],
  Count: 29,
  ScannedCount: 29,
};

type Data = {
  Items: { totalDonation: number; allianceMember: string }[];
  Count: number;
  ScannedCount: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(response);
}
