import { NavLink } from "react-router-dom";
import { Row, Col, ListGroup, NavDropdown } from "react-bootstrap";
import FAQRussian from "../components/FAQRussian";
import Meta from "../components/Meta";
import ReactCountryFlag from "react-country-flag";

const InfoRussianScreen = () => {
  return (
    <>
      <Meta title='Добро пожаловать на сайт MarwWebTradeCenter!' />
      <Row>
        <Col md={9}></Col>
        <Col md={2}>
          <ReactCountryFlag
            countryCode='RU'
            svg
            style={{
              width: "2em",
              height: "2em",
              marginLeft: "44px",
            }}
          />
          <strong className='ml-2 palevioletred'>Русский</strong>
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
              />
              <NavLink to='/infogerman'>
                <span className='ml-2 palevioletred'>Deutsch</span>{" "}
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
              <NavLink to='/info' className='ml-2 palevioletred'>
                English
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
                <span className='ml-2 palevioletred'>Español</span>{" "}
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Col>
      </Row>
      <ListGroup className='my-5'>
        <Row>
          <Col md={6}>
            <FAQRussian />
          </Col>
          <Col md={6}>
            <ListGroup.Item>
              <h4>О нас</h4>
              <p>
                {" "}
                Владельцы малого бизнеса могут иметь возможность получения
                франшизы при покупке товаров, строительство нового магазина или
                преобразование существующей ремонт предприятий в магазины.
                Компания рекомендует людям, которые заинтересованы в этой
                возможности для бизнеса, амбициозны, целеустремленны и обладают
                сильным личным и лидерским потенциалом, навыками и умениями.
                Начальное обучение включает ориентацию в магазине и 10 дни
                обучения в учебном центре. Компания также предлагает постоянное
                обучение во многих областях, включая диагностику, обслуживание и
                регулировку углов установки колес. Однажды ты откройте свою
                франшизу, компания предлагает постоянную помощь с маркетинг,
                управление бизнесом и отношения с клиентами.
              </p>
            </ListGroup.Item>
            <ListGroup.Item className='my-3'>
              <h6>СТАТЬ ЧЛЕНОМ МЕЖДУНАРОДНОЙ АССОЦИАЦИИ ФРАНШИЗЫ</h6>
              <p>
                Oрганизация была основана в 1978 году и базируется в Берлине.
                Это качественное сообщество представляет как франчайзеры и
                франчайзи. Группа предоставляет своим более чем 400 членам
                многочисленные услуги и преимущества. Основная забота ассоциации
                - экономическая, социальная и политическое представление
                интересов индустрии франчайзинга, что включает в себя поддержку
                планов расширения своих членов. В 2020 году около 930
                франчайзинговых систем в Германии, вместе с примерно 138 748
                франчайзинговых партнеров и 749 198 сотрудников оборот около 135
                миллиардов евро. Даем советы международных франчайзинговых
                систем и можем помочь вам установить вашу франчайзинговую
                систему в Германии. Вы можете присоединиться к нам как
                Международный ассоциированный член, и мы будем рекламировать
                вашу компанию в нашем Системном поиске франчайзеров из-за
                рубежа.
              </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </>
  );
};

export default InfoRussianScreen;
