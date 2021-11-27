import Image from "next/image";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { WalletChains, NewWallet } from "./Wallet";

import MetaMaskLogo from "public/images/chains/metamask_logo.svg";
import WalletConnectLogo from "public/images/chains/walletconnect_logo.svg";
import { KYCTransactionDataType, ETH_WALLET_ADDRESS } from "../AngelProtocol";

import { ConnectionItem, ConnectionList } from "./ConnectionList";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

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
      <ConnectionItem
        onClick={onClickConnect}
        logo={MetaMaskLogo.src}
        title="MetaMask"
      />
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
    infuraId: INFURA_ID,
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
    <ConnectionItem
      onClick={onClickConnect}
      logo={WalletConnectLogo.src}
      title="Wallet Connect"
    />
  );
};

const EthereumConnections = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <ConnectionList>
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
    </ConnectionList>
  );
};

export default EthereumConnections;
