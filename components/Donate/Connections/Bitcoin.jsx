import { useState } from "react";

import bitcoinLogo from "public/images/chains/bitcoin_logo.svg";

import { ConnectionItem } from "./ConnectionList";

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
