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

const kycClient = axios.create({
  baseURL: KYC_ENDPOINT,
});

interface KYCSendBodyType {
  amount: string;
  nftRequested: boolean;
  nftAddress?: string;
  receiptRequested: boolean;
  fullName?: string;
  email?: string;
  streetAddress?: string;
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
}

export interface KYCTransactionDataType {
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
    walletAddress: wallet.methods.address(),
    denomination: wallet.denomination,
    amount: amount,
    nftRequested: NFTData.nftRequested,
    nftAddress: NFTData.address,
    receiptRequested: KYCData.receiptRequested,
    fullName: KYCData.name,
    email: KYCData.email,
    streetAddress: KYCData.streetAddress,
    city: KYCData.city,
    zipCode: KYCData.zipcode,
    stateAddress: KYCData.state,
    country: KYCData.country,
    fundId: 6,
    transactionId: transactionData.transactionId,
    transactionDate: new Date().toLocaleString([], {
      dateStyle: "long",
      timeStyle: "short",
      hour12: false,
    }),
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

export {
  sendKYCData,
  ETH_WALLET_ADDRESS,
  BTC_WALLET_ADDRESS,
  TERRA_CONTRACT_ADDRESS,
  APES_FUND_ID,
};
