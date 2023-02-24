import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Page from "components/Page";
import Header from "components/Header";
import Footer from "components/Footer";

import { STEPS } from "components/Donate/variables";
import DonateHeader from "components/Donate/Header";
import DonateForm from "components/Donate/Forms/Donate";
import ConnectForm from "components/Donate/Forms/Connect";
import ThankYou from "components/Donate/ThankYou";

import punk1 from "../public/images/punks/punk1.png";
import punk2 from "../public/images/punks/punk2.png";
import punk3 from "../public/images/punks/punk3.png";
import punk4 from "../public/images/punks/punk4.png";
import punk5 from "../public/images/punks/punk5.png";
import punk6 from "../public/images/punks/punk6.png";
import punk7 from "../public/images/punks/punk7.png";

import {
  Accordion,
  AccordionContext,
  Nav,
  OverlayTrigger,
  Tab,
  Tooltip,
  useAccordionButton,
} from "react-bootstrap";

import CustomToggle from "components/CustomToggle";
import { KYCDataType } from "components/Donate/Data/KYCData";
import { NFTDataType } from "components/Donate/Data/NFTData";

const DEFAULT_DATA_STATE = {
  amount: undefined,
  NFTData: {},
  KYCData: {},
  TCAData: {},
};
const DonatePage: NextPage = () => {
  const [step, setStep] = useState(STEPS.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const [data, setData] = useState(DEFAULT_DATA_STATE);

  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(STEPS.DONATE);
  };

  const onConnectionError = (error) => {
    console.error("could not connect: ", error);
    onWalletDisconnect();
  };

  const onDonationSuccess = ({ amount, NFTData, KYCData, TCAData }) => {
    setData({ amount, NFTData, KYCData, TCAData });
    setStep(STEPS.THANKYOU);
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
    setData(DEFAULT_DATA_STATE);
    setStep(STEPS.CONNECT);
  };

  return (
    <>
      <Head>
        <title>Restore Earth</title>
        <meta
          name="description"
          content="Amplify your impact this holiday season by giving through Angel Protocol."
        />
      </Head>
      <Header />

      <Page>
        {/* <div className="pt-rem-12 padding-spacer-bottom">
          <div className="container-fluid px-rem-4">
            <div className="row gh-1 justify-content-center">
              <div className="col-12 col-sm-10 col-md-6 col-lg-5">
                {step == STEPS.CONNECT && (
                  <ConnectForm
                    onConnectionSuccess={onConnectionSuccess}
                    onConnectionError={onConnectionError}
                    onWalletDisconnect={onWalletDisconnect}
                  />
                )}
                {step == STEPS.DONATE && (
                  <DonateForm
                    setStep={setStep}
                    wallet={wallet}
                    onDonationSuccess={onDonationSuccess}
                  />
                )}
                {step == STEPS.THANKYOU && (
                  <ThankYou
                    KYCData={data.KYCData as KYCDataType}
                    NFTData={data.NFTData as NFTDataType}
                  />
                )}
              </div>
            </div>
          </div>
        </div> */}
      </Page>
      <Footer />
    </>
  );
};

export default DonatePage;
