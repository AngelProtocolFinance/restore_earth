import { useState } from "react";

export interface TCADataType {
  affiliateId: string;
}

const useTCAData = (): [TCADataType, (newData: any) => void] => {
  const [TCAData, updateTCAData]: [TCADataType, (newData: any) => void] =
    useState({
      affiliateId: "",
    });

  const setTCAData = (newData: any) => {
    const data: TCADataType = {
      ...TCAData,
      ...newData,
    };
    updateTCAData(data);
  };

  return [TCAData, setTCAData];
};

export default useTCAData;
