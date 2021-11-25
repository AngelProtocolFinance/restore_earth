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

// async createDepositTx(
//   UST_amount: number | string,
//   splitToLiquid: number
// ): Promise<CreateTxOptions> {
//   this.checkWallet();
//   const pctLiquid = splitToLiquid / 100;
//   const pctLocked = 1 - pctLiquid;
//   const micro_UST_Amount = new Dec(UST_amount).mul(1e6).toNumber();
//   // const fee = await this.estimateFee([depositMsg]);
//   const fee = new StdFee(2500000, [new Coin(denoms.uusd, 1.5e6)]);
//   return { msgs: [depositMsg], fee };
// }

const Terra = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const { availableConnections, connect, disconnect } = useWallet();

  const connectedWallet = useConnectedWallet();
  useEffect(() => {
    if (connectedWallet) {
      const client = new LCDClient({
        chainID: connectedWallet.network.chainID,
        URL: connectedWallet.network.lcd,
        gasAdjustment: 1.2, // Contract.gasAdjustment, //use gas units 20% greater than estimate
        gasPrices: [new Coin("uusd", 0.15)], // Contract.gasPrices,
      });
      const transactionURL = ({ tx }) => {
        `https://finder.terra.money/${connectedWallet.network.chainID}/tx/${tx.hash}`;
      };

      const fetchEstimatedFee = (msgs) => {
        console.log("attempting to get gas fee");

        return client.tx.estimateFee(connectedWallet.walletAddress, {
          msgs,
          feeDenoms: ["uusd"],
        });
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
        donate: (amount) => {
          console.log("terra send transaction for amount: ", amount);

          return new Promise((resolve, reject) => {
            if (connectedWallet.network.chainID.startsWith("columbus")) {
              alert(`Please only execute this example on Testnet`);
              reject({
                message: `Please only execute this example on Testnet`,
              });
            }
            const msgs = [
              new MsgExecuteContract(
                connectedWallet.walletAddress,
                TERRA_CONTRACT_ADDRESS,
                {
                  deposit: {
                    fund_id: APES_FUND_ID,
                    split: "50",
                  },
                },
                [new Coin("uusd", amount)]
              ),
            ];

            fetchEstimatedFee(msgs)
              .then((fee) => {
                connectedWallet
                  .post({
                    // fee: new Fee(1000000, "200000uusd"),
                    fee: fee,
                    msgs: msgs,
                  })
                  .then((nextTxResult) => {
                    const transactionData: KYCTransactionDataType = {
                      transactionId: nextTxResult.result.txhash,
                      status: nextTxResult.success,
                    };
                    resolve(transactionData);
                  })
                  .catch((reason) => {
                    console.log(reason);
                    reject(reason);
                  });
              })
              .catch((reason) => {
                console.log(reason);
                reject(reason);
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
