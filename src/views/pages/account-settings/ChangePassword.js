import React from "react"
import { Button, FormGroup, Row, Col, Form, Input } from "reactstrap"
import axios from "axios"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

class ChangePassword extends React.Component {

  upSuccess = () => { toast.success("Password Updated Successfully.", { transition: Zoom }) }
  upError = () => toast.warning("Something Went Wrong!!.", { transition: Zoom })
  inputError = () => toast.warning("Please Fill all fields.", { transition: Zoom })
  samePassword = () => toast.warning("Old & New password are same!!.", { transition: Zoom })
  oldPasswordError = () => toast.warning("Old Password is incorrect!!.", { transition: Zoom })


  state = {
    old_password: "",
    new_password: "",
    passwordValidationMessage: "",
    isValid: null
  }

  handlePasswordChange = (e) => {
    this.setState({ new_password: e.target.value })
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (e.target.value.match(decimal)) {
      this.setState({ passwordValidationMessage: "", isValid: true })
      return true;
    }
    else {
      if (e.target.value === "") {
        this.setState({ passwordValidationMessage: "", isValid: false })
      }
      else {
        this.setState({ isValid: false, passwordValidationMessage: "Password must between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character" })
      }
      return false;
    }
  }

  saveChanges = () => {
    if (this.state.old_password !== this.props.user.password) {
      this.oldPasswordError()
    }
    else {
      if (this.state.isValid === true && this.state.old_password !== "") {
        if (this.state.new_password === this.state.old_password) {
          this.samePassword()
        }
        else {
          let data = {
            password: this.state.new_password,
          }
          axios
            .put(`http://localhost:3000/users/update/password/${this.props.user.id}`, data)
            .then(response => {
              console.log(response, 'res')
              if (response.data.status === 200) {
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
      }
      else {
        this.inputError()
      }
    }
  }

  Cancel = () => {
    this.setState ({
      old_password: "",
      new_password: "",
      passwordValidationMessage: "",
      isValid: null
    })
  }

  render() {
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
                <Form>
                  <FormGroup>
                    <Input
                      name="old_password"
                      id="old_password"
                      value={this.state.old_password}
                      onChange={e => this.setState({ old_password: e.target.value })}
                      placeholder="Old Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      name="new_password"
                      placeholder="New Password"
                      value={this.state.new_password}
                      onChange={this.handlePasswordChange}
                      onClick={this.handlePasswordChange}
                      valid={this.state.isValid === true}
                      invalid={this.state.isValid === false}
                      id="new_password"
                    />
                    {this.state.passwordValidationMessage && <span className="invalid-tooltip"> {this.state.passwordValidationMessage}</span>}
                  </FormGroup>
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      onClick={()=> this.saveChanges()}
                    >
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      onClick={()=> this.Cancel()}
                      outline
                    >
                      Cancel
                    </Button.Ripple>
                  </div>
                </Form>
          </Col>
        </Row>
      <ToastContainer />
      </React.Fragment>
    )
  }
}
export default ChangePassword
