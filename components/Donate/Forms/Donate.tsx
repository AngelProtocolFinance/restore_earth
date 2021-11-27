import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

import {
  WalletChains,
  WalletStatus,
} from "components/Donate/Connections/Wallet";

import { STEPS, TRANSACTION_STEPS } from "components/Donate/variables";
import useNFTData from "components/Donate/Data/NFTData";
import { NFTDataType } from "components/Donate/Data/NFTData";
import useKYCData from "components/Donate/Data/KYCData";
import { KYCDataType } from "components/Donate/Data/KYCData";
import useTCAData from "components/Donate/Data/TCAData";
import { TCADataType } from "components/Donate/Data/TCAData";

import {
  sendKYCData,
  BTC_WALLET_ADDRESS,
} from "components/Donate/AngelProtocol/index";

const TWITTER_HANDLE = "example";
const TOKENS = {
  BITCOIN: "BTC",
  ETHEREUM: "ETH",
  TERRA: "UST",
};

const SUGGESTED_DONATION_AMOUNTS = {
  BITCOIN: ["0.0017", "0.0087", "0.017", "0.087", "0.44", "0.87", "1.74"],
  ETHEREUM: ["0.024", "0.12", "0.24", "1.2", "6", "12", "24"],
  TERRA: ["100", "500", "1000", "5000", "25000", "50000", "100000"],
};

const DonationAmountForm = ({
  wallet,
  txHash,
  setTxHash,
  amount,
  setAmount,
  selectedAmount,
  setSelectedAmount,
}) => {
  // const token = TOKENS[wallet.chain];
  // const suggestedDonationAmounts = SUGGESTED_DONATION_AMOUNTS[wallet.chain];
  const bitcoinConnected = wallet.chain == WalletChains.BITCOIN;
  const placeHolder = bitcoinConnected
    ? `How much ${wallet.glyph}${wallet.denomination} did you donate?`
    : `How much ${wallet.glyph}${wallet.denomination} would you like to donate?`;

  return (
    <>
      {wallet.chain == WalletChains.BITCOIN && (
        <>
          <p>
            To make a donation via Bitcoin, send your transaction to{" "}
            <span className="font-monospace">{BTC_WALLET_ADDRESS}</span>
          </p>
          <p>
            Once your transaction is successful, please add the details below
            and we'll send you a receipt once we've confirmed the transaction
            (usually within an hour)
          </p>
          <div className="my-rem-8">
            <Form.Control
              type="text"
              name="txHash"
              value={txHash}
              onChange={(e) => setTxHash(e.currentTarget.value)}
              className="donate__form__txhash__input"
              placeholder="The transaction ID of the donation."
              required
            />
          </div>
        </>
      )}
      <div className="my-rem-8">
        <Form.Control
          type="text"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.currentTarget.value)}
          className="donate__form__amount__input"
          placeholder={placeHolder}
          pattern="^[0-9]*[.,]?[0-9]*$"
          required
        />
      </div>
    </>
  );
};

