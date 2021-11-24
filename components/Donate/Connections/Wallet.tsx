declare enum WalletChains {
  TERRA = "TERRA",
  ETHEREUM = "ETHEREUM",
  BITCOIN = "BITCOIN",
}

export interface NewWalletProps {
  chain: WalletChains;
  connection: any;
  methods: any;
}

const NewWallet = ({ chain, connection, methods }: NewWalletProps) => {
  return { chain, connection, methods };
};

const WalletStatus = ({ wallet, onClickDisconnect }) => {
  return (
    <>
      <p>Connected as: {wallet.methods.address()}</p>
      <button onClick={onClickDisconnect}>disconnect</button>
    </>
  );
};

export { NewWallet, WalletChains, WalletStatus };
