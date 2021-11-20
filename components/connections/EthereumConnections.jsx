import { ConnectWalletConnect } from "../../libs/providers";

const EthereumConnections = ({ onConnectionSuccess, onConnectionError }) => {
  const onClickConnectWalletConnect = () => {
    ConnectWalletConnect({ onConnectionSuccess, onConnectionError });
  };

  return (
    <ul>
      <li>
        <button onClick={onClickConnectWalletConnect}>Wallet Connect</button>
      </li>
    </ul>
  );
};

export default EthereumConnections;