const NFTForm = ({ wallet, NFTData, setNFTData }) => {
  const nftRequested = NFTData.nftRequested;

  return (
    <>
      <Form.Check
        type="checkbox"
        id="formReceiveNFT"
        checked={nftRequested}
        label={`Check this box if you'd like to receive an NFT`}
        onChange={() => {
          const nftRequested = !NFTData.nftRequested;
          setNFTData({ nftRequested });
        }}
        className="mt-rem-4 mb-rem-8"
      />
      {nftRequested && (
        <>
          <p>
            To receive a Galactic Punk,{" "}
            <a href="https://station.terra.money/">create a wallet on Terra</a>{" "}
            and enter your address below.
          </p>
          <Form.Group className="mb-rem-2" controlId="walletAddress">
            <Form.Label className="fs-6 ml-rem-4">
              Terra Wallet Address
            </Form.Label>
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
            />
          </Form.Group>
        </>
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
        label={`Check this box if you'd like to be emailed a tax receipt`}
        onChange={() => {
          const receiptRequested = !KYCData.receiptRequested;
          setKYCData({ receiptRequested });
        }}
      />

      {receiptRequested && (
        <>
          <p>
            Please note that our tax receipts are issued by an US-based
            501(c)(3) nonprofit. Please consult with your local lawyer,
            accountant or tax advisor to determine the eligibility of your
            donation for a tax relief in your country of residence.
          </p>
          <Form.Group className="mb-rem-2" controlId="formFullName">
            <Form.Label className="fs-6 ml-rem-4">Full Name</Form.Label>
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
          <Form.Group className="mb-rem-2" controlId="formEmail">
            <Form.Label className="fs-6 ml-rem-4">Email Address</Form.Label>
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
          <Form.Group className="mb-rem-2" controlId="formEmail">
            <Form.Label className="fs-6 ml-rem-4">Address</Form.Label>
            <Row className="mt-rem-4 mb-rem-4">
              <Col>
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
              </Col>
            </Row>
            <Row className="mt-rem-4 mb-rem-4">
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
            <Row className="mt-rem-4 mb-rem-4">
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
          </Form.Group>
        </>
      )}
    </>
  );
};

const TCAForm = ({ wallet, TCAData, setTCAData }) => {
  const [showTCA, setShowTCA] = useState(false);
  return null;
  return (
    <>
      <Form.Check
        type="checkbox"
        id="formTerraCharityAlliance"
        checked={showTCA}
        label={`Check this box if you're a member of Terra's Charity Alliance`}
        onChange={() => {
          setShowTCA(!showTCA);
        }}
      />

      {showTCA && (
        <Form.Select
          aria-label="Affiliated TCA Member"
          onChange={(e) => {
            const affiliateId = e.currentTarget.value;
            setTCAData({ affiliateId });
          }}
          className="donate__form__tca__input"
        >
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      )}
    </>
  );
};

const DonationSummary = ({ wallet, amount, NFTData, KYCData, TCAData }) => {
  if (!amount || amount == "") {
    return null;
  }
  return (
    <>
      <p className="mt-rem-8 mb-rem-4">
        You'll donate {wallet.glyph} {amount} {wallet.denomination} to Restore
        Earth. Press donate to continue.
      </p>
    </>
  );
};

const Donate = ({ setStep, wallet, onDonationSuccess }) => {
  const [transactionStep, setTransactionStep] = useState(
    TRANSACTION_STEPS.FORM
  );
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: make amount adjustment simpler
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  // BTC Special Case
  const [txHash, setTxHash] = useState(undefined);

  const defaultNftAddress =
    wallet.chain == WalletChains.TERRA ? wallet.methods.address() : "";
  const [NFTData, setNFTData] = useNFTData({
    nftRequested: false,
    address: defaultNftAddress,
  });
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
          onDonationSuccess({ amount, NFTData, KYCData, TCAData });
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = wallet.methods.toUnit(amount);
    setTransactionStep(TRANSACTION_STEPS.SENDING_TRANSACTION);

    // BTC needs the user defined txHash
    wallet.methods
      .donate({ amount: formattedAmount, txHash })
      .then((transactionData) => {
        onTransactionSuccess({
          amount,
          wallet,
          transactionData,
          NFTData,
          KYCData,
          TCAData,
        });
        setTransactionStep(TRANSACTION_STEPS.SENDING_KYC);
      })
      .catch((error) => {
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
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
            txHash={txHash}
            setTxHash={setTxHash}
          />
          <NFTForm wallet={wallet} NFTData={NFTData} setNFTData={setNFTData} />
          <KYCForm wallet={wallet} KYCData={KYCData} setKYCData={setKYCData} />
          <TCAForm wallet={wallet} TCAData={TCAData} setTCAData={setTCAData} />

          <DonationSummary
            wallet={wallet}
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
          <p>The transaction failed, try again or reconnect your wallet?</p>
          <p>{errorMessage}</p>
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
              There was an error sending KYC data. Please reach out to us with
              your details.
            </p>
            <Button variant="primary" type="submit">
              Retry
            </Button>
          </Form>
        )}
      {transactionStep == TRANSACTION_STEPS.SUCCESS && (
        <Form>
          <p>Nice! We should be advancing you to the next screen.</p>
        </Form>
      )}
    </section>
  );
};
export default Donate;
