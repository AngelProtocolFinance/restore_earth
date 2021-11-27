declare enum WalletChains {
  TERRA = "TERRA",
  ETHEREUM = "ETHEREUM",
  BITCOIN = "BITCOIN",
}

declare enum WalletChainNames {
  TERRA = "Terra",
  ETHEREUM = "Ethereum",
  BITCOIN = "Bitcoin",
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
  chainName: WalletChainNames;
}

export interface TransactionResult {}

const getChainMeta = (chain: WalletChains) => {
  if (chain == WalletChains.TERRA) {
    return {
      denomination: WalletDenominations.TERRA,
      glyph: WalletGlyphs.TERRA,
      chainName: WalletChainNames.TERRA,
    };
  }

  if (chain == WalletChains.ETHEREUM) {
    return {
      denomination: WalletDenominations.ETHEREUM,
      glyph: WalletGlyphs.ETHEREUM,
      chainName: WalletChainNames.ETHEREUM,
    };
  }

  if (chain == WalletChains.BITCOIN) {
    return {
      denomination: WalletDenominations.BITCOIN,
      glyph: WalletGlyphs.BITCOIN,
      chainName: WalletChainNames.BITCOIN,
    };
  }
};

const NewWallet = ({
  chain,
  connection,
  methods,
}: NewWalletProps): WalletProps => {
  const { chainName, denomination, glyph } = getChainMeta(chain);
  return { chain, chainName, denomination, glyph, connection, methods };
};

const WalletStatus = ({ wallet, onClickDisconnect }) => {
  return (
    <>
      <p className="my-rem-4">
        You're currently connected to {wallet.chainName} as{" "}
        <span className="font-monospace">{wallet.methods.address()}</span>.{" "}
        <a href="#" onClick={onClickDisconnect} className="link pe-auto">
          Disconnect?
        </a>
      </p>
    </>
  );
};

export { NewWallet, WalletChains, WalletStatus };
