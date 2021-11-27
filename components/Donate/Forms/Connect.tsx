import terraLogo from "public/images/chains/terra_blue_logo.svg";
import ethereumLogo from "public/images/chains/ethereum_logo.png";
import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import TerraConnections from "components/Donate/Connections/Terra";
import EthereumConnections from "components/Donate/Connections/Ethereum";
import BitcoinConnections from "components/Donate/Connections/Bitcoin";

import {
  ConnectionItem,
  ConnectionList,
  ChainTitle,
} from "../Connections/ConnectionList";

const Connect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <>
      <h2 className="h3">Connect your wallet</h2>
      <div className="list-group">
        <ChainTitle logoSrc={terraLogo.src} title={"Terra"} />
        <TerraConnections
          onConnectionSuccess={onConnectionSuccess}
          onConnectionError={onConnectionError}
          onWalletDisconnect={onWalletDisconnect}
        />
        <ChainTitle
          logoSrc={ethereumLogo.src}
          imgClassName="px-6"
          title={"Ethereum"}
        />
        <EthereumConnections
          onConnectionSuccess={onConnectionSuccess}
          onConnectionError={onConnectionError}
          onWalletDisconnect={onWalletDisconnect}
        />
        {/* TODO: Handle BTC connection */}
        <ChainTitle logoSrc={bitcoinLogo.src} title={"Bitcoin"} />
        <BitcoinConnections
          onConnectionSuccess={onConnectionSuccess}
          onConnectionError={onConnectionError}
          onWalletDisconnect={onWalletDisconnect}
        />
      </div>
    </>
  );
};
export default Connect;
