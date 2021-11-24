import terraLogo from "public/images/chains/terra_blue_logo.svg";
import ethereumLogo from "public/images/chains/ethereum_logo.png";
import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import TerraConnections from "components/Donate/Connections/Terra";
import EthereumConnections from "components/Donate/Connections/Ethereum";
import BitcoinConnections from "components/Donate/Connections/Bitcoin";

const ChainTitle = ({ logoSrc, title }) => {
  return (
    <h3 className="connection__chain__title">
      <img width={32} height={32} src={logoSrc} alt={`${title} logo`} />
      <span>{title}</span>
    </h3>
  );
};

const Connect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <div className="connection__chain__list">
      <h2>Select a donation method:</h2>
      <ChainTitle logoSrc={terraLogo.src} title={"[TODO Terra]"} />
      <TerraConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      {/* TODO: Add 6px left padding and 6px right padding to Ethereum logo */}
      <ChainTitle logoSrc={ethereumLogo.src} title={"Ethereum"} />
      <EthereumConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      {/* TODO: Handle BTC connection */}
      <ChainTitle logoSrc={bitcoinLogo.src} title={"[TODO] Bitcoin"} />
      <BitcoinConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </div>
  );
};
export default Connect;
