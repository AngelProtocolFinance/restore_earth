import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TerraConnections from "../components/connections/TerraConnections";
import EthereumConnections from "../components/connections/EthereumConnections";

import { useState } from "react";
import { disconnect } from "process";
import { Wallet } from "@terra-money/terra.js";

import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { METHODS } from "http";

const steps = {
  CONNECT: 1,
  DONATE: 2,
  THANKYOU: 3,
};

const postKycData = (kycData) => {
  return new Promise((resolve, reject) => {
    console.log("posting kycData: ", kycData);
    resolve(200);
  });
};

const Connect = ({
  onConnectionSuccess,
  onConnectionError,
  onWalletDisconnect,
}) => {
  return (
    <div>
      <h1>Connect</h1>
      <h3>Terra</h3>
      <TerraConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
      <h3>Ethereum</h3>
      <EthereumConnections
        onConnectionSuccess={onConnectionSuccess}
        onConnectionError={onConnectionError}
        onWalletDisconnect={onWalletDisconnect}
      />
    </div>
  );
};

const TOKENS = {
  ETHEREUM: "ETH",
  TERRA: "UST",
};

const Donate = ({ setStep, wallet, onDonate }) => {
  const [amount, setAmount] = useState("");
  const [receiveNft, setReceiveNft] = useState(false);
  const [receiveReceipt, setReceiveReceipt] = useState(false);
  const [tcaMember, setTcaMember] = useState(false);

  interface nftDataType {
    address: string;
  }
  const [nftData, setNftData]: [nftDataType, (args: any) => void] = useState({
    address: "",
  });
  const onChangeNftData = (newData: any) => {
    const data: nftDataType = {
      ...nftData,
      ...newData,
    };
    setNftData(data);
  };

  interface kycDataType {
    name: string;
    email: string;
    streetAddress: string;
    country: string;
    state: "";
    city: string;
    zipcode: string;
  }
  const [kycData, setKycData]: [kycDataType, (args: any) => void] = useState({
    email: "",
    name: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
  });
  const onChangeKycData = (newData: any) => {
    const data: kycDataType = {
      ...kycData,
      ...newData,
    };
    setKycData(data);
  };
  interface tcaDataType {
    affiliateId: string;
  }
  const [tcaData, setTcaData]: [tcaDataType, (args: any) => void] = useState({
    affiliateId: "",
  });
  const onChangeTcaData = (newData: any) => {
    const data: tcaDataType = {
      ...tcaData,
      ...newData,
    };
    setTcaData(data);
  };

  const address = wallet.methods.address();
  const token = TOKENS[wallet.chain];

  const onSuccess = () => {
    setStep(steps.THANKYOU);
  };

  const onError = () => {
    setStep(steps.DONATE);
  };

  const onClickDisconnect = () => {
    wallet.methods.disconnect();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = wallet.methods.toUnit(amount);

    postKycData(kycData)
      .then((result) => {
        wallet.methods
          .donate(formattedAmount)
          .then((result) => {
            onDonate({ amount, kycData });
          })
          .catch((error) => {
            console.log("error donating to wallet: ", error);
          });
      })
      .catch((error) => {
        console.log("error posting kyc data: ", error);
      });
  };

  return (
    <section>
      <h1>Donate</h1>
      <p>Connected as: {address}</p>
      <button onClick={onClickDisconnect}>disconnect</button>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>{token}</InputGroup.Text>
            <Form.Control
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
          </InputGroup>
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
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>Terra Address</InputGroup.Text>
                <Form.Control
                  type="text"
                  name="formAddress"
                  value={nftData.address}
                  onChange={(e) => {
                    const address = e.currentTarget.value;
                    onChangeNftData({ address });
                  }}
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
                value={kycData.name}
                onChange={(e) => {
                  const name = e.currentTarget.value;
                  onChangeKycData({ name });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="formEmail"
                value={kycData.email}
                onChange={(e) => {
                  const email = e.currentTarget.value;
                  onChangeKycData({ email });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Address</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Street address"
                    value={kycData.streetAddress}
                    onChange={(e) => {
                      const streetAddress = e.currentTarget.value;
                      onChangeKycData({ streetAddress });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="City"
                    value={kycData.city}
                    onChange={(e) => {
                      const city = e.currentTarget.value;
                      onChangeKycData({ city });
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="State"
                    value={kycData.state}
                    onChange={(e) => {
                      const state = e.currentTarget.value;
                      onChangeKycData({ state });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Country"
                    value={kycData.country}
                    onChange={(e) => {
                      const country = e.currentTarget.value;
                      onChangeKycData({ country });
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Zipcode"
                    value={kycData.zipcode}
                    onChange={(e) => {
                      const zipcode = e.currentTarget.value;
                      onChangeKycData({ zipcode });
                    }}
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
              onChangeTcaData({ affiliateId });
            }}
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

const ThankYou = () => {
  return <section>Thank You!</section>;
};

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(steps.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(steps.DONATE);
  };

  const onDonate = ({ amount, kycData }) => {
    setStep(steps.THANKYOU);
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    onWalletDisconnect();
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
    setStep(steps.CONNECT);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Header />

      <div className="content-wrap">
        <div className="container pt-160 pb-100 position-relative">
          <div className="row">
            <div className="col-md-8 mx-auto">
              {step == steps.CONNECT && (
                <Connect
                  onConnectionSuccess={onConnectionSuccess}
                  onConnectionError={onConnectionError}
                  onWalletDisconnect={onWalletDisconnect}
                />
              )}
              {step == steps.DONATE && (
                <Donate setStep={setStep} wallet={wallet} onDonate={onDonate} />
              )}
              {step == steps.THANKYOU && <ThankYou />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonatePage;
