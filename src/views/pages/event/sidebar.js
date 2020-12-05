import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import axios from "axios"

class EventSidebar extends Component {




  state = {
    id: "",
    name: "",
    description: "",
    date: new Date(),
    time: new Date(),
    venue: '',
    img: '',
    imagelist : []

  }

  addNew = false

  componentDidMount = () => {
    if(this.props.addNew === true){
      var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
      this.setState({
        imagelist: user_images,
        name: "",
        description: "",
        date: new Date(),
        time: new Date(),
        venue: '',
        img: '',
      })
    }
    else{
      var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
      this.setState({
        imagelist: user_images,
        name: this.props.data.name,
        description: this.props.data.description,
        date: this.props.data.date,
        time: this.props.data.time,
        venue: this.props.data.venue,
        img: this.props.data.image,
      })
    }
  }


  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var date =  [day, month, year].join('-');
    this.setState({date:date})
  }

  handleSubmit = data => {
    if(((this.state.name && this.state.description && this.state.date && this.state.time  &&
      this.state.venue) === "")){
     this.props.addWarning()
   }
   else {
       var data = {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        time: this.state.time,
        venue: this.state.venue,
        // img_url: this.state.img
       }
         axios
           .post("http://localhost:3000/events/add", data)
           .then(response => {
             if(response.data.status === 200){
               this.UploadImage(this.state.img,response.data.id)
               this.props.addSuccess()
               this.props.handleSidebar(false, true)
             }
             else {
             this.props.addError()
             }
           })
           .catch(err =>
             console.log(err),
             )

   }
  }

  handleUpdate = data => {
    if(((this.state.name && this.state.description && this.state.date && this.state.time  &&
      this.state.venue) === "")){
     this.props.addWarning()
   }
   else {
       var data = {
        name: this.state.name,
        description: this.state.description,
        date: this.state.date,
        time: this.state.time,
        venue: this.state.venue,
        // img_url: this.state.img
       }
         axios
           .put(`http://localhost:3000/events/update/${this.props.data.id}`, data)
           .then(response => {
             if(response.data.status === 200){
               this.UploadImage(this.state.img,this.props.data.id)
               this.props.updateSuccess()
               this.props.handleSidebar(false, true)
             }
             else {
             this.props.addError()
             }
           })
           .catch(err =>
             console.log(err),
             )

   }
  }

  imageSelect = e => {
    var files = e.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }

 }

 _handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         var base64textString= btoa(binaryString);
         this.setState({
          img:base64textString
        })
      // this.UploadImage(base64textString)
 }

 UploadImage = (base64textString,id) => {
  if(this.state.imagelist === null || this.state.imagelist.length === 0){
    let imgdata = {
        event_id : id,
        image_url : base64textString
    }
    let templist = []
    templist.push(imgdata)
    localStorage.setItem("Alumno-Event-Images",JSON.stringify(templist));
    var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
    this.setState({imagelist : user_images, img : base64textString})
  } 
  else{
  let sameuser = true
  for(let i=0;i<this.state.imagelist.length;i++){
    if(this.state.imagelist[i].event_id === id){
      sameuser = true
      this.state.imagelist[i].image_url = base64textString
      localStorage.setItem("Alumno-Event-Images",JSON.stringify(this.state.imagelist));
      var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
      this.setState({imagelist : user_images, img : base64textString})
    }
    else {
      sameuser = false
    }
  }
  if(sameuser === false){
    let imgdata = {
      event_id : id,
      image_url : base64textString
  }
  this.state.imagelist.push(imgdata)
  localStorage.setItem("Alumno-Event-Images",JSON.stringify(this.state.imagelist));
  var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
  this.setState({imagelist : user_images, img : base64textString})
  }
  }
 }

 Remove = () => {
   if(this.props.data !== null){
    if(this.state.imagelist !== null){
      for(let i=0;i<this.state.imagelist.length;i++){
        if(this.state.imagelist[i].event_id === this.props.data.id){
          this.state.imagelist.splice(i,1)
          localStorage.setItem("Alumno-Event-Images",JSON.stringify(this.state.imagelist));
          var user_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
          this.setState({imagelist : user_images, image : ''})
        }
      }
    }
   }
   else {
    this.setState({img : ''})
   }

 }


  render() {
    let { show, handleSidebar, data } = this.props
    let { name, description, date, time, venue, img } = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "Update Event " : "Add New Event"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-1"
          options={{ wheelPropagation: false }}>
          <FormGroup>
            <Label for="data-name">Event Name <span style={{ color: "red" }}>*</span></Label>
            <Input
              type="text"
              value={name}
              placeholder="Event"
              onChange={e => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-description">Description <span style={{ color: "red" }}>*</span></Label>
            <Input
              type="textarea"
              value={description}
              placeholder="Description"
              onChange={e => this.setState({ description: e.target.value })}
              id="data-description">
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-date">Date <span style={{ color: "red" }}>*</span></Label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                className="form-control"
                // views={["year"]}
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={date}
                style={{marginTop: '0px', paddingTop:'6px', borderBottom: '0px'}}
                onChange={(date)=> this.setState({ date : date })}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </MuiPickersUtilsProvider>
          </FormGroup>
          <FormGroup>
            <Label for="data-time">Time <span style={{ color: "red" }}>*</span></Label>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                className="form-control"
                margin="normal"
                id="time-picker"
                style={{marginTop: '0px', paddingTop:'6px', borderBottom: '0px'}}
                value={time}
                onChange={(date)=> this.setState({ time: date })}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            {/* <Flatpickr
                className="form-control"
                value={time}
                options={{
                  enableTime: true,
                  noCalendar: true,
                  dateFormat: "H:i",
                }}
                onChange={date => {
                  this.setState({ time : date });
                }}
              /> */}
          </FormGroup>
          <FormGroup>
            <Label for="data-venue">Venue <span style={{ color: "red" }}>*</span></Label>
            <Input
              type="textarea"
              value={venue}
              placeholder="Venue"
              onChange={e => this.setState({ venue: e.target.value })}
              id="data-venue"
            />
          </FormGroup>
          <FormGroup className="text-center">
              <img className="img-fluid" src={`data:image/png;base64,${img}`} alt={name} />
              <div className="d-flex flex-wrap justify-content-between mt-1">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Photo
                <Input type="file" name="file" accept=".jpg,.jpeg,.png" id="uploadImg" onChange={this.imageSelect} hidden />
                </Button.Ripple>
                <Button
                  color="danger"
                  onClick={() => this.Remove}>
                  Remove
                </Button>
              </div>
            </FormGroup>
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          {data !== null ? 
          <Button color="primary" onClick={() => this.handleUpdate(this.state)}>
            Update
          </Button> 
            : 
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            Submit
          </Button>
          }
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default EventSidebar
