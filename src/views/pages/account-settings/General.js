import React from "react"
import {
  Alert,
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"
import img from "../../../assets/img/portrait/small/account.png"
import Flatpickr from "react-flatpickr";
import axios from "axios"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class General extends React.Component {

upSuccess = () => {toast.success("User Updated Successfully.", { transition: Zoom })}
upError = () => toast.warning("Something Went Wrong!!.", { transition: Zoom })

  state = {
    visible: true,
    email: "",
    password: "",
    name: "",
    confirmPass: "",
    phone: "",
    reg_no: "",
    academic_from: new Date,
    academic_to: new Date,
    company: null,
    designation: null,
    address: null,
    approved: false,
    img_url:"",
    userlist: [],
    isValid: null,
    emailValid: null,
    passwordValidationMessage: "",
    emailValidationMessage: "",
    user_images:[],
    image: ''
  }

  
  handleyearofpassout = date => {
    this.setState({
      academic_to: date
    })
  }
  handleacademicyear = date => {
    this.setState({
      academic_from: date
    })
  }

  dismissAlert = () => {
    this.setState({
      visible: false
    })
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
          img_url:base64textString
        })
      this.UploadImage(base64textString)
 }

 UploadImage = (base64textString) => {
  if(this.state.user_images === null || this.state.user_images.length === 0){
    let imgdata = {
        user_id : this.props.user.id,
        image_url : base64textString
    }
    let templist = []
    templist.push(imgdata)
    localStorage.setItem("Alumno-User-Images",JSON.stringify(templist));
    var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
    this.setState({user_images : user_images, image : base64textString})
  } 
  else{
  let sameuser = true
  for(let i=0;i<this.state.user_images.length;i++){
    if(this.state.user_images[i].user_id === this.props.user.id){
      sameuser = true
      this.state.user_images[i].image_url = base64textString
      localStorage.setItem("Alumno-User-Images",JSON.stringify(this.state.user_images));
      var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
      this.setState({user_images : user_images, image : base64textString})
      console.log(this.state.user_images,'images')
    }
    else {
      sameuser = false
    }
  }
  if(sameuser === false){
    let imgdata = {
      user_id : this.props.user.id,
      image_url : base64textString
  }
  this.state.user_images.push(imgdata)
  localStorage.setItem("Alumno-User-Images",JSON.stringify(this.state.user_images));
  var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
  this.setState({user_images : user_images, image : base64textString})
  console.log(this.state.user_images,'images')
  }
  }
 }

 Remove = () => {
  if(this.state.user_images !== null){
    for(let i=0;i<this.state.user_images.length;i++){
      if(this.state.user_images[i].user_id === this.props.user.id){
        this.state.user_images.splice(i,1)
        localStorage.setItem("Alumno-User-Images",JSON.stringify(this.state.user_images));
        var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
        this.setState({user_images : user_images, image : ''})
      }
    }
  }
 }

  componentDidMount = () => {
    if(this.props.user){
      var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
      console.log(user_images)
      this.setState({
        email:this.props.user.email,
        phone:this.props.user.phone,
        password:this.props.user.password,
        name:this.props.user.fullname,
        reg_no:this.props.user.reg_no,
        academic_from:this.props.user.academic_from,
        academic_to:this.props.user.academic_to,
        company:this.props.user.company,
        designation: this.props.user.designation,
        address:this.props.user.address,
        user_images: user_images
      })
      if(user_images !== null){
        for(let i=0;i<user_images.length;i++){
          if(user_images[i].user_id === this.props.user.id){
            this.setState({image: user_images[i].image_url})
          }
        }
      }
    }
  }

  saveChanges = () =>{
      let data = {
        fullname: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.props.user.password,
        user_role: this.props.user.user_role,
        reg_no: this.state.reg_no,
        academic_from: this.state.academic_from,
        academic_to: this.state.academic_to,
        company: this.state.company,
        designation: this.state.designation,
        address: this.state.address,
        approved: this.props.user.approved
      }
      console.log(data,'d')
      axios
      .put(`http://localhost:3000/users/update/${this.props.user.id}`, data)
      .then(response => {
        console.log(response,'res')
        if(response.data.status === 200){
          this.upSuccess()
        }
        else {
        this.upError()
        }
      })
      .catch(err =>
        console.log(err),
        )
  }

  render() {
    const user = this.props.user
    // console.log(user)
    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            {this.state.image ? 
                        <Media
                        className="rounded-circle"
                        object
                        src={`data:image/png;base64,${this.state.image}`}
                        alt="User"
                        height="64"
                        width="64"
                      />
            :
            <Media
            className="rounded-circle"
            object
            src={img}
            alt="User"
            height="64"
            width="64"
          />
             }

          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Photo
                <Input type="file" name="file" accept=".jpg,.jpeg,.png" id="uploadImg" onChange={this.imageSelect} hidden />
              </Button.Ripple>
              <Button.Ripple onClick={() => this.Remove()} color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
        {user && 
          <Form className="mt-2" >
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input id="name"
                  // value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  defaultValue={user.fullname} 
                 />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email"
                  // value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}                
                 defaultValue={user.email} 
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Phone</Label>
                <Input id="email"
                  // value={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}                
                 defaultValue={user.phone} 
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Register Number</Label>
                <Input id="email"
                  // value={this.state.reg_no}
                  onChange={e => this.setState({ reg_no: e.target.value })}                
                 defaultValue={user.reg_no} 
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              {user.user_role === "Alumni" &&
                <FormGroup>
                <Label for="address">Year of Passout</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    className="form-control"
                    views={["year"]}
                    id="academic_to"
                    format="yyyy"
                    value= {user.academic_to}
                    style={{marginTop: '0px', paddingTop:'6px', borderBottom: '0px'}}
                    onChange={(date)=> this.setState({ academic_to : date })}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                </MuiPickersUtilsProvider>
                {/* <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "d \\ M \\, Y" }}
                  // value={this.state.academic_to}
                  defaultValue= {user.academic_to}
                  onChange={date => this.handleyearofpassout(date)}
                /> */}
                </FormGroup>              
              }
              {user.user_role === "Student" &&
                <FormGroup>
                <Label for="address">Academic Year</Label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    className="form-control"
                    views={["year"]}
                    id="academic_from"
                    format="yyyy"
                    value= {user.academic_from}
                    style={{marginTop: '0px', paddingTop:'6px', borderBottom: '0px'}}
                    onChange={(date)=> this.setState({ academic_from : date })}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                </MuiPickersUtilsProvider>
                {/* <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "d \\ M \\, Y" }}
                  // value={this.state.academic_from}
                  defaultValue= {user.academic_from}
                  onChange={date => this.handleyearofpassout(date)}
                /> */}
                </FormGroup>              
              }
            </Col>
            {user.user_role === "Alumni" &&
            <Col sm="12">
              <FormGroup>
                <Label for="company">Company</Label>
                <Input
                  id="company"
                  // value={this.state.company}
                  onChange={e => this.setState({ company: e.target.value })}                   
                  defaultValue={user.company}
                />
              </FormGroup>
            </Col>
            }
            {user.user_role === "Alumni" &&
            <Col sm="12">
              <FormGroup>
                <Label for="company">Designation</Label>
                <Input
                  id="company"
                  // value={this.state.company}
                  onChange={e => this.setState({ designation: e.target.value })}                   
                  defaultValue={user.designation}
                />
              </FormGroup>
            </Col>
            }
            <Col sm="12">
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  id="address"
                  type="textarea"
                  // value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}                  
                  defaultValue={user.address}
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple onClick={()=> this.saveChanges()} className="mr-50" color="primary">
                Save Changes
              </Button.Ripple>
              {/* <Button.Ripple onClick={()=> this.Cancel()}  color="danger">
                Cancel
              </Button.Ripple> */}
            </Col>
          </Row>
        </Form>
      }
      <ToastContainer />
      </React.Fragment>
    )
  }
}
export default General
