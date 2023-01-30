import { Row, Col, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";

const FranchiseInfoScreen = () => {
  return (
    <Row className='py-5'>
      <Col md={4}>
        <ListGroup>
          <Meta title='Franchise Association' />
          <ListGroup.Item style={{ paddingTop: "30px" }}>
            <h5>Info</h5>
            Small-business owners can participate in this automotive repair
            franchise opportunity by purchasing an exiting Midas repair shop,
            building a new shop or converting their current automotive repair
            businesses into Midas shops. The company recommends people who are
            interested in this business opportunity be ambitious, goal-oriented
            and have strong personal and leadership skills. Initial training
            includes in-shop orientation and 10 days of training at the Midas
            training center. The company also offers ongoing automotive industry
            training in many areas, including diagnostics, maintenance and wheel
            alignment. Once you open your Midas franchise, the company offers
            ongoing help with marketing, business management and customer
            relations. Many industries have companies using the franchise model,
            including food, lodging and business services. Contact franchisors
            for their franchise disclosure documents, which discuss the
            franchise opportunities.
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={8}>
        <ListGroup>
          <ListGroup.Item style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <h4>About Us</h4>
            Franchises offer the opportunity to own a small business without
            reinventing the wheel. Small-business owners pay companies for the
            rights to use their trademarks, services and products in return for
            support and company guidelines on how to run their particular
            businesses. Many industries have companies using the franchise
            model, including food, lodging and business services. Contact
            franchisors for their franchise disclosure documents, which discuss
            the franchise opportunities and requirements in detail.
          </ListGroup.Item>
          <ListGroup.Item style={{ marginTop: "17px", paddingTop: "30px" }}>
            <h6 style={{ paddingBottom: "30px" }}>
              BECOME A MEMBER OF THE FRANCHISE ASSOCIATION AS AN INTERNATIONAL
              FRANCHISE SYSTEM
            </h6>
            <p>
              The Deutscher Franchiseverband is the umbrella organisation for
              Germany’s franchise industry. It was founded in 1978 and is based
              in Berlin. This quality community represents both franchisers and
              franchisees. The Deutscher Franchiseverband provides its more than
              400 members with numerous services and benefits. The association’s
              core concern is economic, social and political representation of
              the franchise industry’s interests, which includes supporting its
              members’ expansion plans. In 2020 some 930 franchise systems in
              Germany, together with approximately 138,748 franchise partners
              and 749,198 employees earned turnover of around 135 billion euros.
              We give advice to international franchise systems and can help you
              to establish your franchise system in Germany. You can join us as
              an International Associate Member and we will advertise your
              company in our System Finder in the Franchisors from Abroad
              section.{" "}
            </p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default FranchiseInfoScreen;
