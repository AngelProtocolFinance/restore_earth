import * as React from "react";
import Image from "next/image";

import angelProtocolLogo from "public/images/angel-protocol.png";

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
                <span className="small">Powered by</span>
                <Image
                  src={angelProtocolLogo}
                  alt="Angel Protocol Logo"
                  width={120}
                  height={56}
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
