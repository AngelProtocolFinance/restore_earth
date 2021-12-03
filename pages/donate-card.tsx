import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";

import Page from "../components/Page";

import { ETH_WALLET_ADDRESS } from "components/Donate/AngelProtocol";

// 1.) Visit Transak
// 2.) Select BTC or Ethereum
// 3.) Enter  Ethereum/BTC address (we provide the RE ones).
// 4.) Done!

const DonateCard = () => {
  return (
    <>
      <h3>How to donate with your credit card</h3>
      <p>
        Want to donate to Restore Earth, but don&apos;t want to donate via
        crypto? Here&apos;s how!
      </p>
      <p className="small">
        Note: We unfortunately cannot provide instant tax receipt emails for
        donations via credit card, however the amount will still be treated as a
        501c3 donation. You will just need to record the donation yourself.
      </p>
      <p>
        <ol>
          <li className="my-rem-4">
            <Link href="https://beta.transak.com">
              <a className="link">Visit Transak</a>
            </Link>
          </li>
          <li className="my-rem-4">
            Enter your donation amount, and click &quot;Buy Now&quot;
          </li>
          <li className="my-rem-4">
            Enter <span className="monospace">{ETH_WALLET_ADDRESS}</span> as the{" "}
            <span className="monospace">ETH Wallet Address</span> and continue
            through Transak
          </li>
          <li className="my-rem-4">Done!</li>
        </ol>
      </p>
    </>
  );
};

const DonateCardPage: NextPage = () => {
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
        <div className="pt-rem-12 padding-spacer-bottom">
          <div className="container-fluid px-rem-4">
            <div className="row justify-content-md-center">
              <div className="col-12 col-sm-8 col-md-6">
                <DonateCard />
              </div>
            </div>
          </div>
        </div>
      </Page>
      <Footer />
    </>
  );
};

export default DonateCardPage;
