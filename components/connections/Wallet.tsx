declare enum WalletChains {
  TERRA = "TERRA",
  ETHEREUM = "ETHEREUM",
}

interface NewConnectionProps {
  chain: WalletChains;
  connection: any;
  methods: any;
}

const NewConnection = ({ chain, connection, methods }: NewConnectionProps) => {
  return { chain, connection, methods };
};

export { NewConnection, WalletChains };
