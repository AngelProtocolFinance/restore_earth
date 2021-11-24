import { useState } from "react";

import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

const ConnectBitcoin = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  const [address, setAddress] = useState("");

  const onClickConnect = () => {
    // TODO: Open modal to add address
    alert("WIP");
  };

  return (
    <li className="connection__item">
      <button onClick={onClickConnect} className="rounded">
        <img width={32} height={32} src={bitcoinLogo.src} />
        <span className="connection__item__title">Donate manually</span>
      </button>
    </li>
  );
};

const BitcoinConnections = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <ul className="connection__list">
      <ConnectBitcoin
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </ul>
  );
};

export default BitcoinConnections;
