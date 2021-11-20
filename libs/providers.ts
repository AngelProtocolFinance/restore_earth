import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

//  Create Web3 instance

const ConnectWalletConnect = ({ onConnectionSuccess, onConnectionError }) => {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: "0475a33555e04d22a562b66af06d4b83",
  });

  provider
    .enable()
    .then(() => {
      const web3 = new Web3(<any>provider);
      onConnectionSuccess(web3);
    })
    .catch(onConnectionError);
};

export { ConnectWalletConnect };
