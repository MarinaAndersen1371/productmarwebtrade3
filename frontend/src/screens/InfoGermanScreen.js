import { NavLink } from "react-router-dom";
import { Row, Col, ListGroup, NavDropdown } from "react-bootstrap";
import FAQGerman from "../components/FAQGerman";
import Meta from "../components/Meta";
import ReactCountryFlag from "react-country-flag";

const InfoGermanScreen = () => {
  return (
    <>
      <Meta title='Herzlich Willkommen bei MarWebTradeCenter!' />
      <Row>
        <Col md={9}></Col>
        <Col md={2}>
          <ReactCountryFlag
            countryCode='DE'
            svg
            style={{
              width: "2em",
              height: "2em",
              marginLeft: "50px",
            }}
          />
          <strong className='ml-2 palevioletred'>Deutsch</strong>
        </Col>
        <Col md={1}>
          <NavDropdown id='lang'>
            <NavDropdown.Item as='div'>
              {" "}
              <ReactCountryFlag
                countryCode='US'
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
              />{" "}
              <NavLink to='/info'>
                <span className='ml-2 palevioletred'>English</span>
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
              />
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
              </NavLink>{" "}
            </NavDropdown.Item>
          </NavDropdown>
        </Col>
      </Row>

      <ListGroup className='my-5'>
        <Row>
          <Col md={6}>
            <FAQGerman />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h4 className='py-3'>Über uns</h4>
              <p>
                Im Rahmen des Franchisevertrages räumt der Franchise-Gebende dem
                Franchise-Nehmenden gegen Gebühr bestimmte Rechte ein, die ihm
                die Nutzung eines erprobten Geschäftskonzeptes für den Vertrieb
                von Waren und Dienstleistungen gemäß einheitlicher Standards
                erlauben. Während der Franchise-Gebende sein Geschäftskonzept
                mit identifizierten Erfolgsfaktoren in Pilotbetrieben oder
                mitunter im eigenen Filialnetz kontinuierlich weiterentwickelt,
                erprobt und standardisiert, wird es mit seiner Hilfe von
                selbstständigen Systempartnern multipliziert und vor Ort
                umgesetzt. Aus der Arbeitsteilung in einem Franchisesystem
                ergeben sich vielfältige Synergien, die insbesondere der
                Optimierung von Schlagkraft, Marktabdeckung und Kundenbindung
                dienen. Weitere unternehmerische Kooperationsformen, die nicht
                mit Franchisekonzepten verwechselt werden sollten, sind
                Verbundgruppen, Strukturvertriebe und Joint Ventures.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='my-2'>
              <h6>MITGLIED WERDEN</h6>
              <p>
                Der Deutsche Franchiseverband ist der Dachverband für
                Deutschlands Franchise-Branche. Es wurde 1978 gegründet und ist
                mit Sitz in Berlin. Diese Qualitätsgemeinschaft repräsentiert
                beides Franchisegeber und Franchisenehmer. Der Deutsche
                Franchiseverband bietet seinen über 400 Mitgliedern zahlreiche
                Dienstleistungen und Leistungen. Kernanliegen des Vereins sind
                wirtschaftliche, soziale und politische Vertretung der
                Interessen der Franchise-Branche, Dazu gehört auch die
                Unterstützung der Expansionspläne der Mitglieder. Im Jahr 2020
                rund 930 Franchisesysteme in Deutschland, zusammen mit ca.
                138.748 Franchisepartner und 749.198 Mitarbeiter einen Umsatz
                von rund 135 Milliarden Euro erwirtschaftet. Wir beraten Sie
                internationale Franchisesysteme und kann Ihnen beim Aufbau
                helfen Ihr Franchisesystem in Deutschland. Sie können sich uns
                anschließen als Internationales assoziiertes Mitglied und wir
                werben für Ihr Unternehmen in unserem Systemfinder bei den
                Franchisegebern aus dem Ausland Sektion.
              </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default InfoGermanScreen;
