import { useState } from "react";

export interface NFTDataType {
  nftRequested: boolean;
  address?: string;
}

const useNFTData = ({
  nftRequested = false,
  address = "",
}): [NFTDataType, (newData: any) => void] => {
  const [NFTData, setNFTData]: [NFTDataType, (newData: any) => void] = useState(
    {
      nftRequested,
      address,
    }
  );

  const updateNFTData = (newData: any) => {
    const data: NFTDataType = {
      ...NFTData,
      ...newData,
    };
    setNFTData(data);
  };

  return [NFTData, updateNFTData];
};

export default useNFTData;
