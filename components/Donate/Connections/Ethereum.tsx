import Image from "next/image";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { WalletChains, NewWallet } from "./Wallet";

import MetaMaskLogo from "public/images/chains/metamask_logo.svg";
import WalletConnectLogo from "public/images/chains/walletconnect_logo.svg";
import { KYCTransactionDataType, ETH_WALLET_ADDRESS } from "../AngelProtocol";

const infuraId = "0475a33555e04d22a562b66af06d4b83";

const ConnectMetaMask = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const [provider, setProvider] = useState(undefined);

  useEffect(() => {
    setProvider(window["ethereum"]);
  }, [onConnectionSuccess, onConnectionError]);

  if (provider) {
    const onClickConnect = () => {
      provider
        .send("eth_requestAccounts")
        .then((accounts) => {
          const connectedWallet = new Web3(provider);
          const address = accounts.result[0];

          const chain = WalletChains.ETHEREUM;
          const connection = connectedWallet;
          const methods = {
            address: () => {
              return address;
            },
            disconnect: () => {
              onWalletDisconnect();
            },
            toUnit: (amount) => Web3.utils.toWei(amount),
            fromUnit: (amount) => Web3.utils.fromWei(amount),
            donate: (amount) => {
              return new Promise((resolve, reject) => {
                connectedWallet.eth
                  .sendTransaction({
                    from: address,
                    to: ETH_WALLET_ADDRESS,
                    value: amount,
                  })
                  .then((receipt) => {
                    const transactionData: KYCTransactionDataType = {
                      transactionId: receipt.transactionHash,
                      blockId: receipt.blockHash,
                      blockNumber: receipt.blockNumber,
                      status: receipt.status,
                    };
                    resolve(transactionData);
                  })
                  .catch((error) => {
                    console.log("error sending transaction: ", error);
                    reject(error);
                  });
              });
            },
          };
          onConnectionSuccess(NewWallet({ chain, connection, methods }));
        })
        .catch(onConnectionError);
    };

    return (
      <li className="list-group-item">
        <button
          onClick={onClickConnect}
          className="w-100 btn btn-outline-dark text-start px-rem-4"
        >
          <img width={32} height={32} src={MetaMaskLogo.src} />
          <span className="ml-rem-1">MetaMask</span>
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
    infuraId: infuraId,
  });

  const onClickConnect = () => {
    provider
      .enable()
      .then((accounts) => {
        const formattedProvider: WalletConnectProvider = provider;
        const connectedWallet = new Web3(formattedProvider as any);
        const address = accounts[0];

        const chain = WalletChains.ETHEREUM;
        const connection = connectedWallet;
        const methods = {
          address: () => {
            return address;
          },
          disconnect: () => {
            // TODO: Disconnect Ethereum wallet
            // this is what we were using
            // connectedWallet.currentProvider.disconnect();
            onWalletDisconnect();
          },
          toUnit: (amount) => {
            return Web3.utils.toWei(amount);
          },
          fromUnit: (amount) => Web3.utils.fromWei(amount),
          donate: (amount) => {
            return new Promise((resolve, reject) => {
              connectedWallet.eth
                .sendTransaction({
                  from: address,
                  to: ETH_WALLET_ADDRESS,
                  value: amount,
                })
                .then((receipt) => {
                  const transactionData: KYCTransactionDataType = {
                    transactionId: receipt.transactionHash,
                    blockId: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    status: receipt.status,
                  };
                  resolve(transactionData);
                })
                .catch((error) => {
                  console.log("error sending transaction: ", error);
                  reject(error);
                });
            });
          },
        };
        onConnectionSuccess(NewWallet({ chain, connection, methods }));
      })
      .catch(onConnectionError);
  };

  return (
    <li className="list-group-item">
      <button
        onClick={onClickConnect}
        className="w-100 btn btn-outline-dark text-start px-rem-1"
      >
        <img width={32} height={32} src={WalletConnectLogo.src} />
        <span className="ml-rem-1">Wallet Connect</span>
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
    <ul className="list-group">
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
