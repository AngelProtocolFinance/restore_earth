import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomToggle from "components/CustomToggle";

import RellaxWrapper from "react-rellax-wrapper";
import {
  Accordion,
  AccordionContext,
  Nav,
  OverlayTrigger,
  Tab,
  Tooltip,
  useAccordionButton,
} from "react-bootstrap";

import galacticPunkLogo from "public/images/logos/gplogo.png";
import processImage from "../public/images/process.svg";
import iconSun from "../public/images/icons/sun.svg";
import iconPlant from "../public/images/icons/plant.svg";
import iconWater from "../public/images/icons/water.svg";
import earth1 from "../public/images/earths/earth1.png";
import earth2 from "../public/images/earths/earth2.png";
import earth3 from "../public/images/earths/earth3.png";
import earth4 from "../public/images/earths/earth4.png";
import earth5 from "../public/images/earths/earth5.png";
import angel1 from "../public/images/angels/angel_2.png";
import angel2 from "../public/images/angels/angel_3.png";
import angel3 from "../public/images/angels/angel_4.png";
import angelUnrevealed from "../public/images/angels/angel_unrevealed.png";
import charity5gyresColor from "../public/images/charities/5gyres-color.png";
import charityGlobalColor from "../public/images/charities/global-color.png";
import charitySelfColor from "../public/images/charities/self-color.png";

import {
  getCampaignProgress,
  getTopDonors,
} from "components/Donate/AngelProtocol";

const humanize = require("humanize-plus");

const donationGoal = (amount) => {
  if (amount < 10000) {
    return 80000;
  }

  if (amount < 20000) {
    return 160000;
  }

  if (amount < 30000) {
    return 240000;
  }

  if (amount < 40000) {
    return 320000;
  }

  if (amount < 50000) {
    return 400000;
  }

  if (amount < 60000) {
    return 480000;
  }

  if (amount < 70000) {
    return 560000;
  }

  if (amount < 80000) {
    return 640000;
  }

  if (amount < 90000) {
    return 720000;
  }

  if (amount < 500000) {
    const goal = amount * 2.5 + 250000;
    return goal;
  }

  if (amount < 750000) {
    const goal = amount * 2.5 + 125000;
    return goal;
  }

  if (amount < 1000000) {
    const goal = amount * 2.5 + 62500;
    return goal;
  }

  if (amount >= 1000000) {
    const goal = amount * 2.5 + 25000;
    return goal;
  }

  return 3000000;
};

