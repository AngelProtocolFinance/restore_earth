import jwt from "jsonwebtoken";
import axios from "axios";

const KYC_ENDPOINT =
  "https://9t0u8zpqjk.execute-api.us-east-1.amazonaws.com/donation?app=restore-earth";
const ETH_WALLET_ADDRESS = "0x5a882Eb704EA153B117Ab2b1797bA46a1B09Da2c";
const BTC_WALLET_ADDRESS = "bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq";
const TERRA_CONTRACT_ADDRESS = "";

const kycClient = axios.create({
  baseURL: KYC_ENDPOINT,
  withCredentials: true,
});

interface KYCDataType {
  amount: string;
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
  blockId: string;
  blockNumber: any;
  status: any;
}

const buildKYCData = ({
  wallet,
  amount,
  transactionData,
  NFTData,
  KYCData,
  TCAData,
}: SendKYCDataProps): KYCDataType => {
  const data: KYCDataType = {
    walletAddress: wallet.methods.address(),
    denomination: wallet.denomination,
    amount: amount,
    receiptRequested: false,
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
  NFTData: any;
  KYCData: any;
  TCAData: any;
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
  return kycClient.post("/donation", data);
};

const createAuthToken = () => {
  const secret = "example-secret-token"; //process.env.REACT_APP_APES_AUTH_SECRET_KEY;
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
};
