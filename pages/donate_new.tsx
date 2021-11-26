import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "components/Header";
import Footer from "components/Footer";

import { STEPS } from "components/Donate/variables";
import DonateHeader from "components/Donate/Header";
import DonateForm from "components/Donate/Forms/Donate";
import ConnectForm from "components/Donate/Forms/Connect";
import ThankYou from "components/Donate/ThankYou";

import punk1 from "../public/images/punks/punk1.png";
import punk2 from "../public/images/punks/punk2.png";
import punk3 from "../public/images/punks/punk3.png";
import punk4 from "../public/images/punks/punk4.png";
import punk5 from "../public/images/punks/punk5.png";
import punk6 from "../public/images/punks/punk6.png";
import punk7 from "../public/images/punks/punk7.png";

import {
  Accordion,
  AccordionContext,
  Nav,
  OverlayTrigger,
  Tab,
  Tooltip,
  useAccordionButton,
} from "react-bootstrap";

import CustomToggle from "components/CustomToggle";

const DonatePage: NextPage = () => {
  const [step, setStep] = useState(STEPS.CONNECT);
  const [wallet, setWallet] = useState(undefined);
  const onConnectionSuccess = (wallet) => {
    console.log("connected successfully: ", wallet);
    setWallet(wallet);
    setStep(STEPS.DONATE);
  };

  const onConnectionError = (error) => {
    console.log("could not connect: ", error);
    onWalletDisconnect();
  };

  const onDonationSuccess = ({ amount, NFTData, KYCData, TCAData }) => {
    setStep(STEPS.THANKYOU);
  };

  const onWalletDisconnect = () => {
    setWallet(undefined);
    setStep(STEPS.CONNECT);
  };

  return (
    <>
      <Head>
        <title>Restore Earth</title>
        <meta
          name="description"
          content="Amplify your impact this holiday season by giving through Angel Protocol."
        />
      </Head>
      <Header />

      <div className="padding-spacer-top padding-spacer-bottom mt-n8 shape-parent bg-dark overflow-hidden text-white">
        <div className="content-wrap">
          <div className="row justify-content-xl-center gh-1 gv-5 mb-n7">
            <div className="col-12 col-lg-4 me-lg-auto me-xl-0">
              <h2 className="h3 text-white">
                Donate to earn Galactic Angel NFTs — a Galactic Punks collection
              </h2>
              <p>
                Donors earn Galactic Angel NFTs with different attributes based
                on individual donation level and cumulative campaign donations.
              </p>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  alert("Please check back tomorrow 🌎");
                }}
              >
                <Link href="/donate">
                  <a
                    target="_blank"
                    className="btn btn-primary Button__gradient mt-30"
                  >
                    Donate now
                    <svg
                      className="icon-arrow icon-arrow-right"
                      width="25"
                      height="10"
                      viewBox="0 0 25 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 1L24 5L20 9"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 5L24 5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Link>
              </span>
            </div>
            <div className="d-none d-xl-block col-1" />
            <div className="col-12 col-lg-6 col-xl-5">
              <Accordion
                defaultActiveKey="1"
                className="bg-dark border-bottom border"
              >
                <CustomToggle eventKey="1">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 1</div>
                    <div>$100</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="1">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk1.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="2">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 2</div>
                    <div>$500</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="2">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk2.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="3">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 3</div>
                    <div>$1,000</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="3">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk3.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="4">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 4</div>
                    <div>$5,000</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="4">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk4.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="5">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 5</div>
                    <div>$25,00</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="5">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk5.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="6">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 6</div>
                    <div>$50,000</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="6">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk6.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
                <CustomToggle eventKey="7">
                  <div className="d-flex flex-row align-item-center justify-content-between">
                    <div className="fw-bolder">Tier 7</div>
                    <div>$100,000</div>
                  </div>
                </CustomToggle>
                <Accordion.Collapse eventKey="7">
                  <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                    <img
                      src={punk7.src}
                      className="img-thumbnail p-2 my-12"
                      width={100}
                      height={100}
                      alt="a galactic punk"
                    />
                    <div className="ms-20">
                      <div className="small muted">Galactic Angels</div>
                      <div className="fw-bolder fs-6">Galactic Angels</div>
                      <div className="fs-5">#8346</div>
                    </div>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonatePage;
