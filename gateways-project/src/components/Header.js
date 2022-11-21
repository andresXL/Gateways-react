import PropTypes from "prop-types";
import logo from "../assets/images/musala-logo.png";
import { Image } from "antd";
import { Col, Row } from "antd";

const Header = ({ title }) => {
  return (
    <header className="Header" style={headerStyle}>
      <Row justify="start" align="middle">
        <Col xs={24} md={5}>
          <Image width={200} src={logo} />
        </Col>
        <Col xs={24} sm={8} md={12}>
          <h1 style={{ color: "blue", marginTop: "0px" }}>Gateways project</h1>
        </Col>
      </Row>
    </header>
  );
};

const headerStyle = {
  paddingLeft: "20px",
};

Header.defaultProps = {
  title: "XD",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
