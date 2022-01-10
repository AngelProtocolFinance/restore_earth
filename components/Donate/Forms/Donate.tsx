import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";

import {
  WalletChains,
  WalletStatus,
  WalletDenominations,
  WalletGlyphs,
  WalletMicroDenominations,
} from "components/Donate/Connections/Wallet";

import { STEPS, TRANSACTION_STEPS } from "components/Donate/variables";
import useNFTData from "components/Donate/Data/NFTData";
import useKYCData from "components/Donate/Data/KYCData";
import useTCAData from "components/Donate/Data/TCAData";

import {
  BTC_WALLET_ADDRESS,
  sendKYCData,
  TCAList,
} from "components/Donate/AngelProtocol/index";

// const TWITTER_HANDLE = "example";
// const TOKENS = {
//   BITCOIN: "BTC",
//   ETHEREUM: "ETH",
//   TERRA: "UST",
// };

// const SUGGESTED_DONATION_AMOUNTS = {
//   BITCOIN: ["0.0017", "0.0087", "0.017", "0.087", "0.44", "0.87", "1.74"],
//   ETHEREUM: ["0.024", "0.12", "0.24", "1.2", "6", "12", "24"],
//   TERRA: ["100", "500", "1000", "5000", "25000", "50000", "100000"],
// };

const DonationAmountForm = ({
  wallet,
  txHash,
  setTxHash,
  amount,
  setAmount,
  isLuna,
  setIsLuna,
  selectedAmount,
  setSelectedAmount,
  manualWallet,
  setManualWallet,
}) => {
  const glyph = isLuna ? WalletGlyphs.TERRA_LUNA : wallet.glyph;
  const denom = isLuna ? WalletDenominations.TERRA_LUNA : wallet.denomination;
  // const token = TOKENS[wallet.chain];
  // const suggestedDonationAmounts = SUGGESTED_DONATION_AMOUNTS[wallet.chain];
  const bitcoinConnected = wallet.chain == WalletChains.BITCOIN;
  const placeHolder = bitcoinConnected
    ? `How much ${glyph} (${denom}) did you donate?`
    : `How much ${glyph} (${denom}) would you like to donate?`;

  return (
    <>
      {wallet.chain == WalletChains.BITCOIN && (
        <>
          <p className="mb-12">
            To make a donation via Bitcoin, please send your donation
            transaction to the wallet address:
            <br />
            <span className="small fw-bold font-monospace ">
              {BTC_WALLET_ADDRESS}
            </span>
          </p>
          <p>
            Once your transaction is successful, please add the details below
            and we&apos;ll send you a receipt once we&apos;ve confirmed the
            transaction (usually within an hour).
          </p>
          <Form.Group className="my-rem-8" controlId="formBtcWalletAddress">
            <Form.Label>BTC Wallet Address</Form.Label>
            <Form.Control
              type="text"
              name="manualWallet"
              value={manualWallet}
              onChange={(e) => setManualWallet(e.currentTarget.value)}
              className="donate__form__manual_wallet__input"
              placeholder="bc1qezneaj4976ev4kkqws40dk2dxgxwcjynggd8fq"
              required
            />
            <Form.Text muted>
              The Bitcoin wallet address used to send the donation transaction.
            </Form.Text>
          </Form.Group>
          <Form.Group className="my-rem-8" controlId="formBtcTransactionId">
            <Form.Label>BTC Transaction ID</Form.Label>
            <Form.Control
              type="text"
              name="txHash"
              value={txHash}
              onChange={(e) => setTxHash(e.currentTarget.value)}
              className="donate__form__txhash__input"
              placeholder="f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16"
              required
            />
            <Form.Text muted>
              The Bitcoin transaction ID of the donation.
            </Form.Text>
          </Form.Group>
        </>
      )}

      <Form.Group className="my-rem-8" controlId="formBtcTransactionAmount">
        <Form.Label>{denom} Amount</Form.Label>
        <InputGroup>
          {(wallet.chain === WalletChains.TERRA && (
            <DropdownButton
              variant="light"
              title={glyph + " "}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item onClick={() => setIsLuna(true)}>
                Luna 🌕
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setIsLuna(false)}>$</Dropdown.Item>
            </DropdownButton>
          )) || <InputGroup.Text>{glyph}</InputGroup.Text>}

          <Form.Control
            type="text"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            className="donate__form__amount__input"
            placeholder="1"
            pattern="^[0-9]*[.,]?[0-9]*$"
            required
          />
        </InputGroup>
        <Form.Text muted>{placeHolder}</Form.Text>
      </Form.Group>
    </>
  );
};

