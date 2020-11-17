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

class General extends React.Component {
  state = {
    visible: true,
    email: "",
    password: "",
    name: "",
    confirmPass: "",
    phone: "",
    reg_no: "",
    academic_from: "",
    academic_to: "",
    company: null,
    address: null,
    approved: false,
    userlist: [],
    isValid: null,
    emailValid: null,
    passwordValidationMessage: "",
    emailValidationMessage: "",
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

  componentDidMount = () => {
    if(this.props.user){
      this.setState({
        email:this.props.user.email,
        phone:this.props.user.phone,
        password:this.props.user.password,
        name:this.props.user.fullname,
        reg_no:this.props.user.reg_no,
        academic_from:this.props.user.academic_from,
        academic_to:this.props.user.academic_to,
        company:this.props.user.company,
        address:this.props.user.address
      })
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
        address: this.state.address,
        approved: this.props.user.approved
      }
      console.log(data,'data')
  }

  render() {
    const user = this.props.user
    // console.log(user)
    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={img}
              alt="User"
              height="64"
              width="64"
            />
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
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
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
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "d \\ M \\, Y" }}
                  // value={this.state.academic_to}
                  defaultValue= {user.academic_to}
                  onChange={date => this.handleyearofpassout(date)}
                />
                </FormGroup>              
              }
              {user.user_role === "Student" &&
                <FormGroup>
                <Label for="address">Academic Year</Label>
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "d \\ M \\, Y" }}
                  // value={this.state.academic_from}
                  defaultValue= {user.academic_from}
                  onChange={date => this.handleyearofpassout(date)}
                />
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
      </React.Fragment>
    )
  }
}
export default General
