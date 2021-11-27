import { useState } from "react";
import { Dec } from "@terra-money/terra.js";

import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import { ConnectionItem } from "./ConnectionList";
import { KYCTransactionDataType } from "../AngelProtocol";
import { NewWallet, WalletChains } from "./Wallet";

const ConnectBitcoin = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const [address, setAddress] = useState("");
  const chain = WalletChains.BITCOIN;
  const connection = {};

  const onClickConnect = () => {
    // TODO: Open modal to add address
    const methods = {
      address: () => {
        return address;
      },
      disconnect: () => {
        onWalletDisconnect();
      },
      toUnit: (amount) => {
        return new Dec(amount).mul(1e8).toNumber();
      },
      fromUnit: (amount) => {
        return new Dec(amount).div(1e8).toString();
      },
      donate: ({ amount, txHash }) => {
        return new Promise((resolve, reject) => {
          if (txHash && address) {
            const transactionData: KYCTransactionDataType = {
              transactionId: txHash,
              status: true,
            };
            resolve(transactionData);
          } else {
            if (!txHash || txHash.length == 0) {
              reject({
                message:
                  "There was an error with your BTC transaction hash, please make sure it's set.",
              });
            }

            // if (!address || address.length == 0) {
            reject({
              message:
                "There was an error with your BTC address, please make sure it's set.",
            });
            // }
          }
        });
      },
    };

    onConnectionSuccess(NewWallet({ chain, connection, methods }));
  };

  return (
    <ConnectionItem
      onClick={onClickConnect}
      logo={bitcoinLogo.src}
      title="Donate BTC directly"
    />
  );
};

const BitcoinConnections = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <ul className="list-group">
      <ConnectBitcoin
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </ul>
  );
};

export default BitcoinConnections;
