declare enum WalletChains {
  TERRA = "TERRA",
  ETHEREUM = "ETHEREUM",
  BITCOIN = "BITCOIN",
}

declare enum WalletDenominations {
  TERRA = "UST",
  ETHEREUM = "ETH",
  BITCOIN = "BTC",
}

declare enum WalletGlyphs {
  TERRA = "$",
  ETHEREUM = "Ξ",
  BITCOIN = "₿",
}

export interface NewWalletProps {
  chain: WalletChains;
  connection: any;
  methods: any;
}

export interface WalletProps {
  chain: WalletChains;
  denomination: WalletDenominations;
  glyph: WalletGlyphs;
  connection: any;
  methods: any;
}

export interface TransactionResult {}

const getChainMeta = (chain: WalletChains) => {
  if (chain == WalletChains.TERRA) {
    return {
      denomination: WalletDenominations.TERRA,
      glyph: WalletGlyphs.TERRA,
    };
  }

  if (chain == WalletChains.ETHEREUM) {
    return {
      denomination: WalletDenominations.ETHEREUM,
      glyph: WalletGlyphs.ETHEREUM,
    };
  }

  if (chain == WalletChains.BITCOIN) {
    return {
      denomination: WalletDenominations.BITCOIN,
      glyph: WalletGlyphs.BITCOIN,
    };
  }
};

const NewWallet = ({
  chain,
  connection,
  methods,
}: NewWalletProps): WalletProps => {
  const { denomination, glyph } = getChainMeta(chain);
  return { chain, denomination, glyph, connection, methods };
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
