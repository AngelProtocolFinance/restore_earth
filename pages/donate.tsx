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

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(STEPS.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(STEPS.DONATE);
  };

  const onDonate = ({ amount, NFTData, KYCData, TCAData }) => {
    setStep(STEPS.THANKYOU);
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    onWalletDisconnect();
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
    setStep(STEPS.CONNECT);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
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
                  onDonate={onDonate}
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
