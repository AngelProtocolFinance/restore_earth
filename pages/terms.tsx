import { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Header from "components/Header";
import Footer from "components/Footer";

import Page from "../components/Page";

const Terms = () => {
  return (
    <>
      <h1>Terms</h1>
      <p>
        Welcome to the Restore Earth fundraising platform (the “Platform”),
        powered by Angel Protocol Foundation (“Angel Protocol,” “we,” “us,” or
        “our”). Angel Protocol connects donors (“Donors”, “you” or “your”) with
        charities through our platform and enables donors with a tool to donate
        cryptocurrencies to qualified participating nonprofit organizations
        (“Participating Organizations”) whose missions advance the important
        fight against climate change. The Platform allows holders of certain
        digital assets to donate their assets to Participating Organizations’
        smart contracts on the Terra blockchain. The Platform allows Donors to
        contribute these assets to yield-accruing endowment accounts held by
        Participating Organizations. These Terms of Use (the “Terms” or
        “Agreement”) are a binding contract between you and Angel Protocol and
        explains our commitments to you and our requirements of you as a Donor.
        Please read this Agreement carefully.
      </p>
      <p>
        By using our Platform, you acknowledge and represent that you (i) agree
        that these Terms are supported by reasonable, valuable and sufficient
        consideration, (ii) acknowledge the receipt of such consideration, and
        (iii) state that you have read and understand, and agree to be bound by
        these Terms. If you do not agree to these Terms you are not permitted to
        use the Platform. You further represent that your access and use of the
        Platform will fully comply with all applicable laws and regulations, and
        that you will not access or use the Platform to conduct, execute,
        promote, or otherwise engage in any prohibited activity as described in
        Section 4.
      </p>
      <p>
        The headings and subheadings are for reference only and do not limit the
        terms or application of the applicable section. Your trust is very
        important to us. If you have questions about this Agreement, please
        contact contact@altruisticpartners.org.
      </p>
      <h3 className="h5">1. Our Relationship with You</h3>
      <p>
        <ul>
          <li>
            a. We register qualified Participating Organizations and provide
            information about them to users of our Platform that are interested
            in making donations. We take steps to confirm that each
            Participating Organization is registered as a public charity under
            Section 501(c)(3) of the Internal Revenue Code. However, each Donor
            must make their own determination that a Participating Organization
            is suitable to make a donation. Angel Protocol is not and will not
            be responsible for ensuring that the information provided by
            Participating Organizations is accurate or up to date. We do not and
            cannot control the actions of any Participating Organization or
            Donor.
          </li>
          <li>
            b. Through the Platform, we equip Participating Organizations with a
            tool that allows for the processing and conversion of donations of
            cryptocurrencies made from Donors to the Participating
            Organization(s) selected by the Donor. We also facilitate the
            issuance of tax receipts to Donors for each donation they make to
            allow Donors to deduct their donations as permitted by applicable
            tax law.
          </li>
          <li>
            c. Angel Protocol does not offer or accept any donations. You hereby
            acknowledge that (i) Angel Protocol does not supervise, direct,
            control, or monitor the donations and (ii) Angel Protocol expressly
            disclaim any responsibility and liability for any donation made
            through the Platform, including but not limited to any warranty or
            condition of quality or fitness for a particular purpose, or
            compliance with any law, regulation, or code. Angel Protocol is only
            responsible for connecting Donors and Participating Organizations
            and is not, and will not, be responsible for the use of any
            donations
          </li>
        </ul>
      </p>
      <h3 className="h5">2. Privacy</h3>
      <p>
        Your personally identifiable information (“PII”), including your name,
        email address and physical address will be handled in accordance with
        our Privacy Policy, and unless you have elected to donate anonymously,
        may be shared with the Participating Organizations. We use commercially
        reasonable safeguards to preserve the integrity and security of your
        PII. However, we cannot guarantee that unauthorized third parties will
        never be able to obtain or use your PII or aggregate data for improper
        purposes. You acknowledge that you provide your PII and aggregate data
        at your own risk. By accessing and using the Platform, you understand
        and consent to our collection, use, and disclosure of your PII and
        aggregate data.
      </p>
      <h3 className="h5">3. Fees</h3>
      <p>
        We do not charge you a fee for using the Platform, however when making a
        donation to Participating Organization(s) you may incur processing
        and/or transaction fees.
      </p>
      <h3 className="h5">4. Prohibited Activity</h3>
      <p>
        You agree not to engage in, or attempt to engage in, any of the
        following categories of prohibited activity in relation to your access
        and use of the Platform,
        <ul>
          <li>
            a. Intellectual Property Infringement. Activity that infringes on or
            violates any copyright, trademark, service mark, patent, right of
            publicity, right of privacy, or other proprietary or intellectual
            property rights under the law.
          </li>
          <li>
            b. Cyberattack. Activity that seeks to interfere with or compromise
            the integrity, security, or proper functioning of any computer,
            server, network, personal device, or other information technology
            system, including (but not limited to) the deployment of viruses and
            denial of service attacks.
          </li>
          <li>
            c. Fraud and Misrepresentation. Activity that seeks to defraud us or
            any other person or entity, including (but not limited to) providing
            any false, inaccurate, or misleading information in order to
            unlawfully obtain the property of another.
          </li>
          <li>
            d. Money Laundering. Activity that violates any applicable law,
            rule, or regulation concerning the laundering of money. You
            understand and acknowledges that Angel Protocol is, or may in the
            future become, subject to money laundering statutes, regulations and
            conventions of the United States or other international
            jurisdictions, and you agree to execute instruments, provide
            information, or perform any other acts as may reasonably be
            requested by Angel Protocol for the purpose of carrying out due
            diligence as may be required by Applicable Law. You agree that you
            will provide Angel Protocol with such information as we reasonably
            require to comply with applicable anti-money laundering laws or
            regulations. You understand, acknowledge and agree that to the
            extent permitted by Applicable Law, Angel Protocol may provide
            information, including confidential information, to the Financial
            Crimes Enforcement Network, a bureau of the U.S. Department of the
            Treasury, or any other agency or instrumentality of the U.S.
            Government, or as otherwise required by Applicable Law, in
            connection with a request for information on behalf of a U.S.
            federal law enforcement agency investigating terrorist activity or
            money laundering.
          </li>
          <li>
            e. Any Other Unlawful Conduct. Activity that violates any applicable
            law, rule, or regulation of the United States or another relevant
            jurisdiction, including (but not limited to) the restrictions and
            regulatory requirements imposed by U.S. law.
          </li>
        </ul>
      </p>
      <h3 className="h5">5. Indemnity, Warranties and Disclaimers. </h3>
      <p>
        <ul>
          <li>
            a. You agree to indemnify, hold harmless, and, defend Angel Protocol
            and its affiliates and each of its and their officers, directors,
            employees, licensees, agents and vendors from and against all
            claims, costs, losses, damages, expenses (including attorneys’ fees
            and court costs) and liabilities arising from (i) your use of, or
            activities in connection with the Platform; or (ii) your violations
            of these Terms. Angel Protocol reserves the right to assume the
            exclusive defense and control of any matter otherwise subject to
            indemnification by you and, in such case, you agree to cooperate
            with Angel Protocol’ defense of such claim.
          </li>
          <li>
            b. WE MAKE AVAILABLE THE PLATFORM FOR CHARITABLE PURPOSES, AND NOT
            FOR COMMERCIAL, FOR-PROFIT PURPOSES. YOU ACKNOWLEDGE THAT THE
            PLATFORM AND OUR PERFORMANCE HEREUNDER ARE PROVIDED ON AN “AS IS”
            BASIS, AND WE DISCLAIM ALL REPRESENTATIONS AND WARRANTIES UNDER THIS
            AGREEMENT, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING, WITHOUT
            LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT, DATA
            ACCURACY OR SYSTEM INTEGRATION. NO WARRANTY IS MADE BY US ON THE
            BASIS OF TRADE USAGE, COURSE OF DEALING, OR COURSE OF PERFORMANCE.
            YOU ACKNOWLEDGE THAT WE MAKE NO REPRESENTATIONS OR WARRANTIES
            REGARDING THE PERFORMANCE, EFFICIENCY OR AVAILABILITY (INCLUDING
            “UPTIME”) OF THE PLATFORM. NO REPRESENTATION OR WARRANTY IS MADE
            THAT OPERATION OF THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE,
            OR THAT THE PLATFORM WILL OPERATE AS EXPECTED OR WILL MEET YOUR
            PARTICULAR NEEDS OR PURPOSES. YOU ACKNOWLEDGE THAT WE MAKE NO
            REPRESENTATIONS OR WARRANTIES REGARDING ANY LEGAL REQUIREMENTS TO
            WHICH YOU MAY BE SUBJECT; NOR DO WE MAKE ANY REPRESENTATIONS OR
            WARRANTIES REGARDING THE APPLICABILITY OF TAX LAWS TO ANY DONOR,
            SUCH AS, BY WAY OF EXAMPLE, ANY DONOR’S ABILITY TO OBTAIN TAX
            DEDUCTIONS OR OTHER TAX BENEFITS IN CONNECTION WITH DONATIONS MADE
            THROUGH THE PLATFORM FOR CHARITY.
          </li>
          <li>
            c. IN NO EVENT SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS,
            EMPLOYEES, CONTRACTORS OR AFFILIATES BE LIABLE TO YOU FOR ANY
            INCIDENTAL, INDIRECT, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES,
            REGARDLESS OF THE NATURE OF THE CLAIM, INCLUDING, WITHOUT
            LIMITATION, LOST REVENUES, COSTS OF DELAY, ANY FAILURE OF DELIVERY,
            BUSINESS INTERRUPTION, COSTS OF LOST OR DAMAGED DATA OR
            DOCUMENTATION OR LIABILITIES TO THIRD PARTIES ARISING FROM ANY
            SOURCE, NOR WILL WE BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY
            RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR
            USE OF THE PLATFORM OR THE INFORMATION CONTAINED WITHIN IT. EVEN IF
            WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
            CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING
            TO THIS AGREEMENT, INCLUDING, WITHOUT LIMITATION, ANY CAUSE OF
            ACTION SOUNDING IN CONTRACT, TORT OR STRICT LIABILITY, SHALL NOT
            EXCEED THE AMOUNT YOU PAID TO US TO USE THE PLATFORM, OR $100,
            WHICHEVER IS GREATER. THE FOREGOING LIMITATIONS AND EXCLUSIONS OF
            LIABILITY ARE INTENDED TO APPLY WITHOUT REGARD TO WHETHER OTHER
            PROVISIONS OF THIS AGREEMENT HAVE BEEN BREACHED OR HAVE PROVEN
            INEFFECTIVE. YOU ACKNOWLEDGE THAT THE PROVISIONS OF THIS PARAGRAPH
            AND THE PRECEDING PARAGRAPH FORM AN ESSENTIAL BASIS OF THE
            ARRANGEMENT BETWEEN YOU AND US, AND ABSENT THE DISCLAIMERS,
            LIMITATIONS AND EXCLUSIONS OF OUR LIABILITY SET FORTH ABOVE, THE
            TERMS OF THIS AGREEMENT WOULD BE SUBSTANTIALLY DIFFERENT.
          </li>
        </ul>
      </p>
      <h3 className="h5">6. No Professional Advice</h3>
      <p>
        All information provided by the Platform is for informational purposes
        only and should not be construed as professional advice. You should not
        take, or refrain from taking, any action based on any information
        contained on the Platform. Before you make any financial, legal, or
        other decisions involving the Platform, including whether to use the
        Platform, you should seek independent professional advice from an
        individual who is licensed and qualified in the area for which such
        advice would be appropriate. We do not offer any tax or legal advice.
        Please consider working with a CPA or attorney to address any questions
        you may have concerning the impact of using the Platform to make
        donations.
      </p>
      <h3 className="h5">7. Assumption of Risk</h3>
      <p>
        By accessing and using the Platform you represent and warrant that you
        understand the inherent risks associated with using cryptographic and
        blockchain based systems, and that you have a working knowledge of the
        usage and intricacies of digital assets such as bitcoin (BTC), ether
        (ETH), luna (LUNA), Terra stablecoin (UST) and other digital tokens such
        as those following the Ethereum Standard Token (ERC-20). You further
        understand that the markets for these digital assets are highly volatile
        due to factors, including but not limited to, adoption, speculation,
        technology, security, and regulation. You acknowledge that the cost and
        speed of transacting with cryptographic and blockchain based systems
        such as Ethereum and LUNA are variable and may increase dramatically
        over time. You further acknowledge that we are not responsible for any
        of these variables or risks, do not own or control these blockchain
        based systems, and cannot be held liable for any resulting losses that
        you experience while accessing or using the Platform. Accordingly you
        understand and agree to assume full responsibility for all of the risks
        of accessing and using the Platform.
      </p>
      <h3 className="h5">8. Miscellaneous Terms and Conditions</h3>
      <p>
        <ul>
          <li>
            a. Should any provision of this Agreement be held by a court or
            other tribunal of competent jurisdiction to be void, illegal,
            invalid, inoperative, or unenforceable, the remaining provisions of
            this Agreement shall not be affected and shall continue in effect,
            and the invalid provision shall be deemed modified to the least
            degree necessary to remedy such invalidity.
          </li>
          <li>
            b. Our failure to partially or fully exercise any right will not be
            considered a waiver of that right unless we so state in writing to
            you. The waiver of any breach, shall not prevent a subsequent
            exercise of such right or be deemed a waiver of any subsequent
            breach of the same or any other term of this Agreement. Any remedies
            made available to us by the terms of this Agreement are cumulative
            and are without prejudice to any other remedies that may be
            available to us in law or equity.
          </li>
          <li>
            c. Any dispute between you and Angel Protocol which cannot be
            resolved by negotiation shall be submitted to mediation, and if
            mediation fails, arbitration, under the rules of the American
            Arbitration Association, or any comparable entity that you and we
            may subsequently agree upon in writing. Any arbitration award issued
            by the arbitrator shall be final, binding, and enforceable in any
            court of competent jurisdiction. Notwithstanding the foregoing, you
            acknowledge that unauthorized use of our proprietary materials,
            information or technology may cause irreparable harm to Angel
            Protocol for which monetary damages would be an inadequate remedy.
            Accordingly, we have the right, without the necessity of posting
            bond, to seek injunctive or other equitable relief from any court of
            competent jurisdiction to protect our rights in intellectual
            property or confidential information.
          </li>
          <li>
            d. This Agreement shall be governed and interpreted in accordance
            with the laws of Delaware without regard to its principles of
            conflict of laws. Venue for mediation, arbitration, or litigation of
            any dispute, controversy, or claim arising out of, in connection
            with, or in relation to this Agreement, or the breach thereof, shall
            be proper only within a mediation or arbitration process or in a
            tribunal of competent jurisdiction within Delaware.
          </li>
        </ul>
      </p>
    </>
  );
};

const TermsPage: NextPage = () => {
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
                <Terms />
              </div>
            </div>
          </div>
        </div>
      </Page>
      <Footer />
    </>
  );
};

export default TermsPage;
