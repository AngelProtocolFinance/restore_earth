declare enum WalletChains {
  TERRA = "TERRA",
  ETHEREUM = "ETHEREUM",
}

interface NewWalletProps {
  chain: WalletChains;
  connection: any;
  methods: any;
}

const NewWallet = ({ chain, connection, methods }: NewWalletProps) => {
  return { chain, connection, methods };
};

export { NewWallet, WalletChains };
