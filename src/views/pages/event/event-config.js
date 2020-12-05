import React, { Component } from "react"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
} from "reactstrap"
import classnames from "classnames"
import {
  Plus, MapPin
} from "react-feather"
import Sidebar from "./sidebar"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import axios from "axios"
import EventDelete from "./event-delete"
import eventimage from "../../../assets/img/alumni/event.jpg"
const CustomHeader = props => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => props.handleSidebar(true, true)}
          outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </div>
    </div>
  )
}

class EventConfig extends Component {

  addSuccess = () => { toast.success("Event Added Successfully.", { transition: Zoom }) }
  updateSuccess = () => { toast.success("Event Updated Successfully.", { transition: Zoom }) }
  DeletedSuccess = () => toast.success("Event Deleted Successfully", { transition: Zoom })
  addWarning = () => toast.warning("Please Fill all Fields!!", { transition: Zoom })
  addError = () => toast.warning("Something Went Wrong!!.", { transition: Zoom })

  state = {
    data: [],
    sidebar: false,
    currentData: null,
    addNew: "",
    eventlist: [],
    user_role: null,
    toggleDeleteModal: false,
    deleteid: null,
    deleteindex:null

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
          this.setState({ eventlist: events })
        }
      })
      .catch(err =>
        console.log(err),
      )
  }

  thumbView = this.props.thumbView


  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
    if (boolean === false) {
      this.Reload()
    }
  }

  editEvent = (boolean, addNew = false, data) => {
    this.setState({ sidebar: boolean })
    if (addNew === false) this.setState({ currentData: data, addNew: false })
  }

  deleteEvent = (id,index) => {
    this.setState({ toggleDeleteModal: true, deleteid: id, deleteindex:index })
  }

  closeDeleteModal = () => {
    this.setState({ toggleDeleteModal: false, deleteid: null, deleteindex:null })
  }

  Reload = () => {
    axios
      .get("http://localhost:3000/events")
      .then(response => {
        if (response.data.status === 200 && response.data.data && response.data.data.length !== 0) {
          var events = []
          var event_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
          for (let i = response.data.data.length - 1; i >= 0; i--) {
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

  displayImage = (blob) => {

  }


  render() {
    let {
      currentData,
      sidebar,
      eventlist,
      user_role,
      toggleDeleteModal,
      deleteid,
      deleteindex
    } = this.state
    return (
      <div
        className={`data-list ${this.props.thumbView ? "thumb-view" : "list-view"
          }`}>

        {sidebar === true &&
          <Sidebar
            show={sidebar}
            data={currentData}
            handleSidebar={this.handleSidebar}
            addNew={this.state.addNew}
            addSuccess={this.addSuccess}
            updateSuccess={this.updateSuccess}
            addError={this.addError}
            addWarning={this.addWarning}

          />
        }
        {toggleDeleteModal &&
          <EventDelete toggleDeleteModal={toggleDeleteModal} deleteid={deleteid} eventlist={eventlist}
            closeDeleteModal={this.closeDeleteModal} deleteindex={deleteindex}
            DeletedSuccess={this.DeletedSuccess} addError={this.addError} />
        }

        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        {user_role === 'Admin' &&
          <Row>
            <Col lg="4" md="6" sm="12">
              <CustomHeader
                handleSidebar={this.handleSidebar}
              />
            </Col>
          </Row>
        }

        <Row className="mt-1">
          {eventlist && eventlist.length > 0 &&
            eventlist.map((event, index) => {
              return (
                <Col lg="4" md="6" sm="12" key={index}>
                  <Card>
                    <CardBody>
                      {event.image ? 
                          <CardImg
                          className="img-fluid mb-1"
                          src={`data:image/png;base64,${event.image}`}
                          alt="card image cap"
                          style={{
                            width: "300px",
                            height: "300px"
                          }}
                        />
                        :
                        <CardImg
                        className="img-fluid mb-1"
                        src={eventimage}
                        alt="card image cap"
                        style={{
                          width: "300px",
                          height: "300px"
                        }}
                      />                      
                      }

                      <h5>{event.name}</h5>
                      <p>{event.description}</p>
                      <hr className="my-1" />
                      <div className="card-btns d-flex justify-content-between mt-0">
                        <div className="float-left">
                          <p className="font-medium-2 mb-0"><MapPin style={{ color: "red" }} size={15} />{event.venue}</p>
                        </div>
                        <div className="float-right">
                          <p className="font-medium-2 mb-0">{this.formatDate(event.date)}</p>
                          <p>{this.FormatTimeTo12(this.FormatTime(event.time))}</p>
                        </div>
                      </div>
                      {user_role === 'Admin' &&
                        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-0">

                          <Button color="primary" onClick={() => this.editEvent(true, false, event)}>
                            Edit
                        </Button>
                          <Button
                            className="ml-1"
                            color="danger"
                            outline
                          onClick={() => this.deleteEvent(event.id,index)}
                          >
                            Delete
                        </Button>
                        </div>
                      }
                    </CardBody>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
        <ToastContainer />
      </div>

    )
  }
}


export default EventConfig
