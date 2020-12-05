import React from "react"
import {
    Row, Col, Card, CardHeader, CardBody, Button, Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from "reactstrap"
import avatarImg from "../../../assets/img/portrait/small/account.png"
import axios from "axios"
import { Phone, Mail, Home, Award, Calendar } from "react-feather"
import classnames from "classnames"
import { toast, ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

const updated = () =>
  toast.success("User Permission Updated Successfully", {
    position: toast.POSITION.TOP_CENTER
  })

class UserList extends React.Component {

    state = {
        userlist: [],
        activeTab: "1"
    }
    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
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
    
        var date = [year];
        return date
      }

    componentDidMount = () => {
        axios
        .get("http://localhost:3000/users")
        .then(response => {
            if (response.data.status === 200 && response.data.data && response.data.data.length !== 0) {
                var users = []
                var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
                for (let i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].user_role !== "Admin") {
                        let data = {
                            id:response.data.data[i].id,
                            email:response.data.data[i].email,
                            phone:response.data.data[i].phone,
                            password:response.data.data[i].password,
                            fullname:response.data.data[i].fullname,
                            reg_no:response.data.data[i].reg_no,
                            academic_from:response.data.data[i].academic_from,
                            academic_to:response.data.data[i].academic_to,
                            company:response.data.data[i].company,
                            designation:response.data.data[i].designation,
                            address:response.data.data[i].address,
                            approved:response.data.data[i].approved,
                            image:null
                        }
                        if(user_images !== null && user_images.length !== 0){
                            for(let j=0;j<user_images.length;j++){
                                if(response.data.data[i].id === user_images[j].user_id){
                                    data.image = user_images[j].image_url
                                }
                            }
                        }
                        users.push(data)
                    }
                }
                this.setState({ userlist: users })
            }
        })
        .catch(err =>
            console.log(err),
        )
    }

    userList=()=> {
        axios
            .get("http://localhost:3000/users")
            .then(response => {
                if (response.data.status === 200 && response.data.data && response.data.data.length !== 0) {
                    var users = []
                    var user_images = JSON.parse(localStorage.getItem("Alumno-User-Images"))
                    for (let i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].user_role !== "Admin") {
                            let data = {
                                id:response.data.data[i].id,
                                email:response.data.data[i].email,
                                phone:response.data.data[i].phone,
                                password:response.data.data[i].password,
                                fullname:response.data.data[i].fullname,
                                reg_no:response.data.data[i].reg_no,
                                academic_from:response.data.data[i].academic_from,
                                academic_to:response.data.data[i].academic_to,
                                company:response.data.data[i].company,
                                designation:response.data.data[i].designation,
                                address:response.data.data[i].address,
                                approved:response.data.data[i].approved,
                                image:null
                            }
                            if(user_images !== null && user_images.length !== 0){
                                for(let j=0;j<user_images.length;j++){
                                    if(response.data.data[i].id === user_images[j].user_id){
                                        data.image = user_images[j].image_url
                                    }
                                }
                            }
                            users.push(data)
                        }
                    }
                    this.setState({ userlist: users })
                }
            })
            .catch(err =>
                console.log(err),
            )
    }

    ApprovedUser = (status,id) => {
        const data = {
            approved : status
        }
        const headers = {}
        axios
        .put(`http://localhost:3000/users/appove/${id}`, data)
        .then(response => {
            if (response.data.status === 200) {
                updated()
                this.userList()
            }
        })
        .catch(err =>
            console.log(err),
        )
    }

    render() {
        const { userlist } = this.state
        return (
            <React.Fragment>
                <Row>
                    {userlist && userlist.length > 0 &&
                        userlist.map((user, index) => {
                            return (
                                <Col lg="4" md="6" sm="12" key={index}>
                                    <Card>
                                        <CardHeader className="mx-auto">
                                            <div className="avatar mr-1 avatar-xl">
                                            {user.image ?
                                                <img src={`data:image/png;base64,${user.image}`} alt="avatarImg" />
                                                :
                                                <img src={avatarImg} alt="avatarImg" />
                                            }
                                            </div>
                                        </CardHeader>
                                        <CardBody className="text-center">
                                            <h4>{user.fullname}</h4>
                                            <p>{user.user_role}</p>
                                            {/* <div className="card-btns d-flex justify-content-between"> */}
                                            {user.approved === 0 &&
                                             <Button.Ripple className="gradient-light-primary" onClick={()=> this.ApprovedUser(true,user.id)}>
                                             Approve
                                            </Button.Ripple>
                                            }
                                               {user.approved === 1 && 
                                                <Button.Ripple color="primary" onClick={()=> this.ApprovedUser(false,user.id)} outline>
                                                Cancel
                                                </Button.Ripple>                                               
                                               }

                                            {/* </div> */}
                                            <hr  />

                                            <Nav tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === "1"
                                                        })}
                                                        onClick={() => {
                                                            this.toggle("1")
                                                        }}
                                                    >
                                                        Basic
                                                </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === "2"
                                                        })}
                                                        onClick={() => {
                                                            this.toggle("2")
                                                        }}
                                                    >
                                                        Carrer
                                                </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames({
                                                            active: this.state.activeTab === "3"
                                                        })}
                                                        onClick={() => {
                                                            this.toggle("3")
                                                        }}
                                                    >
                                                        More
                                                </NavLink>
                                                </NavItem>
                                            </Nav>
                                            <TabContent activeTab={this.state.activeTab}>
                                                <TabPane tabId="1">
                                                    <div className="chart-info d-flex justify-content-between mb-1">
                                                        <div className="series-info d-flex align-items-center">
                                                            <Phone strokeWidth={5} size="12" className="primary" />
                                                            <span className="text-bold-600 ml-50">Phone</span>
                                                        </div>
                                                        <div className="series-result">
                                                            <span className="align-middle">{user.phone}</span>
                                                        </div>
                                                    </div>
                                                    <div className="chart-info d-flex justify-content-between mb-1">
                                                        <div className="series-info d-flex align-items-center">
                                                            <Mail strokeWidth={5} size="12" className="primary" />
                                                            <span className="text-bold-600 ml-50">Email</span>
                                                        </div>
                                                        <div className="series-result">
                                                            <span className="align-middle">{user.email}</span>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                                <TabPane tabId="2">
                                                    {user.academic_to !== null &&
                                                        <div className="chart-info d-flex justify-content-between mb-1">
                                                            <div className="series-info d-flex align-items-center">
                                                                <Calendar strokeWidth={5} size="12" className="primary" />
                                                                <span className="text-bold-600 ml-50">Passout Year</span>
                                                            </div>
                                                            <div className="series-result">
                                                                <span className="align-middle">{this.formatDate(user.academic_to)}</span>
                                                            </div>
                                                        </div>
                                                    }
                                                    {user.academic_from !== null &&
                                                        <div className="chart-info d-flex justify-content-between mb-1">
                                                            <div className="series-info d-flex align-items-center">
                                                                <Calendar strokeWidth={5} size="12" className="primary" />
                                                                <span className="text-bold-600 ml-50">Academic Year</span>
                                                            </div>
                                                            <div className="series-result">
                                                                <span className="align-middle">{this.formatDate(user.academic_from)}</span>
                                                            </div>
                                                        </div>
                                                    }
                                                    {user.reg_no !== null &&
                                                        <div className="chart-info d-flex justify-content-between mb-1">
                                                            <div className="series-info d-flex align-items-center">
                                                                <Calendar strokeWidth={5} size="12" className="primary" />
                                                                <span className="text-bold-600 ml-50">Register Number</span>
                                                            </div>
                                                            <div className="series-result">
                                                                <span className="align-middle">{user.reg_no}</span>
                                                            </div>
                                                        </div>
                                                    }
                                                </TabPane>
                                                <TabPane tabId="3">
                                                {user.company !== null &&
                                                     <div className="chart-info d-flex justify-content-between mb-1">
                                                     <div className="series-info d-flex align-items-center">
                                                         <Award strokeWidth={5} size="12" className="primary" />
                                                         <span className="text-bold-600 ml-50">Company</span>
                                                     </div>
                                                     <div className="series-result">
                                                    <span className="align-middle">{user.company}</span>
                                                     </div>
                                                 </div>                                                   
                                                }
                                                {user.company !== null &&
                                                     <div className="chart-info d-flex justify-content-between mb-1">
                                                     <div className="series-info d-flex align-items-center">
                                                         <Award strokeWidth={5} size="12" className="primary" />
                                                         <span className="text-bold-600 ml-50">Designation</span>
                                                     </div>
                                                     <div className="series-result">
                                                    <span className="align-middle">{user.designation}</span>
                                                     </div>
                                                 </div>                                                   
                                                }                                               
                                                {user.address !== null &&
                                                    <div className="chart-info d-flex justify-content-between mb-1">
                                                    <div className="series-info d-flex align-items-center">
                                                        <Home strokeWidth={5} size="12" className="primary" />
                                                        <span className="text-bold-600 ml-50">Address</span>
                                                    </div>
                                                    <div className="series-result">
                                                    <span className="align-middle">{user.address}</span>
                                                    </div>
                                                </div>
                                                }

                                                </TabPane>
                                            </TabContent>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            <ToastContainer />
            </React.Fragment>
        )
    }
}

export default UserList
