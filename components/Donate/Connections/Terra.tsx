//import Image from "next/image";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { NewWallet, WalletChains } from "./Wallet";
import {
  Coin,
  CreateTxOptions,
  Dec,
  MsgExecuteContract,
  Fee,
  MsgSend,
  LCDClient,
  SignerData,
} from "@terra-money/terra.js";
import {
  useWallet,
  useConnectedWallet,
  getChainOptions,
  WalletProvider,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider";
import {
  APES_FUND_ID,
  TERRA_CONTRACT_ADDRESS,
  KYCTransactionDataType,
} from "components/Donate/AngelProtocol";

import { ConnectionItem, ConnectionList } from "./ConnectionList";

const Terra = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const { availableConnections, connect, disconnect } = useWallet();

  const connectedWallet = useConnectedWallet();
  useEffect(() => {
    if (connectedWallet) {
      const transactionURL = ({ tx }) => {
        `https://finder.terra.money/${connectedWallet.network.chainID}/tx/${tx.hash}`;
      };

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
        toUnit: (amount) => {
          return new Dec(amount).mul(1e6).toNumber();
        },
        fromUnit: (amount) => {
          return new Dec(amount).div(1e6).toString();
        },
        donate: ({ amount }) => {
          return new Promise((resolve, reject) => {
            connectedWallet
              .post({
                msgs: [
                  new MsgExecuteContract(
                    connectedWallet.walletAddress,
                    TERRA_CONTRACT_ADDRESS,
                    {
                      deposit: {
                        fund_id: 6,
                        split: "0.0",
                      },
                    },
                    [new Coin("uusd", amount)]
                  ),
                ],
                gasAdjustment: 1.2,
                gasPrices: [new Coin("uusd", 0.15)],
              })
              .then((txResult) => {
                const transactionData: KYCTransactionDataType = {
                  senderAddress: connectedWallet.walletAddress,
                  transactionId: txResult.result.txhash,
                  status: txResult.success,
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
    }
  }, [disconnect, onConnectionSuccess, connectedWallet, onWalletDisconnect]);

  return (
    <>
      {availableConnections
        .filter(({ type }) => type != ConnectType.READONLY)
        .map(({ type, name, icon, identifier = "" }) => (
          <ConnectionItem
            onClick={() => connect(type, identifier)}
            logo={icon}
            title={name}
            key={type + name}
          />
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

  return <ul id="terra-wallet-connect" className="list-group"></ul>;
};

export default TerraConnections;
