import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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

import processImage from "../public/images/process.svg";
import iconSun from "../public/images/icons/sun.svg";
import iconPlant from "../public/images/icons/plant.svg";
import iconWater from "../public/images/icons/water.svg";
import earth1 from "../public/images/earths/earth1.png";
import earth2 from "../public/images/earths/earth2.png";
import earth3 from "../public/images/earths/earth3.png";
import earth4 from "../public/images/earths/earth4.png";
import earth5 from "../public/images/earths/earth5.png";
import punk1 from "../public/images/punks/punk1.png";
import angel2 from "../public/images/angels/angel_2.png";
import angel3 from "../public/images/angels/angel_3.png";
import angel4 from "../public/images/angels/angel_4.png";
import angelUnrevealed from "../public/images/angels/angel_unrevealed.png";
import punk5 from "../public/images/punks/punk5.png";
import punk6 from "../public/images/punks/punk6.png";
import punk7 from "../public/images/punks/punk7.png";
import charity5gyresColor from "../public/images/charities/5gyres-color.png";
import charityGlobalColor from "../public/images/charities/global-color.png";
import charitySelfColor from "../public/images/charities/self-color.png";

import {
  getCampaignProgress,
  getTopDonors,
} from "components/Donate/AngelProtocol";

import Page from "../components/Page";

const humanize = require("humanize-plus");

const indexToPlace = (index) => {
  switch (index) {
    case 0:
      return (
        <>
          1<sup>st</sup>
        </>
      );
    case 1:
      return (
        <>
          2<sup>nd</sup>
        </>
      );
    case 2:
      return (
        <>
          3<sup>rd</sup>
        </>
      );
    case 20:
      return (
        <>
          21<sup>st</sup>
        </>
      );
    case 21:
      return (
        <>
          22<sup>nd</sup>
        </>
      );
    case 22:
      return (
        <>
          23<sup>rd</sup>
        </>
      );
    case 30:
      return (
        <>
          31<sup>st</sup>
        </>
      );
    case 31:
      return (
        <>
          32<sup>nd</sup>
        </>
      );
    case 32:
      return (
        <>
          33<sup>rd</sup>
        </>
      );
    case 40:
      return (
        <>
          41<sup>st</sup>
        </>
      );
    case 41:
      return (
        <>
          42<sup>nd</sup>
        </>
      );
    case 42:
      return (
        <>
          43<sup>rd</sup>
        </>
      );
    case 50:
      return (
        <>
          51<sup>st</sup>
        </>
      );
    case 51:
      return (
        <>
          52<sup>nd</sup>
        </>
      );
    case 52:
      return (
        <>
          53<sup>rd</sup>
        </>
      );
    case 60:
      return (
        <>
          61<sup>st</sup>
        </>
      );
    case 61:
      return (
        <>
          62<sup>nd</sup>
        </>
      );
    case 62:
      return (
        <>
          63<sup>rd</sup>
        </>
      );
    default:
      return (
        <>
          {index + 1}
          <sup>th</sup>
        </>
      );
  }
};

const Leaderboard = () => {
  const [topDonors, setTopDonors] = useState([]);
  const DEFAULT_MEMBERS_LENGTH = 5;
  const [membersLength, setMembersLength] = useState(DEFAULT_MEMBERS_LENGTH);

  useEffect(() => {
    getTopDonors()
      .then((data: any[]) => {
        setTopDonors(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="padding-spacer-top padding-spacer-bottom mt-n8 shape-parent bg-dark overflow-hidden text-white">
        <div className="container" id="nft">
          <div className="row justify-content-xl-center gh-1 gv-5 mb-n7">
            <div className="col-12 col-lg-4 me-lg-auto me-xl-0">
              <h2 className="h3 text-white">Angel Alliance Leaderboard</h2>
              <p className="my-rem-4">
                See where your team stacks up against other Alliance members.
              </p>
              <p
                className="my-rem-4"
                style={{ fontSize: "0.8rem", opacity: 0.7 }}
              >
                Note: Only donations that had a protocol or project selected for
                attribution in the donation process will be reflected here.
              </p>
            </div>
            <div className="d-none d-xl-block col-1" />
            <div className="col-12 col-lg-6 col-xl-5">
              {topDonors.slice(0, membersLength).map((donor, index) => {
                return (
                  <div
                    key={`${donor.allianceMember}-${donor.totalDonation}`}
                    className="d-flex"
                  >
                    <div
                      className="pr-rem-4"
                      style={{
                        lineHeight: "30px",
                        width: "3.5rem",
                        textAlign: "right",
                      }}
                    >
                      {indexToPlace(index)}
                    </div>
                    <div
                      className="progress mb-40 flex-grow-1"
                      style={{
                        height: "30px",
                        position: "relative",
                      }}
                    >
                      <OverlayTrigger
                        placement={"top"}
                        overlay={
                          <Tooltip id={`tooltip-top`}>Donations</Tooltip>
                        }
                      >
                        <>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${
                                (donor.totalDonation /
                                  topDonors[0].totalDonation) *
                                100
                              }%`,
                            }}
                            aria-valuenow={donor.totalDonation}
                            aria-valuemin={0}
                            aria-valuemax={topDonors[0].totalDonation}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Donations"
                          ></div>
                          <div
                            className="text-dark"
                            style={{
                              position: "absolute",
                              lineHeight: "30px",
                              left: "1rem",
                            }}
                          >
                            {donor.allianceMember}: $
                            {humanize.compactInteger(donor.totalDonation, 1)}
                          </div>
                        </>
                      </OverlayTrigger>
                    </div>
                  </div>
                );
              })}
              {membersLength == DEFAULT_MEMBERS_LENGTH && (
                <div style={{ textAlign: "right" }}>
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setMembersLength(topDonors.length)}
                  >
                    View the rest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LeaderboardPage: NextPage = () => {
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

      <Page>
        <Leaderboard />
      </Page>
      <Footer />
    </>
  );
};

export default LeaderboardPage;
