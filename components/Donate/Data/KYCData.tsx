import { useState } from "react";

export interface KYCDataType {
  name: string;
  email: string;
  streetAddress: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  receiptRequested: boolean;
}

const useKYCData = (): [KYCDataType, (newData: any) => void] => {
  const [KYCData, setKycData]: [KYCDataType, (newData: any) => void] = useState(
    {
      email: "",
      name: "",
      streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipcode: "",
      receiptRequested: false,
    }
  );

  const updateKYCData = (newData: any) => {
    const data: KYCDataType = {
      ...KYCData,
      ...newData,
    };
    setKycData(data);
  };

  return [KYCData, updateKYCData];
};

export default useKYCData;
