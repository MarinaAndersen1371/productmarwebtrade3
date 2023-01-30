import { NavLink } from "react-router-dom";
import { Row, Col, ListGroup, NavDropdown } from "react-bootstrap";
import FAQSpanish from "../components/FAQSpanish";
import Meta from "../components/Meta";
import ReactCountryFlag from "react-country-flag";

const InfoSpanishScreen = () => {
  return (
    <>
      <Meta title='Bienvenido a MarWebTradeCenter!' />
      <Row>
        <Col md={9}></Col>
        <Col md={2}>
          <ReactCountryFlag
            countryCode='ES'
            svg
            style={{
              width: "2em",
              height: "2em",
              marginLeft: "50px",
            }}
          />
          <strong className='ml-2 palevioletred'>Español</strong>
        </Col>
        <Col md={1}>
          <NavDropdown id='lang'>
            <NavDropdown.Item as='div'>
              {" "}
              <ReactCountryFlag
                countryCode='DE'
                svg
                style={{
                  width: "2em",
                  height: "2em",
                }}
              />{" "}
              <NavLink to='/infogerman'>
                <span className='ml-2 palevioletred'>Deutsch</span>
              </NavLink>
            </NavDropdown.Item>

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
            <FAQSpanish />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h4>Acerca de nosotros</h4>
              <p>
                Los propietarios de pequeñas empresas pueden participar en esta
                reparación automotriz oportunidad de franquicia comprando un
                taller de reparaciones Midas existente, la construcción de una
                nueva tienda o la conversión de su reparación automotriz actual
                negocios en tiendas Midas. La empresa recomienda personas que
                estén interesado en esta oportunidad de negocio sea ambicioso,
                Orientado a objetivos y con sólidas habilidades personales y de
                liderazgo. La formación inicial incluye orientación en el taller
                y 10 días de formación en el centro de formación de Midas. La
                empresa también ofrece formación continua de la industria
                automotriz en muchas áreas, incluyendo diagnóstico,
                mantenimiento y alineación de ruedas. Una vez que abra su
                Franquicia Midas, la empresa ofrece ayuda continua con
                marketing, gestión empresarial y relación con el cliente.{" "}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <h6>
                CONVIÉRTETE EN UN MIEMBRO DE LA ASOCIACIÓN DE FRANQUICIAS
                INTERNACIONAL
              </h6>
              <p>
                Deutscher Franchiseverband es la organización coordinadora de
                Industria de franquicias de Alemania. Fue fundada en 1978 y es
                con sede en Berlín. Esta comunidad de calidad representa tanto
                franquiciadores y franquiciados. La banda de franquicias
                Deutscher proporciona a sus más de 400 miembros numerosos
                servicios y beneficios. La principal preocupación de la
                asociación es económica, social y representación política de los
                intereses de la industria de las franquicias, que incluye el
                apoyo a los planes de expansión de sus miembros. En 2020 unos
                930 sistemas de franquicia en Alemania, junto con
                aproximadamente 138,748 socios franquiciados y 749,198 empleados
                obtuvo una facturación de alrededor de 135 mil millones de
                euros. Asesoramos a sistemas de franquicias internacionales y
                puede ayudarlo a establecer su sistema de franquicia en
                Alemania.
              </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};
export default InfoSpanishScreen;
