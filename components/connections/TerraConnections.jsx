//import Image from "next/image";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { NewWallet, WalletChains } from "./Wallet";
import {
  useWallet,
  useConnectedWallet,
  getChainOptions,
  WalletProvider,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";

const Terra = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const {
    // status,
    // network,
    // wallets,
    //availableConnectTypes,
    // availableInstallTypes,
    availableConnections,
    connect,
    disconnect,
  } = useWallet();

  const connectedWallet = useConnectedWallet();
  useEffect(() => {
    if (connectedWallet) {
      const chain = WalletChains.TERRA;
      const connection = connectedWallet;
      const methods = {
        address: () => {
          return connection.walletAddress;
        },
        disconnect: () => {
          disconnect();
          onWalletDisconnect();
        },
        toUnit: (amount) => amount,
        fromUnit: (amount) => amount,
        donate: (amount) => {
          console.log("terra send transaction for amount: ", amount);

          return new Promise((resolve, reject) => {
            resolve();
          });
        },
      };
      onConnectionSuccess(NewWallet({ chain, connection, methods }));
    }
  }, [disconnect, onConnectionSuccess, connectedWallet, onWalletDisconnect]);

  return (
    <>
      {availableConnections
        .filter(({ type }) => type != ConnectType.READONLY)
        .map(({ type, name, icon, identifier = "" }) => (
          <li
            key={"connection-" + type + identifier}
            className="connection__item"
          >
            <button
              onClick={() => connect(type, identifier)}
              className="rounded"
            >
              <img src={icon} alt={name} width={32} height={32} />
              <span className="connection__item__title">{name}</span>
            </button>
          </li>
        ))}
    </>
  );
};

const TerraConnections = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  useEffect(() => {
    const el = document.getElementById("terra-wallet-connect");
    if (el) {
      getChainOptions().then((chainOptions) => {
        ReactDOM.render(
          <WalletProvider {...chainOptions}>
            <Terra
              onConnectionSuccess={onConnectionSuccess}
              onConnectionError={onConnectionError}
              onWalletDisconnect={onWalletDisconnect}
            />
          </WalletProvider>,
          el
        );
      });
    }
  }, [onConnectionSuccess, onConnectionError, onWalletDisconnect]);

  return <ul id="terra-wallet-connect" className="connection__list"></ul>;
};

export default TerraConnections;
