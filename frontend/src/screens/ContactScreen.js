import { Row, Col, ListGroup } from "react-bootstrap";
import Meta from "../components/Meta";
import FormContainer from "../components/FormContainer";

const ContactScreen = () => {
  return (
    <FormContainer>
      <Meta title='Contact Us' />

      <h3>Contact Us:</h3>
      <ListGroup>
        <ListGroup.Item style={{ paddingTop: "30px" }}>
          <Row>
            <Col md={2}>
              <i className='fas fa-envelope'></i>
            </Col>
            <Col md={10}>
              <p>
                <strong>MarWebTrade Center</strong>
              </p>
              <p>
                <strong>Bahnhofstr.15</strong>
              </p>
              <p>
                {" "}
                <strong>Freiburg 79111</strong>
              </p>
              <p>
                <strong> Deutschland </strong>{" "}
              </p>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item style={{ marginTop: "15px", paddingTop: "30px" }}>
          <Row>
            <Col md={3}>
              <i className='fas fa-phone-square-alt'></i>
            </Col>
            <Col md={9}>
              <strong>+49 931 11-11111</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item style={{ marginTop: "15px", paddingTop: "30px" }}>
          <Row>
            <Col md={3}>
              <i className='fas fa-at'></i>
            </Col>
            <Col md={9}>
              <strong>MarWebTrade_Center@web.de</strong>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
      <h3>Follow Us:</h3>
      <ListGroup>
        <ListGroup.Item style={{ paddingTop: "30px" }}>
          <Row>
            <Col md={1}>
              <a href="'">
                <i className='fab fa-facebook-square'></i>
              </a>
            </Col>
            <Col md={1}>
              <a href="'">
                <i className='fab fa-twitter-square'></i>
              </a>
            </Col>
            <Col md={1}>
              <a href="'">
                <i className='fab fa-github-square'></i>
              </a>
            </Col>
            <Col md={6}>
              <a href="'">
                <i className='fab fa-linkedin'></i>
              </a>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </FormContainer>
  );
};

export default ContactScreen;