const NFTForm = ({ wallet, NFTData, setNFTData, TCAData, setTCAData }) => {
  const nftRequested = NFTData.nftRequested;

  return (
    <>
      <Form.Check
        type="checkbox"
        id="formReceiveNFT"
        checked={nftRequested}
        label={`I want to receive an NFT for my donation`}
        onChange={() => {
          const nftRequested = !NFTData.nftRequested;
          setNFTData({ nftRequested });
        }}
        className="mt-rem-4 mb-rem-4"
      />
      {nftRequested && (
        <div className="mb-rem-12">
          <p className="mb-6 small">
            To receive a Galactic Angel, you must have a Terra wallet address.
            Don&apos;t have a wallet yet? &nbsp;
            <a
              href="https://station.terra.money/"
              target="_blank"
              rel="noreferrer"
            >
              Create a wallet on Terra
            </a>
            .
          </p>
          <p className="mb-20 small">
            Angels will be airdropped after the campaign ends. The final tier
            value of the NFT will be determined by the USD value of the
            transaction.
          </p>
          <Form.Group className="mb-rem-6" controlId="walletAddress">
            <Form.Label>Terra Wallet Address</Form.Label>
            <Form.Control
              type="text"
              name="walletAddress"
              value={NFTData.address}
              onChange={(e) => {
                const address = e.currentTarget.value;
                setNFTData({ address });
              }}
              className="donate__form__nft__input"
              placeholder="terra************************"
              autoComplete="wallet_address"
            />
            <Form.Select
              aria-label="Angel Alliance Member"
              onChange={(e) => {
                const tcaAssociation = e.currentTarget.value;
                setTCAData({ tcaAssociation });
              }}
              className="donate__form__tca__input mt-rem-4"
            >
              <option value="">
                Do you want to attribute your donation to an Angel Alliance
                team?
              </option>
              {TCAList.map((title) => (
                <option value={title} key={title}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      )}
    </>
  );
};

const KYCForm = ({ wallet, KYCData, setKYCData }) => {
  const receiptRequested = KYCData.receiptRequested;
  return (
    <>
      <Form.Check
        type="checkbox"
        id="formReceiveReceipt"
        checked={receiptRequested}
        className="mt-rem-4 mb-rem-4"
        label={`I want to receive a tax receipt for my donation`}
        onChange={() => {
          const receiptRequested = !KYCData.receiptRequested;
          setKYCData({ receiptRequested });
        }}
      />

      {receiptRequested && (
        <div className="mb-rem-12">
          <p className="small mb-20">
            Please note that our tax receipts are issued by a US-based 501(c)(3)
            nonprofit. Please consult with your local lawyer, accountant or tax
            advisor to determine the eligibility of your donation for a tax
            relief in your country of residence.
          </p>
          <Form.Group className="mb-rem-6" controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="formFullName"
              value={KYCData.name}
              onChange={(e) => {
                const name = e.currentTarget.value;
                setKYCData({ name });
              }}
              className="donate__form__kyc__input"
              placeholder="Full name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-rem-6" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="formEmail"
              value={KYCData.email}
              onChange={(e) => {
                const email = e.currentTarget.value;
                setKYCData({ email });
              }}
              className="donate__form__kyc__input"
              placeholder="Email address"
              required
            />
          </Form.Group>
          <Form.Group className="mb-rem-6" controlId="formStreet">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              name="formStreetAddress"
              placeholder="Street address"
              value={KYCData.streetAddress}
              onChange={(e) => {
                const streetAddress = e.currentTarget.value;
                setKYCData({ streetAddress });
              }}
              className="donate__form__kyc__input"
              required
            />
          </Form.Group>
          <Row className="gh-1">
            <Form.Group as={Col} className="mb-rem-6" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="formCity"
                placeholder="City"
                value={KYCData.city}
                onChange={(e) => {
                  const city = e.currentTarget.value;
                  setKYCData({ city });
                }}
                className="donate__form__kyc__input"
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-rem-6" controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="formState"
                placeholder="State"
                value={KYCData.state}
                onChange={(e) => {
                  const state = e.currentTarget.value;
                  setKYCData({ state });
                }}
                className="donate__form__kyc__input"
                required
              />
            </Form.Group>
          </Row>
          <Row className="gh-1">
            <Form.Group as={Col} className="mb-rem-6" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="formCountry"
                placeholder="Country"
                value={KYCData.country}
                onChange={(e) => {
                  const country = e.currentTarget.value;
                  setKYCData({ country });
                }}
                className="donate__form__kyc__input"
                required
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-rem-6" controlId="formZipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                name="formZipcode"
                placeholder="Zipcode"
                value={KYCData.zipcode}
                onChange={(e) => {
                  const zipcode = e.currentTarget.value;
                  setKYCData({ zipcode });
                }}
                className="donate__form__kyc__input"
                required
              />
            </Form.Group>
          </Row>
        </div>
      )}
    </>
  );
};

const TCAForm = ({ wallet, TCAData, setTCAData }) => {
  const [showTCA, setShowTCA] = useState(false);
  return (
    <>
      <Form.Check
        type="checkbox"
        id="formTerraCharityAlliance"
        checked={showTCA}
        label={`Are you a member of the Angel Alliance?`}
        onChange={() => {
          setShowTCA(!showTCA);
        }}
        className="my-rem-4"
      />
      {showTCA && (
        <div className="mb-rem-12">
          <Form.Group className="mb-rem-6" controlId="formFullName">
            <Form.Select
              aria-label="TCA Member"
              onChange={(e) => {
                const tcaAssociation = e.currentTarget.value;
                setTCAData({ tcaAssociation });
              }}
              className="donate__form__tca__input"
              required
            >
              <option value="">
                Do you want to attribute your donation to an Angel Alliance
                team?
              </option>
              {TCAList.map((title) => (
                <option value={title} key={title}>
                  {title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
      )}
    </>
  );
};

const TermsAcceptance = ({ termsAccepted, setTermsAccepted }) => {
  const termsLabel = (
    <div className="mb-rem-12">
      I have read and agree to the{" "}
      <Link href="/terms">
        <a target="_blank">terms of use</a>
      </Link>
      .
    </div>
  );

  return (
    <>
      <Form.Check
        type="checkbox"
        id="formTermsAccepted"
        checked={termsAccepted}
        label={termsLabel}
        onChange={() => {
          setTermsAccepted(!termsAccepted);
        }}
        required
      />
    </>
  );
};

const DonationSummary = ({ wallet, amount, NFTData, KYCData, TCAData }) => {
  if (!amount || amount == "") {
    return null;
  }
  return (
    <div className="card bg-light border mb-rem-6">
      <div className="card-body p-rem-2">
        <p className="m-0 p-0 small">
          You will donate {wallet.glyph} {amount} {wallet.denomination} to
          Restore Earth. Press <strong>Donate Now</strong> to continue.
        </p>
      </div>
    </div>
  );
};

const Donate = ({ setStep, wallet, onDonationSuccess }) => {
  const [transactionStep, setTransactionStep] = useState(
    TRANSACTION_STEPS.FORM
  );
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: make amount adjustment simpler
  const [amount, setAmount] = useState("");
  const [isLuna, setIsLuna] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  // BTC Special Case
  const [txHash, setTxHash] = useState(undefined);
  const [manualWallet, setManualWallet] = useState(undefined);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const defaultNftAddress =
    wallet.chain == WalletChains.TERRA ? wallet.methods.address() : "";
  const [NFTData, setNFTData] = useNFTData({
    nftRequested: false,
    address: defaultNftAddress,
  });

  const terraDenom = isLuna ? "uluna" : "uusd";
  const walletWithLuna = {
    ...wallet,
    denomination: WalletDenominations.TERRA_LUNA,
    microDenomination: WalletMicroDenominations.TERRA_LUNA,
    glyph: WalletGlyphs.TERRA_LUNA,
  };

  const [KYCData, setKYCData] = useKYCData();
  const [TCAData, setTCAData] = useTCAData();

  const onSuccess = () => {
    setStep(STEPS.THANKYOU);
  };

  const onError = () => {
    setStep(STEPS.DONATE);
  };

  const onClickDisconnect = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    wallet.methods.disconnect();
  };

  const onClickReset = () => {
    onClickDisconnect();
  };

  const onTransactionSuccess = ({
    amount,
    wallet,
    transactionData,
    NFTData,
    KYCData,
    TCAData,
  }) => {
    sendKYCData({
      amount,
      wallet,
      transactionData,
      NFTData,
      KYCData,
      TCAData,
    })
      .then((result) => {
        setTransactionStep(TRANSACTION_STEPS.SUCCESS);
        onDonationSuccess({ amount, NFTData, KYCData, TCAData });
      })
      .catch((error) => {
        if (KYCData.receiptRequested) {
          setTransactionStep(TRANSACTION_STEPS.ERROR_KYC);
          setErrorMessage(error);
        } else {
          setTransactionStep(TRANSACTION_STEPS.SUCCESS);
          onDonationSuccess({
            amount,
            NFTData,
            KYCData,
            TCAData,
          });
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = wallet.methods.toUnit(amount);
    setTransactionStep(TRANSACTION_STEPS.SENDING_TRANSACTION);

    // BTC needs the user defined txHash
    wallet.methods
      .donate({
        amount: formattedAmount,
        txHash,
        manualWallet,
        terraDenom,
      })
      .then((transactionData) => {
        onTransactionSuccess({
          amount,
          wallet: isLuna ? walletWithLuna : wallet,
          transactionData,
          NFTData,
          KYCData,
          TCAData,
        });
        setTransactionStep(TRANSACTION_STEPS.SENDING_KYC);
      })
      .catch((error) => {
        console.error(error);
        setTransactionStep(TRANSACTION_STEPS.ERROR_TRANSACTION);
        setErrorMessage(error.message);
      });
  };

  return (
    <section>
      <h2 className="h3">Your Donation</h2>
      <WalletStatus wallet={wallet} onClickDisconnect={onClickDisconnect} />
      {transactionStep == TRANSACTION_STEPS.FORM && (
        <Form onSubmit={onSubmit}>
          <DonationAmountForm
            wallet={wallet}
            amount={amount}
            setAmount={setAmount}
            isLuna={isLuna}
            setIsLuna={setIsLuna}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            txHash={txHash}
            setTxHash={setTxHash}
            manualWallet={manualWallet}
            setManualWallet={setManualWallet}
          />
          <NFTForm
            wallet={wallet}
            NFTData={NFTData}
            setNFTData={setNFTData}
            TCAData={TCAData}
            setTCAData={setTCAData}
          />
          <KYCForm wallet={wallet} KYCData={KYCData} setKYCData={setKYCData} />

          <TermsAcceptance
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
          />

          <DonationSummary
            wallet={isLuna ? walletWithLuna : wallet}
            amount={amount}
            NFTData={NFTData}
            KYCData={KYCData}
            TCAData={TCAData}
          />

          <Button variant="primary" type="submit">
            Donate Now
          </Button>
        </Form>
      )}
      {transactionStep == TRANSACTION_STEPS.SENDING_TRANSACTION && (
        <Form>
          <Button disabled variant="primary" type="submit">
            Sending Transaction…
          </Button>
        </Form>
      )}
      {transactionStep == TRANSACTION_STEPS.SENDING_KYC && (
        <Form>
          <Button disabled variant="primary" type="submit">
            Updating campaign status…
          </Button>
        </Form>
      )}
      {transactionStep == TRANSACTION_STEPS.ERROR_TRANSACTION && (
        <Form onSubmit={onSubmit}>
          <p className="pt-rem-12 mb-rem-4">
            <strong>The transaction failed</strong>, try again or reconnect your
            wallet?
          </p>
          <p className="p-rem-4 bg-grey-light border-solid">{errorMessage}</p>
          <p>
            If this transaction keeps failing, please let us know at{" "}
            <Link href="mailto:support@angelprotocol.io&subject=RestoreEarth">
              <a className="link">support@angelprotocol.io</a>
            </Link>
          </p>
          <Button variant="primary" type="submit">
            Retry
          </Button>
          <Button variant="outline" onClick={wallet.methods.disconnect}>
            Reconnect Wallet
          </Button>
        </Form>
      )}
      {transactionStep == TRANSACTION_STEPS.ERROR_KYC &&
        KYCData.receiptRequested && (
          <Form>
            <p>
              There was an error sending KYC data, please let us know at{" "}
              <Link href="mailto:support@angelprotocol.io&subject=RestoreEarth">
                <a className="link">support@angelprotocol.io</a>
              </Link>
            </p>
            <Button variant="primary" type="submit">
              Retry
            </Button>
          </Form>
        )}
      {transactionStep == TRANSACTION_STEPS.SUCCESS && (
        <Form>
          <p>
            Thank you for your donation! We should be advancing you to the next
            screen.
          </p>
        </Form>
      )}
    </section>
  );
};
export default Donate;
