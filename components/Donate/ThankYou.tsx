import { NFTDataType } from "./Data/NFTData";

const ThankYou = ({ NFTData, KYCData }) => {
  let message = "Thank you for helping Restore Earth! ";
  if (KYCData.receiptRequested) {
    message += "You should receive your email receipt within the next hour. ";
  }
  if (NFTData.nftRequested) {
    message +=
      "When our NFT drop is ready in the new year, we'll send it to the supplied Terra address. ";
  }
  message += "Happy Holidays 🌎";

  return (
    <section>
      <h2 className="h3">Thank you!</h2>
      <p>{message}</p>
    </section>
  );
};

export default ThankYou;
