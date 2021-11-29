import Image from "next/image";
import Link from "next/link";

import { NFTDataType } from "./Data/NFTData";
import { KYCDataType } from "./Data/KYCData";

import TwitterLogo from "public/images/logos/twitter-white.svg";

interface ThankYouProps {
  NFTData: NFTDataType;
  KYCData: KYCDataType;
}

const ThankYou = ({ NFTData, KYCData }: ThankYouProps) => {
  return (
    <section>
      <h2 className="h3">Donation successful!</h2>
      <p>
        Thanks for donating through Angel Protocol this holiday season. Funds
        will be deposited into permanent, yield-bearing crypto endowments for
        our partner nonprofits helping to Restore Earth: 5 Gyres, S.E.L.F, and
        Global Brigades.
      </p>
      {NFTData.nftRequested && (
        <p>
          When your Galactic Angel NFT is ready in the new year, we&apos;ll
          airdrop it to the Terra address you supplied:{" "}
          <span className="font-monospace">{NFTData.address}</span>.
        </p>
      )}
      {KYCData.receiptRequested && (
        <p>
          Additionally, emailed tax receipts for each of our 3 partners should
          arrive in your <span className="font-monospace">{KYCData.email}</span>{" "}
          inbox within the next hour.
        </p>
      )}

      <p>
        Want to help grow those endowments even larger and heal our planet?
        Tweet your support and tell your friends in Discord!
      </p>

      <div className="mb-rem-12">
        <Link href="https://twitter.com/intent/tweet?text=Donating%20gains%20this%20year%3F%20I%20gave%20to%20the%20%23restoreearth%20campaign%20%2B%20Angel%20Protocol%2C%20which%20creates%20permanent%2C%20yield-generating%20crypto%20endowments%20for%20nonprofits%20working%20to%20heal%20our%20planet.%20Oh%2C%20and%20you%20can%20get%20a%20Galactic%20Angel%20NFT.%20And%20tax%20receipts%20%F0%9F%A4%AF.%20%0A%0ALink%3A%20https%3A%2F%2Fwww.restoreearth.io">
          <a className="btn btn-twitter-blue" target="_black">
            <img
              src={TwitterLogo.src}
              width="18"
              height="18"
              alt="Twitter logo"
            />
            Share
          </a>
        </Link>
      </div>

      <p>Happy Holidays from the Angel Protocol team 🌔🌎</p>
    </section>
  );
};

export default ThankYou;
