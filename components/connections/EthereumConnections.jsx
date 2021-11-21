import Image from "next/image";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { WalletChains, NewWallet } from "./Wallet";

import MetaMaskLogo from "../../public/images/chains/metamask_logo.svg";
import WalletConnectLogo from "../../public/images/chains/walletconnect_logo.svg";

const ConnectMetaMask = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const [provider, setProvider] = useState(undefined);

  useEffect(() => {
    setProvider(window.ethereum);
  }, [onConnectionSuccess, onConnectionError]);

  if (provider) {
    const onClickConnect = () => {
      provider
        .send("eth_requestAccounts")
        .then((accounts) => {
          const connectedWallet = new Web3(provider);

          const chain = WalletChains.ETHEREUM;
          const connection = connectedWallet;
          const methods = {
            address: () => {
              return accounts.result[0];
            },
            disconnect: () => {
              onWalletDisconnect();
            },
            donate: (amount) => {
              console.log("metamask send transaction");
              return new Promise((resolve, reject) => {
                resolve();
              });
            },
          };
          onConnectionSuccess(NewWallet({ chain, connection, methods }));
        })
        .catch(onConnectionError);
    };

    return (
      <li className="connection__item">
        <button onClick={onClickConnect} className="rounded">
          <img width={32} height={32} src={MetaMaskLogo.src} />
          <span className="connection__item__title">MetaMask</span>
        </button>
      </li>
    );
  }

  return null;
};

const ConnectWalletConnect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const provider = new WalletConnectProvider({
    infuraId: "0475a33555e04d22a562b66af06d4b83",
  });

  const onClickConnect = () => {
    provider
      .enable()
      .then((accounts) => {
        const connectedWallet = new Web3(provider);

        const chain = WalletChains.ETHEREUM;
        const connection = connectedWallet;
        const methods = {
          address: () => {
            return accounts[0];
          },
          disconnect: () => {
            connectedWallet.currentProvider.disconnect();
            onWalletDisconnect();
          },
          donate: (amount) => {
            console.log("walletconnect send transaction");
            return new Promise((resolve, reject) => {
              resolve();
            });
          },
        };
        onConnectionSuccess(NewWallet({ chain, connection, methods }));
      })
      .catch(onConnectionError);
  };

  return (
    <li className="connection__item">
      <button onClick={onClickConnect} className="rounded">
        <img width={32} height={32} src={WalletConnectLogo.src} />
        <span className="connection__item__title">Wallet Connect</span>
      </button>
    </li>
  );
};

const EthereumConnections = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <ul className="connection__list">
      <ConnectWalletConnect
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      <ConnectMetaMask
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </ul>
  );
};

export default EthereumConnections;
