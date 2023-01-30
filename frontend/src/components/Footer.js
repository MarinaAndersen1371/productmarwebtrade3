import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <span className='footerLarge'>
            <Row>
              <Col md={5}>
                <Row>
                  <Col md={1}>
                    <a href="'">
                      <i className='fab fa-facebook-square lavender'></i>
                    </a>
                  </Col>
                  <Col md={1}>
                    <a href="'">
                      <i className='fab fa-twitter-square lavender'></i>
                    </a>
                  </Col>
                  <Col md={1}>
                    <a href="'">
                      <i className='fab fa-github-square lavender'></i>
                    </a>
                  </Col>
                  <Col md={6}>
                    <a href="'">
                      <i className='fab fa-linkedin lavender'></i>
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col md={3}></Col>
              <Col md={4}>Copyright &copy; 2021 Marina Andersen</Col>
            </Row>
          </span>
          <span className='footerSmall'>
            <div>
              <a href="'">
                <i className='fab fa-facebook-square lavender mr-3'></i>
              </a>
              <a href="'">
                <i className='fab fa-twitter-square lavender mr-3'></i>
              </a>
              <a href="'">
                <i className='fab fa-github-square lavender mr-3'></i>
              </a>
              <a href="'">
                <i className='fab fa-linkedin lavender'></i>
              </a>
            </div>
            <div>
              <p>Copyright &copy; 2021 Marina Andersen</p>
            </div>
          </span>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
