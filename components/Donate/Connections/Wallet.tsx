import { Dropdown } from "react-bootstrap";

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
  const address = wallet.methods.address();

  const displayAddress =
    address.substring(0, 4) + "...." + address.substring(address.length - 8);
  return (
    <div className="d-flex justify-content-end">
      <Dropdown>
        <Dropdown.Toggle className="my-rem-4 rounded bg-grey-light">
          <span className="font-monospace">{displayAddress}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className="bg-grey-light" align="end">
          <Dropdown.Item onClick={onClickDisconnect}>Disconnect</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export { NewWallet, WalletChains, WalletStatus };
