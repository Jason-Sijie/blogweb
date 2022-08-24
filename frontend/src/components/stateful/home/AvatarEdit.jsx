import { Component } from "react";
import { Row, Col, Button, Modal, Card, Form } from "react-bootstrap";
import ImageCrop from "../util/ImageCrop";
import { api } from "../../../config"; 
import { uploadProfileAvatar, getProfileAvatarById } from "../../../actions/profileRequest";
 
/**
 * props: {
 *   userId: ,
 *   handleModelShow: (title, content, path) => {}
 * } 
 */
class AvatarEdit extends Component{
  constructor(props) {
    super(props)
    this.state = {
      hasAvatar: false,
      showModal: false,
      showCropModal: false,
      avatarIdx: null,
      croppedImageURL: null
    }

    getProfileAvatarById(this.props.userId, (data) => {
      console.log("succeeded to get profile avatar")
      this.setState({
        hasAvatar: true
      })
    })
  }

  handleUploadAvatar = () => {
    if (this.state.avatarIdx == null) {
      alert("You need to choose one avatar image")
      return;
    }
    let targetAvatarURL = null;
    if (this.state.avatarIdx >= 0) {
      // default avatar
      targetAvatarURL = "/images/profile_avatar_" + (parseInt(this.state.avatarIdx)+1) + ".png"
    } else {
      // custom avatar
      targetAvatarURL = this.state.croppedImageURL
    }
    console.log("target avatar url: " + targetAvatarURL)

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target.result
      const bytes = new Uint8Array(buffer)

      uploadProfileAvatar(bytes, data => {
        console.log("succeeded: ", data)
        this.props.handleModalShow("Avatar upload succeeded", "Successfully upload user: " + this.props.userId + " avatar", "")
        this.setState({
          showModal: false,
          hasAvatar: false
        })
        this.setState({
          hasAvatar: true
        })
      }, error => {
        console.log("error: ", error.data)
        this.props.handleModalShow("Avatar upload failed", error.data.message, "")
      })
    };
    reader.onerror = (err) => {
      alert("Failed to read your image file. Please upload the file again.")
    };

    fetch(targetAvatarURL).then(res => {
      res.blob().then(blob => {
        reader.readAsArrayBuffer(blob)
      })
    });
  }

  defaultAvatarList = () => {
    return (
      <Row>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col xs={3} key={"avatar-col" + idx}>
            <Card key={"avatar-card" + idx}>
              <Card.Img variant="top" key={"avatar-img" + idx}
                        style={{borderRadius: "50%", padding: "5%"}}
                        src={"/images/profile_avatar_" + (idx+1) + ".png"} />
              <Card.Body>
              <Form.Check key={"avatar-box" + idx}
                          value={idx}
                          name="avatar" 
                          type="radio" 
                          onChange={(e) => {this.setState({avatarIdx: e.target.value})}}/>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>	
    )
  }

  croppedImageCheckBox = () => {
    if (this.state.croppedImageURL != null) {
      return (
        <Col xs={3}>
          <Card>
            <Card.Img variant="top" 
                      style={{borderRadius: "50%", padding: "5%"}}
                      onClick={() => this.setState({showCropModal: true})}
                      src={this.state.croppedImageURL} />
            <Card.Body>
            <Form.Check key={"box_" + -1} 
                        value={-1}
                        name="avatar" 
                        type="radio" 
                        onChange={(e) => {this.setState({avatarIdx: e.target.value})}}/>
            </Card.Body>
          </Card>
        </Col>
      )
    }
  }

  uploadCustomAvatar = () => {
    return (<div>
      <Row className="p-3">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label><h4>Upload your avatar</h4></Form.Label>
          <Form.Control type="file" accept=".png,.jpg"
                         onChange={(e) => {
                          const file = e.target.files[0]
                          const url = URL.createObjectURL(file)
                          this.setState({
                            uploadFile: file,
                            uploadURL: url,
                            showCropModal: true
                          })
                        }}/>
        </Form.Group>
      </Row>
      <Row>
        <ImageCrop style={{top: "100px"}}
                  imgURL={this.state.uploadURL} 
                  showModal={this.state.showCropModal} 
                  onModalHide={() => this.setState({showCropModal: false})} 
                  onSaveHandler={(imageURL) => {
                    console.log("save cropped image URL: " + imageURL)
                    this.setState({croppedImageURL: imageURL})
                  }} />
      </Row>
      <Row style={{justifyContent: "center"}}>
        {this.croppedImageCheckBox()}
      </Row>
    </div>)
  }

  render() {
    const avatarUrl = api.blogWeb.user + "/" + this.props.userId + "/profiles/avatar";
    return (
      <div>
        <Row style={{justifyContent: "space-between", height: "100px", margin: "10px 0"}}>
          <Col xs={4} style={{height: "100%", marginLeft: "3%"}}> 
            <img src={this.state.hasAvatar ? avatarUrl : "/images/profile_avatar_1.png"} 
                 alt={"avatar_image"}
                 style={{height: "100%", borderRadius: "50%"}}/>
          </Col>

          <Col xs={4} style={{alignSelf: "center", textAlign: "right", marginRight: "4%"}}>
            <Button variant={'dark'} onClick={() => this.setState({showModal: true})}>
              Edit Avatar
            </Button>
          </Col>

          <Modal show={this.state.showModal} size="xl" onHide={() => this.setState({showModal: false})} >
            <Modal.Header closeButton>
              <Modal.Title>Edit Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{minHeight: "600px"}}>
              {this.defaultAvatarList()}
              {this.uploadCustomAvatar()}

              <Row style={{padding: "3% 10%"}}>
                <Button style={{width: "100%"}} onClick={this.handleUploadAvatar}>
                  Update Avatar
                </Button>
              </Row>
            </Modal.Body>
          </Modal>
        </Row>

        
      </div>
      
    )
  }
}

export default AvatarEdit;