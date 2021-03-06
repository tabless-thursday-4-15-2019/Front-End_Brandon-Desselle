import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap'

import axiosWithAuth from '../axiosWithAuth'

// --- EditList component

class EditList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editList: this.props.tab
    }
    this.modalToggle = this.modalToggle.bind(this)
  }
  modalToggle() {
    console.log(this.state.editList)
    this.setState({
      modal: !this.state.modal
    })
  }
  handleChange = e => {
    this.setState({
      editList: {
        ...this.state.editList,
        [e.target.name]: e.target.value
      }
    })
  }
  editList = id => {
    console.log(id)
    const editList = this.state.editList
    axiosWithAuth()
      .put(`https://tabless-db.herokuapp.com/tabs/${id}`, editList)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <>
        <div className="tab-icon-wrapper">
          <i className="fas fa-edit" onClick={this.modalToggle} />
          <i
            className="fas fa-trash-alt"
            onClick={() => this.props.deleteList(this.props.tab.id)}
          />
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.modalToggle}
          className="sign-up"
        >
          <ModalHeader className="edit-header" toggle={this.modalToggle}>
            <img
              className="fav"
              src="#"
              alt=""
            />
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              name="tab"
              placeholder="Link"
              value={this.state.editList.tab}
              onChange={this.handleChange}
              className="login-input"
            />
            <Input
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.editList.description}
              onChange={this.handleChange}
              className="login-input"
            />
{/*             <Input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.editList.title}
              onChange={this.handleChange}
              className="login-input"
            />
            <Input
              type="textarea"
              placeholder="Short Description"
              name="short_description"
              value={this.state.editList.short_description}
              onChange={this.handleChange}
              className="login-input"
            /> */}
          </ModalBody>
          <ModalFooter>
            <Button
              className="edit-btn"
              onClick={() => this.editList(this.props.tab.id)}
            >
              Edit Tab
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default EditList;