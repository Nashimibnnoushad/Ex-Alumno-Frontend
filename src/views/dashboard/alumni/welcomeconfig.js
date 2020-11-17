import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Swiper from "react-id-swiper"
import img1 from "../../../assets/img/alumni/1.jpeg"
import img2 from "../../../assets/img/alumni/2.jpg"
import img3 from "../../../assets/img/alumni/3.jpg"
import img4 from "../../../assets/img/alumni/4.jpg"
import img5 from "../../../assets/img/alumni/5.jpg"

const params = {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
}

class WelcomConfig extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <Swiper {...params}>
            <div>
              <img src={img1} alt="swiper 1" className="img-fluid" />
            </div>
            <div>
              <img src={img2} alt="swiper 2" className="img-fluid" />
            </div>
            <div>
              <img src={img3} alt="swiper 3" className="img-fluid" />
            </div>
            <div>
              <img src={img4} alt="swiper 4" className="img-fluid" />
            </div>
            <div>
              <img src={img5} alt="swiper 5" className="img-fluid" />
            </div>
          </Swiper>
        </CardBody>
      </Card>
    )
  }
}
export default WelcomConfig