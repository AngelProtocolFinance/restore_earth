import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { useState } from "react";

import { STEPS } from "components/Donate/variables";
import useNFTData from "../Data/NFTData";
import { NFTDataType } from "../Data/NFTData";
import useKYCData from "../Data/KYCData";
import { KYCDataType } from "../Data/KYCData";
import useTCAData from "../Data/TCAData";
import { TCADataType } from "../Data/TCAData";

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

const postKycData = ({ amount, NFTData, KYCData, TCAData }) => {
  return new Promise((resolve, reject) => {
    console.log("posting data: ", amount, NFTData, KYCData, TCAData);
    resolve(200);
  });
};

const Donate = ({ setStep, wallet, onDonate }) => {
  // TODO: use pendingRequest to disable button and show loading state
  const [pendingRequest, setPendingRequest] = useState(false);
  // TODO: use error to display error and allow user to retry
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // TODO: make amount adjustment simpler
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  const [receiveNft, setReceiveNft] = useState(false);
  const [NFTData, setNFTData] = useNFTData();

  const [receiveReceipt, setReceiveReceipt] = useState(false);
  const [KYCData, setKYCData] = useKYCData();

  const [tcaMember, setTcaMember] = useState(false);
  const [TCAData, setTCAData] = useTCAData();

  const address = wallet.methods.address();
  const token = TOKENS[wallet.chain];
  const suggestedDonationAmounts = SUGGESTED_DONATION_AMOUNTS[wallet.chain];

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

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = wallet.methods.toUnit(amount);
    setPendingRequest(true);

    postKycData({ amount, NFTData, KYCData, TCAData })
      .then((result) => {
        wallet.methods
          .donate(formattedAmount)
          .then((result) => {
            setPendingRequest(false);
            onDonate({ amount, NFTData, KYCData, TCAData });
          })
          .catch((error) => {
            setPendingRequest(false);
            setError(true);
            setErrorMessage(error);
          });
      })
      .catch((error) => {
        setPendingRequest(false);
        setError(true);
        setErrorMessage(error);
      });
  };

  return (
    <section>
      <h1>Donate</h1>
      <WalletStatus wallet={wallet} onDisconect={onClickDisconnect} />
      <Form onSubmit={onSubmit}>
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

        <Form.Check
          type="checkbox"
          id="formReceiveReceipt"
          checked={receiveReceipt}
          label={`Check this box if you'd like to be emailed a tax receipt`}
          onChange={() => {
            setReceiveReceipt(!receiveReceipt);
          }}
        />

        {receiveReceipt && (
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

        <Form.Check
          type="checkbox"
          id="formTerraCharityAlliance"
          checked={tcaMember}
          label={`Check this box if you're a member of Terra's Charity Alliance`}
          onChange={() => {
            setTcaMember(!tcaMember);
          }}
        />

        {tcaMember && (
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

        <Button variant="primary" type="submit">
          Donate Now
        </Button>
      </Form>
    </section>
  );
};
export default Donate;
