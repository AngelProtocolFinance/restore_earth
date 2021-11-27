import terraLogo from "public/images/chains/terra_blue_logo.svg";
import ethereumLogo from "public/images/chains/ethereum_logo.png";
import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import TerraConnections from "components/Donate/Connections/Terra";
import EthereumConnections from "components/Donate/Connections/Ethereum";
import BitcoinConnections from "components/Donate/Connections/Bitcoin";

const ChainTitle = ({ logoSrc, title, imgClassName = "" }) => {
  return (
    <h3 className="fs-6 px-rem-4 text-start mt-rem-8 mb-rem-4">
      <img
        width={32}
        height={32}
        className={imgClassName}
        src={logoSrc}
        alt={`${title} logo`}
      />
      <span className="ml-rem-4">{title}</span>
    </h3>
  );
};

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
