import * as React from "react";
import Scrollspy from "react-scrollspy";
import Link from "next/link";

import angelProtocolLogo from "public/images/angel-protocol.png";
import terraLogo from "public/images/chains/terra.png";
import {topCharityAlliance} from "../scripts/constants"

const Header = ({}) => {
  return (
    <>
      <Scrollspy
        items={["trigger"]}
        currentClassName="transparent"
        componentTag="div"
        offset={10}
      >
        <header className="navbar navbar-top navbar-expand navbar-fixed fixed-top navbar-dark">
          <nav className="container justify-content-between">
            <Link href="/">
              <a className="navbar-brand text-white">
                <img
                  className="pe-12 me-10 border-end border-white"
                  width="50"
                  height="35"
                  src={terraLogo.src}
                  alt=""
                />
                <img
                  width="100"
                  height="47"
                  src={angelProtocolLogo.src}
                  alt=""
                />
              </a>
            </Link>
            <div className="justify-content-center align-items-center d-flex flex-row">
              <div className="d-none d-sm-flex">
                <span className="badge rounded-pill bg-light text-dark">Top Donor: {topCharityAlliance}</span>
              </div>
              <ul className="nav m-0 text-white">
                <li className="nav-item navbar-dropdown">
                  <Link href="/donate">
                    <a target="_blank" className="nav-link">
                      <span className="nav-link-name">Donate now</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </Scrollspy>
    </>
  );
};

export default Header;
