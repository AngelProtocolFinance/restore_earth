import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TerraConnections from "../components/connections/TerraConnections";
import EthereumConnections from "../components/connections/EthereumConnections";

import { useState } from "react";

const steps = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const Connect = ({ onConnectionSuccess, onConnectionError }) => {
  return (
    <div>
      <h1>Terra</h1>
      <TerraConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
      />
      <h1>Ethereum</h1>
      <EthereumConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
      />
    </div>
  );
};

const Donate = ({ setStep, connection }) => {
  const [accounts, setAccounts] = useState([]);

  connection?.eth?.getAccounts()?.then((accounts) => {
    console.log(accounts);
    setAccounts(accounts);
  });

  const onSuccess = () => {
    setStep(steps.THANKYOU);
  };

  const onError = () => {
    setStep(steps.DONATE);
  };
  return (
    <section>
      <h1>Donation Form</h1>
      <p>Connected as: {accounts[0]}</p>
      <p>Default account: {connection.defaultAccount}</p>
    </section>
  );
};

const ThankYou = () => {
  return <section>Thank You!</section>;
};

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(steps.CONNECT);
  const [connection, setConnection] = useState(undefined);
  const onConnectionSuccess = (connection) => {
    console.log("connected successfully: ", connection);
    setConnection(connection);
    setStep(steps.DONATE);
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    console.log(error);
    setConnection(undefined);
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
          />
        )}
        {step == steps.DONATE && (
          <Donate setStep={setStep} connection={connection} />
        )}
        {step == steps.THANKYOU && <ThankYou />}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default DonatePage;
