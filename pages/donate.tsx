import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "components/Header";
import Footer from "components/Footer";

import { STEPS } from "components/Donate/variables";
import DonateHeader from "components/Donate/Header";
import DonateForm from "components/Donate/Forms/Donate";
import ConnectForm from "components/Donate/Forms/Connect";
import ThankYou from "components/Donate/ThankYou";
import * as React from "react";

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(STEPS.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(STEPS.DONATE);
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    onWalletDisconnect();
  };

  const onDonationSuccess = ({ amount, NFTData, KYCData, TCAData }) => {
    setStep(STEPS.THANKYOU);
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
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

      <div className="content-wrap">
        <div className="container pt-160 pb-100 position-relative">
          <DonateHeader currentStep={step} />

          <div className="row">
            <div className="col-md-9 mx-auto">
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
              {step == STEPS.THANKYOU && <ThankYou />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonatePage;