const Index: NextPage = () => {
  const [totalDonations, setTotalDonations] = useState(291000);
  const [totalDonationsGoals, setTotalDonationsGoals] = useState(1000000);
  const totalDonationsImpact = totalDonations * (10 * 0.15); // 10 years * 15% yield
  const [topDonor, setTopDonor] = useState(undefined);

  useEffect(() => {
    getCampaignProgress()
      .then((data: any) => {
        const donations = parseInt(data.totalUsd);
        setTotalDonations(donations);

        const goal = donationGoal(donations);
        setTotalDonationsGoals(goal);
      })
      .catch((error) => {
        console.error(error);
      });

    getTopDonors()
      .then((data: any[]) => {
        setTopDonor(data[0]?.allianceMember);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

      <div className="content-wrap">
        <div id="trigger" />

        {/* Hero */}
        <div className="padding-spacer-top pb-100 position-relative">
          <div className="background">
            <div className="background-overlay"></div>
            <video
              className="background-video bg-dark"
              autoPlay
              playsInline
              loop
              muted
            >
              <source src="/videos/stars.mp4" type="video/mp4" />
            </video>
            <div
              className="background-color"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(14, 14, 14, 0) 0%, #001328 100%)",
                zIndex: "1000000",
              }}
            />
          </div>
          <div className="container py-lg-2">
            <div className="row gh-1 gv-1 text-white">
              <div className="col-lg-5 me-auto">
                <img
                  className="img-fluid d-block d-sm-none"
                  src={earth5.src}
                  alt="earth"
                />

                <h1 className="display-4 text-white mb-0 Text__gradient fw-bold">
                  Restore Earth
                </h1>
              </div>
              <div className="col-lg-2"></div>
              <div className="col-lg me-xl-n30">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="text-center font-size-10">
                    <img
                      className="img-fluid"
                      src={iconSun.src}
                      alt="sun"
                      width={50}
                    />
                    <p className="mb-0 mt-6">
                      <strong>Offset Carbon</strong>
                    </p>
                    <p>SELF</p>
                  </div>
                  <div className="text-center font-size-10">
                    <img
                      className="img-fluid"
                      src={iconPlant.src}
                      alt="plant"
                      width={50}
                    />
                    <p className="mb-0 mt-6">
                      <strong>Plant Trees</strong>
                    </p>
                    <p>Global Brigades</p>
                  </div>
                  <div className="text-center font-size-10">
                    <img
                      className="img-fluid"
                      src={iconWater.src}
                      alt="water"
                      width={50}
                    />
                    <p className="mb-0 mt-6">
                      <strong>Reduce Ocean Plastic</strong>
                    </p>
                    <p>5 Gyres</p>
                  </div>
                </div>
                <hr className="mt-0 border-white" />
                <p className="lead fw-normal">
                  The Restore Earth campaign is complete, with over $1.5M
                  raised! Follow our{" "}
                  <Link href="https://discord.gg/RhqA652ySA">
                    <a className="text-white">Discord</a>
                  </Link>{" "}
                  &amp;{" "}
                  <Link href="https://twitter.com/angelprotocol">
                    <a className="text-white">Twitter</a>
                  </Link>{" "}
                  channels for further updates.
                </p>
                {topDonor && topDonor != "" && (
                  <Link href="/leaderboard">
                    <a
                      className="badge rounded-pill border-light text-light border border-2 mb-12 d-inline-block d-sm-none"
                      style={{ textDecoration: "none" }}
                    >
                      Top Donor: {topDonor}
                    </a>
                  </Link>
                )}
                <div className="flex flex-row justify-content-center align-items-center">
                  <Link href="#nft">
                    <a className="btn btn-outline-dark px-rem-2">
                      <img src={galacticPunkLogo.src} height={30} width={150} />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="d-none d-xl-block col-1"></div>
            </div>

            <div className="Planets d-none d-sm-grid">
              <Image className="img-fluid" src={earth1} alt="earth" />
              <Image className="img-fluid" src={earth2} alt="earth" />
              <Image className="img-fluid" src={earth3} alt="earth" />
              <Image className="img-fluid" src={earth4} alt="earth" />
              <Image className="img-fluid" src={earth5} alt="earth" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="padding-spacer-top padding-spacer-bottom shape-parent overflow-hidden">
          <div className="shape mt-n160">
            <RellaxWrapper speed={-1}>
              <svg
                className="mt-n160"
                width="518"
                height="641"
                viewBox="0 0 518 641"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="197.5" cy="320.5" r="320.5" fill="#F5F5F5" />
              </svg>
            </RellaxWrapper>
          </div>

          <div className="container pt-60" id="learn">
            <div className="row justify-content-xl-center gh-1 gv-2 mb-n7">
              <div className="col-12 col-lg-4 me-lg-auto me-xl-0">
                <div className="subtitle mt-n10">Angel Protocol</div>
                <h2 className="h3">
                  Donate.
                  <br />
                  Get rewarded.
                  <br />
                  <span className="fw-bolder">Help Restore Earth.</span>
                </h2>
                <Link href="https://www.angelprotocol.io/">
                  <a className="btn btn-dark d-none d-lg-block" target="_blank">
                    Explore Angel Protocol
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
              </div>
              <div className="d-none d-xl-block col-1" />
              <div className="col-12 col-lg-6 col-xl-5">
                <div
                  className="progress mb-40"
                  style={{
                    height: "30px",
                  }}
                >
                  <OverlayTrigger
                    key={"key1"}
                    placement={"top"}
                    overlay={<Tooltip id={`tooltip-top`}>Donations</Tooltip>}
                  >
                    <div
                      className="progress-bar text-dark"
                      role="progressbar"
                      style={{
                        width: `${
                          (totalDonations / totalDonationsGoals) * 100
                        }%`,
                      }}
                      aria-valuenow={totalDonations}
                      aria-valuemin={0}
                      aria-valuemax={totalDonationsGoals}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Donations"
                    >
                      ${humanize.compactInteger(totalDonations, 1)}
                    </div>
                  </OverlayTrigger>
                  <OverlayTrigger
                    key={"key2"}
                    placement={"top"}
                    overlay={<Tooltip id={`tooltip-top`}>AP Impact</Tooltip>}
                  >
                    <div
                      className="progress-bar bg-info text-dark"
                      role="progressbar"
                      style={{
                        width: `${
                          (totalDonationsImpact / totalDonationsGoals) * 100
                        }%`,
                      }}
                      aria-valuenow={totalDonationsImpact}
                      aria-valuemin={0}
                      aria-valuemax={totalDonationsGoals}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="AP Impact"
                    >
                      ${humanize.compactInteger(totalDonationsImpact, 1)}
                    </div>
                  </OverlayTrigger>
                </div>

                <p className="mb-12">
                  Angel Protocol empowers charitable organizations to create
                  non-custodial endowments on the Terra blockchain. All
                  donations sent to the endowments are automatically invested in
                  low-risk / high-yield DeFi products.
                </p>
                <p>
                  Donations via Angel Protocol currently earn over 15% yield for
                  partner non-profits every year, in perpetuity. Thanks to Angel
                  Protocol, when donors give once, they give forever.
                </p>
                <hr />
                <div className="row gh-1 gv-2 justify-content-around justify-content-sm-center text-center text-sm-start">
                  <div className="col-4">
                    <div className="number-box">
                      <div className="number-box-title h4">
                        ${humanize.compactInteger(totalDonations, 1)}
                      </div>
                      <div className="number-box-subtitle">total donations</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="number-box">
                      <div className="number-box-title h4">2.5x</div>
                      <div className="number-box-subtitle">10yr endowment</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="number-box">
                      <div className="number-box-title h4">15%+</div>
                      <div className="number-box-subtitle">current yield</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row text-center margin-spacer-top">
              <div className="col-12 col-sm-4">
                <a
                  href="https://www.5gyres.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="brand"
                >
                  <img
                    src={charity5gyresColor.src}
                    className="p-2 my-12 color"
                    alt="5 Gyres Institute logo"
                  />
                </a>
              </div>
              <div className="col-12 col-sm-4">
                <a
                  href="https://www.globalbrigades.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="brand"
                >
                  <img
                    src={charityGlobalColor.src}
                    className="p-2 my-12 color"
                    alt="Global Brigades logo"
                  />
                </a>
              </div>
              <div className="col-12 col-sm-4">
                <a
                  href="https://www.self.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="brand"
                >
                  <img
                    src={charitySelfColor.src}
                    className="p-2 my-12 color"
                    alt="Self logo"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How */}
        <div className="py-100 mt-n8 shape-parent bg-dark overflow-hidden">
          <div className="container">
            <Tab.Container id="process" defaultActiveKey="one">
              <div className="row gh-1 gv-2 d-flex flex-row justify-content-center align-item-center">
                <div className="col-12 col-md-7 col-lg-5 col-xl-4 align-self-center">
                  <Nav
                    variant="tabs"
                    className="nav nav-opacity nav-tabs nav-gap-md flex-column text-white"
                    as="ul"
                  >
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link as="button" eventKey="one">
                        Restore the planet <span className="badge">01</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link as="button" eventKey="two">
                        Magnify donations <span className="badge">02</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link as="button" eventKey="three">
                        Earn a Galactic Angel <span className="badge">03</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link as="button" eventKey="four">
                        Get instant tax receipts{" "}
                        <span className="badge">04</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

                <div className="col-12 col-md-5 col-lg-4 col-xl-4 align-self-center">
                  <Tab.Content className="text-white">
                    <Tab.Pane eventKey="one" className="fade show">
                      <div className="row gv-2 gh-2">
                        <div className="col-md-12">
                          <p className="mb-0">
                            Donors will have the opportunity to give back to
                            three charities dedicated to restoring our planet in
                            different ways:{" "}
                            <a
                              className="link-light"
                              href="https://www.5gyres.org/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              5 Gyres
                            </a>{" "}
                            (ocean plastics),{" "}
                            <a
                              className="link-light"
                              href="https://www.globalbrigades.org/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Global Brigades
                            </a>{" "}
                            (reforestation), and{" "}
                            <a
                              className="link-light"
                              href="https://www.self.org/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              SELF
                            </a>{" "}
                            (solar).
                          </p>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="two" className="fade show">
                      <div className="row gv-2 gh-2">
                        <div className="col-md-12">
                          <p className="mb-0">
                            Donations use Terra (Anchor) blockchain economics to
                            deliver significantly more income than the donated
                            amount over time.
                          </p>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="three" className="fade show">
                      <div className="row gv-2 gh-2">
                        <div className="col-md-12">
                          <p className="mb-0">
                            A collection of Galactic Angel NFTs will be
                            delivered to donors who meet certain thresholds for
                            giving. These Galactic Angels will play a part in
                            the Galactic Punks metaverse.
                          </p>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="four" className="fade show">
                      <div className="row gv-2 gh-2">
                        <div className="col-md-12">
                          <p className="mb-0">
                            Some donors can reduce their taxes by up to 50% of
                            their pledge by donating to the Restore Earth
                            campaign. All recipient organizations are 501(c)(3)
                            nonprofits, and tax receipts are immediately
                            generated if requested.
                          </p>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>

                <div className="d-none d-lg-block col-lg-3 col-xl-4 align-self-center">
                  <img className="img-fluid " src={earth5.src} alt="earth" />
                </div>
              </div>
            </Tab.Container>
          </div>
        </div>

        {/* Process */}
        <div className="padding-spacer-top padding-spacer-bottom">
          <div className="container">
            <div className="row gh-5 gv-3 justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="row justify-content-between">
                  <div className="col-12 col-lg-10 col-xl-8">
                    <h2 className="h3 mb-12">
                      Your donation will keep giving,{" "}
                      <span className="fw-bolder">forever</span>.
                    </h2>
                  </div>
                  <div className="col-lg-auto d-none d-lg-block">
                    <hr className="mt-25 mb-0 width-70px" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10">
                <img
                  className="img-fluid d-flex mx-auto"
                  src={processImage.src}
                  alt="Diagram of how angel protocol helps non-profits have funding forever."
                />
              </div>
              <div className="col-12 col-lg-10">
                <Link href="https://www.angelprotocol.io/">
                  <a target="_blank" className="btn btn-dark">
                    Explore Angel Protocol
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
              </div>
            </div>
          </div>
        </div>

        {/* Punks */}
        <div className="padding-spacer-top padding-spacer-bottom mt-n8 shape-parent bg-dark overflow-hidden text-white">
          {/*<div className="shape justify-content-end mt-n160">*/}
          {/*    <RellaxWrapper speed={-1}>*/}
          {/*        <svg className="mt-n160" width="415" height="641"*/}
          {/*             viewBox="0 0 415 641" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
          {/*            <circle cx="320.5" cy="320.5" r="320.5" fill="#202020"/>*/}
          {/*        </svg>*/}
          {/*    </RellaxWrapper>*/}
          {/*</div>*/}
          <div className="container" id="nft">
            <div className="row justify-content-xl-center gh-1 gv-5 mb-n7">
              <div className="col-12 col-lg-4 me-lg-auto me-xl-0">
                <h2 className="h3 text-white">
                  Donate to earn Galactic Angel NFTs — a Galactic Punks
                  collection
                </h2>
                <p>
                  Donors earn Galactic Angel NFTs with different attributes
                  based on individual donation level and cumulative campaign
                  donations.
                </p>
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
                        src={angel1.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Example only — Angels may vary
                        </div>
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
                        src={angel2.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Example only — Angels may vary
                        </div>
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
                        src={angel3.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Example only — Angels may vary
                        </div>
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
                        src={angelUnrevealed.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Unrevealed
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                  <CustomToggle eventKey="5">
                    <div className="d-flex flex-row align-item-center justify-content-between">
                      <div className="fw-bolder">Tier 5</div>
                      <div>$25,000</div>
                    </div>
                  </CustomToggle>
                  <Accordion.Collapse eventKey="5">
                    <div className="d-flex flex-row border-top border-secondary ps-12 align-items-center bg-opacity">
                      <img
                        src={angelUnrevealed.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="an unrevealed galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Unrevealed
                        </div>
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
                        src={angelUnrevealed.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Unrevealed
                        </div>
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
                        src={angelUnrevealed.src}
                        className="img-thumbnail p-2 my-12"
                        width={100}
                        height={100}
                        alt="a galactic angel"
                      />
                      <div className="ms-20">
                        <div className="fw-bolder fs-6">Galactic Angels</div>
                        <div className="small muted" style={{ opacity: 0.5 }}>
                          Unrevealed
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
