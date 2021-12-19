import jwt from "jsonwebtoken";
import axios from "axios";
import { NFTDataType } from "../Data/NFTData";
import { TCADataType } from "../Data/TCAData";
import { KYCDataType } from "../Data/KYCData";

const KYC_ENDPOINT = process.env.NEXT_PUBLIC_KYC_ENDPOINT;
const TERRA_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_TERRA_CONTRACT_ADDRESS;
const ETH_WALLET_ADDRESS = process.env.NEXT_PUBLIC_ETH_WALLET_ADDRESS;
const BTC_WALLET_ADDRESS = process.env.NEXT_PUBLIC_BTC_WALLET_ADDRESS;
const APES_FUND_ID = process.env.NEXT_PUBLIC_APES_FUND_ID;
const PROGRESS_API = process.env.NEXT_PUBLIC_PROGRESS_API;
const NEXT_PUBLIC_TOP_DONOR_API = process.env.NEXT_PUBLIC_TOP_DONOR_API;

const kycClient = axios.create({
  baseURL: KYC_ENDPOINT,
});

interface KYCSendBodyType {
  amount: number;
  nftRequested: boolean;
  nftAddress?: string;
  receiptRequested: boolean;
  fullName?: string;
  email?: string;
  streetAddress?: string;
  addressComplement?: string;
  city?: string;
  zipCode?: string;
  stateAddress?: string;
  country?: string;
  walletAddress: string;
  denomination: string;
  fundId: number;
  transactionId: any;
  transactionDate: any;
  restoreEarthNFTAddress?: string;
  tcaAssociation?: string;
}

export interface KYCTransactionDataType {
  senderAddress: string;
  transactionId: string;
  blockId?: string;
  blockNumber?: any;
  status: any;
}

const buildKYCData = ({
  wallet,
  amount,
  transactionData,
  NFTData,
  KYCData,
  TCAData,
}: SendKYCDataProps): KYCSendBodyType => {
  const data: KYCSendBodyType = {
    walletAddress: transactionData.senderAddress,
    denomination: wallet.denomination,
    amount: wallet.methods.toUnit(amount),
    nftRequested: NFTData.nftRequested,
    nftAddress: NFTData.address,
    receiptRequested: KYCData.receiptRequested,
    fullName: KYCData.name,
    email: KYCData.email,
    streetAddress: KYCData.streetAddress,
    addressComplement: " ",
    city: KYCData.city,
    zipCode: KYCData.zipcode,
    stateAddress: KYCData.state,
    country: KYCData.country,
    fundId: 6,
    transactionId: transactionData.transactionId,
    transactionDate: new Date().toISOString(),
    tcaAssociation: TCAData.tcaAssociation,
  };

  return data;
};

export interface SendKYCDataProps {
  wallet: any;
  amount: any;
  transactionData: KYCTransactionDataType;
  NFTData: NFTDataType;
  KYCData: KYCDataType;
  TCAData: TCADataType;
}

const sendKYCData = ({
  wallet,
  amount,
  transactionData,
  NFTData,
  KYCData,
  TCAData,
}: SendKYCDataProps) => {
  const authToken = createAuthToken();
  kycClient.defaults.headers.common["Authorization"] = authToken;

  const data = buildKYCData({
    wallet,
    amount,
    transactionData,
    NFTData,
    KYCData,
    TCAData,
  });
  return kycClient.post("/donation?app=restore-earth", data);
};

const createAuthToken = () => {
  const secret = process.env.NEXT_PUBLIC_NEXTJS_APES;
  const payload = {
    authorization: "allow",
    user: "restore-earth",
  };
  const expiry = 30;

  return jwt.sign(payload, secret, { expiresIn: expiry });
};

const getCampaignProgress = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(PROGRESS_API)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getTopDonors = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(NEXT_PUBLIC_TOP_DONOR_API)
      .then((response) => {
        const allianceMembers = response.data.Items;
        resolve(
          allianceMembers.sort((a, b) => b.totalDonation - a.totalDonation)
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const TCAList = [
  "ApolloDAO",
  "Alice",
  "Ceres/Terrafirma",
  "La Femme Collective",
  "Kado ",
  "Kujira",
  "Talis",
  "Kash",
  "Loop",
  "BetTerra",
  "Pylon Money",
  "Luart.io",
  "StarTerra",
  "White Whale",
  "Terra Casino",
  "Kinetic Money",
  "crypto11",
  "Spaar",
  "TIX",
  "Edge",
  "OnePlanet",
  "Neptune",
  "Tiiik",
  "Jolly Jalapenos",
  "Flipside Crypto",
  "Orion Money",
  "Tsunami Protocol",
  "Astral",
  "Plutos Pot / Lunaverse",
  "Loterra",
  "SmartStake",
  "Marte Cloud",
  "TerraBites",
  "LunaOrbit",
  "Astronorcs NFT",
  "BullRun GFs NFT",
  "Deviants NFT ",
  "EraLuna NFT",
  "F**k the SEC NFT",
  "Galactic Punks NFT",
  "Grumpy Koi NFT",
  "HERO NFT",
  "Luna Portrait NFT",
  "LunaBulls NFT",
  "LunaDoctors NFT",
  "LunArt NFT",
  "NIP Terra NFT",
  "Planet of LunApes NFT",
  "Tales of Terra NFT",
  "TerraBots NFT",
  "TerraFloki NFT",
  "Terrain NFT",
  "Terrans (by Talis)",
  "TerraPins NFT",
  "Unstables on Terra NFT",
  "Woof of LUNA NFT",
  "TerraFits NFT",
  "Terra Turtles NFT",
  "Gavert NFT",
  "Astroverse NFT",
  "Terrapins NFT",
  "AstroCHADS NFT",
  "ChristTerra Columbus NFT",
  "Terra Unicorns ",
  "West Coast Wonder",
  "Exo Terra NFT",
];

export {
  sendKYCData,
  getCampaignProgress,
  getTopDonors,
  ETH_WALLET_ADDRESS,
  BTC_WALLET_ADDRESS,
  TERRA_CONTRACT_ADDRESS,
  APES_FUND_ID,
  TCAList,
};
