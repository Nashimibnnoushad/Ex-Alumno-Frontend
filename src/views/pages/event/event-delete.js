import React, { Fragment } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from "reactstrap"
  import axios from "axios"

class EventDelete extends React.PureComponent {

    toggleModal = () => {
        this.props.closeDeleteModal()
    }

    deleteEvent = () => {
        axios
        .delete(`http://localhost:3000/events/delete/${this.props.deleteid}`)
        .then(response => {
          if(response.data.status === 200){
            this.imagedelete()
            this.props.DeletedSuccess()
            this.props.eventlist.splice(this.props.deleteindex,1)
            this.props.closeDeleteModal()
          }
          else {
          this.props.addError()
          }
        })
        .catch(err =>
          console.log(err),
          )

    }

    imagedelete = () => {
        var event_images = JSON.parse(localStorage.getItem("Alumno-Event-Images"))
        if(event_images !== null && event_images.length !== 0){
            for(let i=0;i<event_images.length;i++){
                if(event_images[i].event_id === this.props.deleteid){
                  event_images.splice(i,1)
                  localStorage.setItem("Alumno-Event-Images",JSON.stringify(event_images));
                }
              }
        }
    }

    render() {
        return (
            <Fragment>
                <Modal
                    isOpen={this.props.toggleDeleteModal}
                    toggle={this.toggleModal}
                    className="modal-dialog-centered"
                >
                    <ModalHeader
                        toggle={this.toggleModal}
                        className="bg-primary"
                    >
                        Delete Event
                    </ModalHeader>
                    <ModalBody>
                        <h5>Are you sure you want to delete this Event?</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={this.deleteEvent}>
                            Delete
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        )
    }
}

export default EventDelete