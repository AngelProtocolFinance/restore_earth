import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

import { WalletStatus } from "components/Donate/Connections/Wallet";

import { STEPS, TRANSACTION_STEPS } from "components/Donate/variables";
import useNFTData from "components/Donate/Data/NFTData";
import { NFTDataType } from "components/Donate/Data/NFTData";
import useKYCData from "components/Donate/Data/KYCData";
import { KYCDataType } from "components/Donate/Data/KYCData";
import useTCAData from "components/Donate/Data/TCAData";
import { TCADataType } from "components/Donate/Data/TCAData";

import { sendKYCData } from "components/Donate/AngelProtocol/index";

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

// const postKycData = ({ amount, NFTData, KYCData, TCAData }) => {
//   return new Promise((resolve, reject) => {
//     console.log("posting data: ", amount, NFTData, KYCData, TCAData);
//     resolve(200);
//   });
// };

const DonationAmountForm = ({
  wallet,
  amount,
  setAmount,
  selectedAmount,
  setSelectedAmount,
}) => {
  const token = TOKENS[wallet.chain];
  const suggestedDonationAmounts = SUGGESTED_DONATION_AMOUNTS[wallet.chain];

  return (
    <Form.Group className="mb-3" controlId="formAmount">
      <Form.Label>Amount</Form.Label>
      {suggestedDonationAmounts.map((suggestedAmount) => {
        return (
          <Form.Check type="radio" key={suggestedAmount}>
            <Form.Check.Input
              type="radio"
              name="formAmount"
              onChange={(e) => {
                const selectedAmount = e.currentTarget.value;
                setSelectedAmount(selectedAmount);
                setAmount(selectedAmount);
              }}
              value={suggestedAmount}
              checked={selectedAmount == suggestedAmount}
            />
            <Form.Check.Label>
              {suggestedAmount} {token}
            </Form.Check.Label>
          </Form.Check>
        );
      })}
      <Form.Check type="radio" id={`formAmount-custom`}>
        <Form.Check.Input
          type="radio"
          name="formAmount"
          onChange={(e) => {
            setSelectedAmount("custom");
          }}
        />
        <Form.Check.Label>
          <Form.Control
            type="text"
            name="amount"
            value={amount}
            onFocus={(e) => {
              setAmount(e.currentTarget.value);
              document.getElementById("formAmount-custom").click();
            }}
            onChange={(e) => setAmount(e.currentTarget.value)}
            className="donate__form__amount__input"
          />
        </Form.Check.Label>
      </Form.Check>
      <Form.Text className="text-muted">
        The amount you want to donate
      </Form.Text>
    </Form.Group>
  );
};

const NFTForm = ({ wallet, NFTData, setNFTData }) => {
  const [receiveNft, setReceiveNft] = useState(false);
  return (
    <>
      <Form.Check
        type="checkbox"
        id="formReceiveNFT"
        checked={receiveNft}
        label={`Check this box if you'd like to receive an NFT`}
        onChange={() => {
          setReceiveNft(!receiveNft);
        }}
      />
      {receiveNft && (
        <>
          <Form.Group className="mb-3" controlId="walletAddress">
            <Form.Label>Address</Form.Label>
            <InputGroup>
              <InputGroup.Text>Terra Address</InputGroup.Text>
              <Form.Control
                type="text"
                name="walletAddress"
                value={NFTData.address}
                onChange={(e) => {
                  const address = e.currentTarget.value;
                  setNFTData({ address });
                }}
                className="donate__form__nft__input"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              The address that will receive the NFT
            </Form.Text>
          </Form.Group>
        </>
      )}
    </>
  );
};

const KYCForm = ({ wallet, KYCData, setKYCData }) => {
  const [showKYC, setShowKYC] = useState(false);
  return (
    <>
      <Form.Check
        type="checkbox"
        id="formReceiveReceipt"
        checked={showKYC}
        label={`Check this box if you'd like to be emailed a tax receipt`}
        onChange={() => {
          setShowKYC(!showKYC);
        }}
      />

      {showKYC && (
        <>
          <p>
            Please note that our tax receipts are issued by an US-based
            501(c)(3) nonprofit. Please consult with your local lawyer,
            accountant or tax advisor to determine the eligibility of your
            donation for a tax relief in your country of residence.
          </p>
          <Form.Group className="mb-3" controlId="formFullName">
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
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
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Address</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Street address"
                  value={KYCData.streetAddress}
                  onChange={(e) => {
                    const streetAddress = e.currentTarget.value;
                    setKYCData({ streetAddress });
                  }}
                  className="donate__form__kyc__input"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="City"
                  value={KYCData.city}
                  onChange={(e) => {
                    const city = e.currentTarget.value;
                    setKYCData({ city });
                  }}
                  className="donate__form__kyc__input"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="State"
                  value={KYCData.state}
                  onChange={(e) => {
                    const state = e.currentTarget.value;
                    setKYCData({ state });
                  }}
                  className="donate__form__kyc__input"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Country"
                  value={KYCData.country}
                  onChange={(e) => {
                    const country = e.currentTarget.value;
                    setKYCData({ country });
                  }}
                  className="donate__form__kyc__input"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Zipcode"
                  value={KYCData.zipcode}
                  onChange={(e) => {
                    const zipcode = e.currentTarget.value;
                    setKYCData({ zipcode });
                  }}
                  className="donate__form__kyc__input"
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

const Donate = ({ setStep, wallet, onDonationSuccess }) => {
  const [transactionStep, setTransactionStep] = useState(
    TRANSACTION_STEPS.FORM
  );
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: make amount adjustment simpler
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  const [NFTData, setNFTData] = useNFTData();
  const [KYCData, setKYCData] = useKYCData();
  const [TCAData, setTCAData] = useTCAData();

  const onSuccess = () => {
    setStep(STEPS.THANKYOU);
  };

  const onError = () => {
    setStep(STEPS.DONATE);
  };

  const onClickDisconnect = () => {
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
        setTransactionStep(TRANSACTION_STEPS.ERROR_KYC);
        setErrorMessage(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = wallet.methods.toUnit(amount);
    setTransactionStep(TRANSACTION_STEPS.SENDING_TRANSACTION);

    wallet.methods
      .donate(formattedAmount)
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
      <h1>Donate</h1>
      <WalletStatus wallet={wallet} onClickDisconnect={onClickDisconnect} />
      {transactionStep == TRANSACTION_STEPS.FORM && (
        <Form onSubmit={onSubmit}>
          <DonationAmountForm
            wallet={wallet}
            amount={amount}
            setAmount={setAmount}
            selectedAmount={selectedAmount}
            setSelectedAmount={setSelectedAmount}
          />
          <NFTForm wallet={wallet} NFTData={NFTData} setNFTData={setNFTData} />
          <KYCForm wallet={wallet} KYCData={KYCData} setKYCData={setKYCData} />
          <TCAForm wallet={wallet} TCAData={TCAData} setTCAData={setTCAData} />

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
          <Button onClick={wallet.methods.disconnect}>Reconnect Wallet</Button>
        </Form>
      )}
      {transactionStep == TRANSACTION_STEPS.ERROR_KYC && (
        <Form>
          <p>
            There was an error updating the campaign status. If you wanted a
            receipt, please reach out to us directly at{" "}
            <a
              href={`https://twitter.com/
            ${TWITTER_HANDLE}`}
            >
              twitter.com/ ${TWITTER_HANDLE}
            </a>
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
