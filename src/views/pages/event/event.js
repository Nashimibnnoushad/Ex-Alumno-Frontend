import React from "react"
import EventConfig from './event-config'
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

class Event extends React.Component {
    render() {
        return (
            <React.Fragment>
                      <EventConfig />
            </React.Fragment >
        )
    }
}

export default Event
