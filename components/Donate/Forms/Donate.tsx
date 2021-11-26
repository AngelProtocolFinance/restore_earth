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
    // <Form.Group className="mb-3" controlId="formAmount">
    //   {suggestedDonationAmounts.map((suggestedAmount) => {
    //     return (
    //       <>
    //         <span className="mr-1rem">
    //           <input
    //             type="radio"
    //             className="btn-check"
    //             name="formAmount"
    //             id={`formAmount-${suggestedAmount}`}
    //             autoComplete="off"
    //             value={suggestedAmount}
    //             checked={selectedAmount == suggestedAmount}
    //             onChange={(e) => {
    //               const selectedAmount = e.currentTarget.value;
    //               setSelectedAmount(selectedAmount);
    //               setAmount(selectedAmount);
    //             }}
    //           />
    //           <label
    //             className="btn btn-secondary"
    //             htmlFor={`formAmount-${suggestedAmount}`}
    //           >
    //             {suggestedAmount} {token}
    //           </label>
    //         </span>
    //       </>
    //     );
    //   })}
    //   <span className="mr-1rem">
    //     <input
    //       type="radio"
    //       className="btn-check"
    //       name="formAmount"
    //       id={`formAmount-custom`}
    //       autoComplete="off"
    //       value="custom"
    //       checked={selectedAmount == "custom"}
    //       onChange={(e) => {
    //         setSelectedAmount("custom");
    //       }}
    //     />
    //     <label className="btn btn-secondary" htmlFor="formAmount-custom">
    //       Custom:
    //       <Form.Control
    //         type="text"
    //         name="amount"
    //         value={amount}
    //         onFocus={(e) => {
    //           setAmount(e.currentTarget.value);
    //           document.getElementById("formAmount-custom").click();
    //         }}
    //         onChange={(e) => setAmount(e.currentTarget.value)}
    //         className="donate__form__amount__input"
    //       />
    //     </label>
    //   </span>
    // </Form.Group>
    <>
      <Form.Control
        type="text"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
        className="donate__form__amount__input"
        placeholder={`How much ${wallet.glyph}${wallet.denomination} would you like to donate?`}
        required
      />
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
        className="mt-1rem mb-2rem"
      />
      {nftRequested && (
        <>
          <p>
            To receive a Galactic Punk,{" "}
            <a href="https://station.terra.money/">create a wallet on Terra</a>{" "}
            and enter your address below.
          </p>
          <Form.Group className="mb-2rem" controlId="walletAddress">
            <Form.Label className="fs-6 ml-1rem">
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
        className="mt-1rem mb-1rem"
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
          <Form.Group className="mb-2rem" controlId="formFullName">
            <Form.Label className="fs-6 ml-1rem">Full Name</Form.Label>
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
          <Form.Group className="mb-2rem" controlId="formEmail">
            <Form.Label className="fs-6 ml-1rem">Email Address</Form.Label>
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
          <Form.Group className="mb-2rem" controlId="formEmail">
            <Form.Label className="fs-6 ml-1rem">Address</Form.Label>
            <Row className="mt-1rem mb-1rem">
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
            <Row className="mt-1rem mb-1rem">
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
            <Row className="mt-1rem mb-1rem">
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
      <p className="mt-2rem mb-1rem">
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
