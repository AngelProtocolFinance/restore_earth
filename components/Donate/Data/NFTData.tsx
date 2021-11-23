import { useState } from "react";

export interface NFTDataType {
  address: string;
}

const useNFTData = (): [NFTDataType, (newData: any) => void] => {
  const [NFTData, setNFTData]: [NFTDataType, (newData: any) => void] = useState(
    {
      address: "",
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
