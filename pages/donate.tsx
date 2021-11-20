import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TerraConnections from "../components/connections/TerraConnections";
import EthereumConnections from "../components/connections/EthereumConnections";

import { useState } from "react";
import { disconnect } from "process";
import { Wallet } from "@terra-money/terra.js";

const steps = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const Connect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <div>
      <h1>Terra</h1>
      <TerraConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      <h1>Ethereum</h1>
      <EthereumConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </div>
  );
};

const Donate = ({ setStep, wallet }) => {
  // const [address, setAddress] = useState("");

  // then((address) => {
  //   setAddress(address);
  // });
  const address = wallet.methods.address();

  const onSuccess = () => {
    setStep(steps.THANKYOU);
  };

  const onError = () => {
    setStep(steps.DONATE);
  };

  const onClickDisconnect = () => {
    wallet.methods.disconnect();
  };

  return (
    <section>
      <h1>Donation Form</h1>
      <p>Connected as: {address}</p>
      <button onClick={onClickDisconnect}>disconnect</button>
    </section>
  );
};

const ThankYou = () => {
  return <section>Thank You!</section>;
};

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(steps.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(steps.DONATE);
    //wallet.methods.disconnect();
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    onWalletDisconnect();
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
    setStep(steps.CONNECT);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      {/* <Header /> */}

      <div className="content-wrap">
        {step == steps.CONNECT && (
          <Connect
            onConnectionSuccess={onConnectionSuccess}
            onConnectionError={onConnectionError}
            onWalletDisconnect={onWalletDisconnect}
          />
        )}
        {step == steps.DONATE && <Donate setStep={setStep} wallet={wallet} />}
        {step == steps.THANKYOU && <ThankYou />}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DonatePage;
