import React from "react"
import { Card, CardHeader, CardTitle, CardBody, CardImg, CardImgOverlay } from "reactstrap"
import Swiper from "react-id-swiper"
import eventimage from "../../../assets/img/alumni/event.jpg"
import axios from "axios"
import "./style.scss"
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

class UpcomingEvents extends React.Component {

    state = {
        eventlist: []
    }

    componentDidMount = () => {
        var user_type = JSON.parse(localStorage.getItem("alumniuser"))
        this.setState({ user_role: user_type.user_role })
        axios
            .get("http://localhost:3000/events")
            .then(response => {
                if (response.data.status === 200 && response.data.data && response.data.data.length !== 0) {
                    var events = []
                    var event_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
                    for (let i = response.data.data.length - 1; i >= 0; i--) {
                        let today = this.formatDate(new Date())
                        let eventdate = this.formatDate(response.data.data[i].date)
                        if (eventdate >= today) {
                            let data = {
                                id: response.data.data[i].id,
                                name: response.data.data[i].name,
                                description: response.data.data[i].description,
                                date: response.data.data[i].date,
                                time: response.data.data[i].time,
                                venue: response.data.data[i].venue,
                                image: null
                            }
                            if (event_images !== null || event_images.length !== 0) {
                                for (let j = 0; j < event_images.length; j++) {
                                    if (response.data.data[i].id === event_images[j].event_id) {
                                        data.image = event_images[j].image_url
                                    }
                                }
                            }
                            events.push(data)
                        }
                    }
                    this.setState({ eventlist: events })
                }
            })
            .catch(err =>
                console.log(err),
            )
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        var date = [day, month, year].join('-');
        return date
    }

    FormatTime(time) {
        var d = new Date(time),
            hours = '' + (d.getHours()),
            minutes = '' + d.getMinutes(),
            seconds = d.getSeconds();


        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;


        return [hours, minutes].join(':');
    }
    FormatTimeTo12(a) {
        return (new Date("1955-11-05T" + a + "Z")).toLocaleTimeString("bestfit", {
            timeZone: "UTC",
            hour12: !0,
            hour: "numeric",
            minute: "numeric"
        });
    };

    render() {
        let {
            eventlist
        } = this.state
        return (
            <>
                {eventlist && eventlist.length > 0 &&
            <Card className="text-white overlay-img-card">
            <div className="ribbon-wrapper"><div className="glow">&nbsp;</div>
		    <div className="ribbon-front">
                                Upcoming Events
                </div>
            </div>
            <CardBody>
            <Swiper {...params}>
            {eventlist.map((event, index) => {
                return (
                <div key={index}>
                {event.image ? 
                <CardImg src={`data:image/png;base64,${event.image}`} alt={`swiper ${index+1}`} className="img-fluid" style={{width:"300px",height:"300px"}} />
                        :
                <CardImg src={eventimage} alt={`swiper ${index+1}`} className="img-fluid" style={{width:"300px",height:"300px"}}/>                  
                }
                <CardImgOverlay className="overlay-black d-flex flex-column justify-content-between">
                <CardTitle className="text-white">{event.name}</CardTitle>
                    <p>
                                    On {this.formatDate(event.date)} - {this.FormatTimeTo12(this.FormatTime(event.time))} <br/>
                        At {event.venue}
                    </p>
                </CardImgOverlay>
                </div>
                        )
                })
            }
            </Swiper>
            </CardBody>
        </Card>
        }
    </>
    )
  }
}
export default UpcomingEvents
