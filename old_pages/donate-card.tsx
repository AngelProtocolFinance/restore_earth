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
      <h3>Donate with your credit card</h3>
      <p>
        Want to support the campaign but don&apos;t have any of the accepted
        cryptocurrencies? Here&apos;s how to donate with a credit card.
      </p>
      <p className="small">
        Note: We highly suggest donating the available cryptocurrencies if you
        are able to, as the Transak process can take longer to complete.
      </p>
      <p className="small">
        Additionally, we cannot provide instant tax receipts for donations made
        via credit card.
      </p>
      <p>
        <ol style={{ marginLeft: "-2.5rem" }}>
          <li className="my-rem-4 pl-rem-2">
            <Link href="https://beta.transak.com">
              <a className="link" target="_blank">
                Visit Transak
              </a>
            </Link>
          </li>
          <li className="my-rem-4  pl-rem-2">
            Enter your donation amount, and click &quot;Buy Now&quot;
          </li>
          <li className="my-rem-4  pl-rem-2">
            Add receiptient wallet:{" "}
            <strong>
              <span className="monospace">{ETH_WALLET_ADDRESS}</span>
            </strong>{" "}
            - the official ETH Wallet Address for the Restore Earth campaign.
          </li>
          <li className="my-rem-4  pl-rem-2">
            Continue through the Transak flow. They may require KYC elements,
            including proof of identity and proof of address depending on your
            location.
          </li>
          <li className="my-rem-4  pl-rem-2">
            Once the transaction is complete, ETH will be deposited into the
            Restore Earth account. You will not receive a donation confirmation
            from Transak, however the amount may be treated as a charitable
            donation made to each of our three partner charities.
          </li>
        </ol>
      </p>
      <p className="my-rem-4">
        We recommend contacting a tax professional before using a credit card if
        you intend to report your donation to receive a tax deduction.
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
