import { NavLink } from "react-router-dom";
import { Row, Col, ListGroup, NavDropdown } from "react-bootstrap";
import FAQ from "../components/FAQ";
import Meta from "../components/Meta";
import ReactCountryFlag from "react-country-flag";

const InfoScreen = () => {
  return (
    <>
      <Meta />
      <Row>
        <Col md={9}></Col>
        <Col md={2}>
          <ReactCountryFlag
            countryCode='US'
            svg
            style={{
              width: "2em",
              height: "2em",
              marginLeft: "50px",
            }}
          />
          <strong className='ml-2 palevioletred'>English</strong>
        </Col>
        <Col md={1}>
          <NavDropdown id='lang'>
            <NavDropdown.Item as='div'>
              <ReactCountryFlag
                countryCode='DE'
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
              />
              <NavLink to='/infogerman'>
                <span className='ml-2 palevioletred'>Deutsch</span>
              </NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item as='div'>
              {" "}
              <ReactCountryFlag
                countryCode='ES'
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
              />{" "}
              <NavLink to='/infospanish'>
                <span className='ml-2 palevioletred'>Español</span>
              </NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item as='div'>
              {" "}
              <ReactCountryFlag
                countryCode='RU'
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
              />{" "}
              <NavLink to='/inforussian'>
                <span className='ml-2 palevioletred'>Русский</span>
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Col>
      </Row>
      <ListGroup className='my-5'>
        <Row>
          <Col md={6}>
            <FAQ />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h4>About Us</h4>
              <p>
                {" "}
                Small-business owners can participate in this automotive repair
                franchise opportunity by purchasing an exiting Midas repair
                shop, building a new shop or converting their current automotive
                repair businesses into Midas shops. The company recommends
                people who are interested in this business opportunity be
                ambitious, goal-oriented and have strong personal and leadership
                skills. Initial training includes in-shop orientation and 10
                days of training at the Midas training center. The company also
                offers ongoing automotive industry training in many areas,
                including diagnostics, maintenance and wheel alignment. Once you
                open your Midas franchise, the company offers ongoing help with
                marketing, business management and customer relations.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <h6>
                BECOME A MEMBER OF THE FRANCHISE ASSOCIATION AS AN INTERNATIONAL
                FRANCHISE SYSTEM
              </h6>
              <p>
                The Deutscher Franchiseverband is the umbrella organisation for
                Germany’s franchise industry. It was founded in 1978 and is
                based in Berlin. This quality community represents both
                franchisers and franchisees. The Deutscher Franchiseverband
                provides its more than 400 members with numerous services and
                benefits. The association’s core concern is economic, social and
                political representation of the franchise industry’s interests,
                which includes supporting its members’ expansion plans. In 2020
                some 930 franchise systems in Germany, together with
                approximately 138,748 franchise partners and 749,198 employees
                earned turnover of around 135 billion euros. We give advice to
                international franchise systems and can help you to establish
                your franchise system in Germany. You can join us as an
                International Associate Member and we will advertise your
                company in our System Finder in the Franchisors from Abroad
                section.{" "}
              </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default InfoScreen;
