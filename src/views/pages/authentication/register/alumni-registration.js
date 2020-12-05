import React from "react"
import { Form, FormGroup, Input, Label, Button} from "reactstrap"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { connect } from "react-redux"
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions"
import { history } from "../../../../history"
import axios from "axios"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../../assets/scss/plugins/extensions/toastr.scss"
import Flatpickr from "react-flatpickr";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class AlumniRegister extends React.Component {

regSuccess = () => {toast.success("Registration Successfully.", { transition: Zoom })}
regWarning = () => toast.warning("Please Fill all Fields!!", { transition: Zoom })
regError = () => toast.warning("Something Went Wrong!!.", { transition: Zoom })
duplicateUser = () => toast.warning("This Email is Already Taken", { transition: Zoom })

componentDidMount() {
  axios
  .get("http://localhost:3000/users")
  .then(response => {
    if(response.data.status === 200){
      this.setState({userlist: response.data.data})
    }
  })
  .catch(err =>
    console.log(err),
    )
}

  state = {
    email: "",
    password: "",
    name: "",
    confirmPass: "",
    phone: "",
    reg_no: "",
    user_role: "Alumni",
    academic_from: new Date(),
    academic_to: new Date(),
    company: null,
    designation: null,
    address: null,
    approved: false,
    userlist: [],
    isValid: null,
    emailValid: null,
    passwordValidationMessage: "",
    emailValidationMessage: "",
    canSubmit: false,
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var date =  [day, month, year].join('-');
    this.setState({academic_to:date})
  }

  handleRegister = () => {
    if(((this.state.name && this.state.email && this.state.phone && this.state.password  &&
       this.state.reg_no && this.state.academic_to) === "") || (this.state.canSubmit !== true)){
      this.regWarning()
    }
    else {
      var user = this.state.userlist.find((value) => value.email === this.state.email)
      if(user === null || user === undefined || user === ""){
        var data = {
          email: this.state.email,
          password: this.state.password,
          fullname: this.state.name,
          phone: this.state.phone,
          reg_no: this.state.reg_no,
          academic_to: this.state.academic_to,
          user_role: this.state.user_role,
          approved: this.state.approved
        }
          axios
            .post("http://localhost:3000/users/add", data)
            .then(response => {
              if(response.data.status === 200){
                this.regSuccess()
                history.push("/")
              }
              else {
              this.regError()
              }
            })
            .catch(err =>
              console.log(err),
              )
      }
      else {
        this.duplicateUser()
      }

    }
      
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value })
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (e.target.value.match(decimal)) {
      this.setState({ passwordValidationMessage: "", canSubmit: true, isValid: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ passwordValidationMessage: "", canSubmit: false, isValid: false })
      }
      else {
        this.setState({ canSubmit: false, isValid: false, passwordValidationMessage: "Password must between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
      }
      return false;
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value })
    var decimal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.match(decimal)) {
      this.setState({ emailValidationMessage: "", canSubmit: true, emailValid: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ emailValidationMessage: "", canSubmit: false, emailValid: false })
      }
      else {
        this.setState({ canSubmit: false, emailValidationMessage: "Invalid Email", emailValid: false })
      }
      return false;
    }
  }

  render() {
    return (
        <React.Fragment>
        <Form >
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Name"
            required
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <Label>Name<span style={{ color: "red" }}>*</span></Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmail}
            onClick={this.handleEmail}
            onKeyDown={this.handleEmail}
            valid={this.state.emailValid === true}
            invalid={this.state.emailValid === false}
          />
          {this.state.emailValidationMessage && <span className="invalid-tooltip"> {this.state.emailValidationMessage}</span>}
          <Label>Email<span style={{ color: "red" }}>*</span></Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="number"
            placeholder="Phone"
            required
            value={this.state.phone}
            onChange={e => this.setState({ phone: e.target.value })}
          />
          <Label>Phone<span style={{ color: "red" }}>*</span></Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="password"
            placeholder="Password"
            required
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onClick={this.handlePasswordChange}
            valid={this.state.isValid === true}
            invalid={this.state.isValid === false}
          />
          {this.state.passwordValidationMessage && <span className="invalid-tooltip"> {this.state.passwordValidationMessage}</span>}
          <Label>Password<span style={{ color: "red" }}>*</span></Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="University Reg No"
            required
            value={this.state.reg_no}
            onChange={e => this.setState({ reg_no: e.target.value })}
          />
          <Label>University Reg No<span style={{ color: "red" }}>*</span></Label>
        </FormGroup>
        <FormGroup>
        <Label>Year of Passout</Label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                className="form-control"
                views={["year"]}
                id="academic_to"
                format="yyyy"
                value={this.state.academic_to}
                style={{marginTop: '0px', paddingTop:'6px', borderBottom: '0px'}}
                onChange={(date)=> this.setState({ academic_to : date })}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </MuiPickersUtilsProvider>
            {/* <Flatpickr
              className="form-control"
              placeholder="Date of Passout"
              value={this.state.academic_to}
              options={{ dateFormat: "d-m-Y", }}
              onChange={(date)=> this.formatDate(date)}
            /> */}
          
        </FormGroup>
        {/* <FormGroup className="form-label-group">
            <Flatpickr
              className="form-control"
              placeholder="Academic From"
              value={this.state.academic_from}
              options={{ altInput: true, altFormat: "F j, Y", dateFormat: "d-m-Y", }}
              onChange={date => {
                this.setState({ academic_from : date });
              }}
            />
          <Label>Academic From</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
            <Flatpickr
              className="form-control"
              placeholder="Academic To"
              value={this.state.academic_to}
              options={{ altInput: true, altFormat: "F j, Y", dateFormat: "d-m-Y", }}
              onChange={date => {
                this.setState({ academic_to : date });
              }}
            />
          <Label>Academic To</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="text"
            placeholder="Company Name"
            required
            value={this.state.company}
            onChange={e => this.setState({ company: e.target.value })}
          />
          <Label>Company Name</Label>
        </FormGroup>
        <FormGroup className="form-label-group">
          <Input
            type="textarea"
            placeholder="Home Address"
            required
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value })}
          />
          <Label>Home Address</Label>
        </FormGroup> */}
        <FormGroup>
          <Checkbox
            color="primary"
            icon={<Check className="vx-icon" size={16} />}
            label=" I accept the terms & conditions."
            defaultChecked={true}
          />
        </FormGroup> 
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="primary"
            outline
            onClick={() => {
              history.push("/pages/login")
            }}
          >
            Login
          </Button.Ripple>
          <Button.Ripple color="primary" onClick={()=> this.handleRegister()}>
            Register
          </Button.Ripple>
        </div>
        </Form>
        <ToastContainer />
        </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.register
  }
}
export default connect(mapStateToProps, { signupWithJWT })(AlumniRegister)
