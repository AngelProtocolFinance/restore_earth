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
    <li className="list-group-item">
      <button
        onClick={onClickConnect}
        className="w-100 btn btn-outline-dark text-start pl-1rem pr-1rem"
      >
        <img width={32} height={32} src={bitcoinLogo.src} />
        <span className="ml-1rem">Donate manually</span>
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
