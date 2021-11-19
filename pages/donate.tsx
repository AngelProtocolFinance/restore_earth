import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ConnectWalletConnect } from "../libs/providers";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  useWallet,
  getChainOptions,
  WalletProvider,
  WalletStatus,
} from "@terra-money/wallet-provider";

const steps = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const ConnectTerra = () => {
  const {
    status,
    network,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    connect,
    install,
    disconnect,
  } = useWallet();

  return (
    <div>
      <h1>Connect Sample</h1>
      <section>
        <pre>
          {JSON.stringify(
            {
              status,
              network,
              wallets,
              availableConnectTypes,
              availableInstallTypes,
            },
            null,
            2
          )}
        </pre>
      </section>

      <footer>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            {availableInstallTypes.map((connectType) => (
              <button
                key={"install-" + connectType}
                onClick={() => install(connectType)}
              >
                Install {connectType}
              </button>
            ))}
            {availableConnectTypes.map((connectType) => (
              <button
                key={"connect-" + connectType}
                onClick={() => connect(connectType)}
              >
                Connect {connectType}
              </button>
            ))}
            <br />
            {availableConnections.map(
              ({ type, name, icon, identifier = "" }) => (
                <button
                  key={"connection-" + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  <img
                    src={icon}
                    alt={name}
                    style={{ width: "1em", height: "1em" }}
                  />
                  {name}
                </button>
              )
            )}
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button onClick={() => disconnect()}>Disconnect</button>
        )}
      </footer>
    </div>
  );
};

const TerraConnections = () => {
  useEffect(() => {
    getChainOptions().then((chainOptions) => {
      ReactDOM.render(
        <WalletProvider {...chainOptions}>
          <ConnectTerra />
        </WalletProvider>,
        document.getElementById("terra-wallet-connect")
      );
    });
  });

  return <ul id="terra-wallet-connect"></ul>;
};

const Connect = ({ onConnectionSuccess, onConnectionError }) => {
  const onClickConnectWalletConnect = () => {
    ConnectWalletConnect({ onConnectionSuccess, onConnectionError });
  };

  return (
    <div>
      <ul>
        <li>
          <button onClick={onClickConnectWalletConnect}>Wallet Connect</button>
        </li>
      </ul>
      <TerraConnections />
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
    <main>
      <header>
        <div>Connect</div>
        <div>Donate</div>
        <div>Confirm</div>
      </header>
      <section>
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
      </section>
    </main>
  );
};

export default DonatePage;
