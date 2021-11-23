import terraLogo from "public/images/chains/terra_blue_logo.svg";
import ethereumLogo from "public/images/chains/ethereum_logo.png";
import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import TerraConnections from "components/connections/TerraConnections";
import EthereumConnections from "components/connections/EthereumConnections";

const Connect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <div className="connection__chain__list">
      <h2>Select a donation method:</h2>
      <h3 className="connection__chain__title">
        <img width={32} height={32} src={terraLogo.src} />
        <span>[TODO] Terra</span>
      </h3>
      <TerraConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      <h3 className="connection__chain__title">
        <img
          width={32}
          height={32}
          style={{ paddingLeft: "6px", paddingRight: "6px" }}
          src={ethereumLogo.src}
        />
        <span>Ethereum</span>
      </h3>
      <EthereumConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      <h3 className="connection__chain__title">
        <img width={32} height={32} src={bitcoinLogo.src} />
        <span>Bitcoin</span>
      </h3>
      <ul className="connection__list">
        <li className="connection__item">
          <button className="rounded">
            <img width={32} height={32} src={bitcoinLogo.src} />
            <span className="connection__item__title">
              [TODO] Donate Manually
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Connect;
