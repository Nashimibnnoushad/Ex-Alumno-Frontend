import React from "react"
import { Row, Col } from "reactstrap"
import WelcomeCard from "./welcomeconfig"
import Events from "./upcomingevent"
import Greetings from "../analytics/SalesCard"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import "swiper/css/swiper.css"
import "../../../assets/scss/plugins/extensions/swiper.scss"
class AlumniDashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Greetings />
          </Col>
          <Col sm="12">
            <Events />
          </Col>
          <Col sm="12">
            <WelcomeCard />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AlumniDashboard
