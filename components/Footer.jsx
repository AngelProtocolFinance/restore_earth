import * as React from "react";
import Link from "next/link";

import angelGivingLogo from "public/images/angelgiving-beta-H-logo-wht.svg";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-white shape-parent overflow-hidden py-130">
        <div className="container">
          <hr className="border-white" />

          <div className="row text-center">
            <div className="col-12">
              <div className="small mb-12">
                Donate. Reduce your taxes.{" "}
                <span className="fw-bold">Restore Earth.</span>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <span className="small">Powered by&nbsp;</span>
                <img
                  src={angelGivingLogo.src}
                  alt="Angel Protocol Logo"
                  width={120}
                  height={56}
                />
              </div>
            </div>
            <div className="col-12 pt-rem-8">
              <Link href="/privacy">
                <a target="_blank" className="text-white link">
                  <span className="font-xs">Privacy Policy</span>
                </a>
              </Link>
            </div>
            <div className="col-12 pt-rem-2">
              <Link href="mailto:support@angelprotocol.io&subject=RestoreEarth">
                <a className="text-white link">
                  <span className="font-xs">support@angelgiving.io</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
