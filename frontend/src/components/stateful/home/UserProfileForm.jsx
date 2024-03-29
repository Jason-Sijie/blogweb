import {Component} from "react";
import {Button, Col, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {createProfile, getProfileById, updateProfile} from "../../../actions/profileRequest";
import LoadingSpinner from "../../stateless/util/LoadingSpinner";
import {Navigate} from "react-router-dom";
import AvatarEdit from "./AvatarEdit";

/**
 * props : {
 *   userId : "",
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 */
class UserProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      name: "",
      email: "",
      aboutMe: "",
      links: []
    }

    if (this.hasPermissionToUpdateProfile(props)) {
      this.loadProfileData()
    } else {
      this.state = {
        loading: false,
        error: {
          message: "You do not have permission to modify User: " + props.userId + " 's profile"
        }
      }
    }
  }

  loadProfileData = () => {
    getProfileById(this.props.userId, (data) => {
      // profile existing
      this.setState({
        loading: false,
        hasProfile: true,
        ...data
      })
    }, (error) => {
      if (error.data.status === "NOT_FOUND") {
        // no existing profile
        this.setState({
          loading: false,
          hasProfile: false
        })
      } else {
        // service failure
        this.setState({
          loading: false,
          error: error.data
        })
      }
    })
  }

  hasPermissionToUpdateProfile = (props) => {
    if (props.currentUser != null && props.currentUser.id != null && props.currentUser.id.toString() === this.props.userId.toString()) {
      return true;
    }
    return false;
  }

  changeStateOnEvent = (key) => {
    return (event) => {
      this.setState({
        [key]: event.target.value
      })
    }
  }

  removeLinkFromLinks = (target) => {
    this.setState({links: this.state.links.filter(function(link) {
        return link.name !== target.name
      })});
  }

  addNewLinkToLinks = () => {
    const preLinks = this.state.links
    this.setState({
      links: [...preLinks, {
        name: "Dummy-" + preLinks.length,
        href: "https://test.com/test-user"
      }]
    });
  }

  changeLinkElement = (index, field) => {
    return (event) => {
      let newLinks = this.state.links;
      newLinks[index][field] = event.target.value;
      this.setState({
        links: newLinks
      })
    }
  }

  listOfLinksFormControl = (links) => {
    return (
      <div>
        {links.map((link, index) => {
          return(
            <InputGroup className="mb-3" key={"link-" + index}>
              <Form.Control key={"linkName-" + index} type="text" style={{width: "25%", backgroundColor:"lightcyan"}}
                            value={link.name}
                            onChange={this.changeLinkElement(index, 'name')}
                            required />
              <Form.Control key={"linkValue-" + index} type="text" style={{width: "65%"}}
                            value={link.href}
                            onChange={this.changeLinkElement(index, 'href')}
                            required />
              <Button key={"linkDelete-" + index} style={{width: "10%"}} variant={"dark"} onClick={() => this.removeLinkFromLinks(link)}>
                Delete
              </Button>
            </InputGroup>
          )
        })}
      </div>
    )
  }

  createOrUpdateProfile = (event) => {
    event.preventDefault();

    if (this.state.hasProfile) {
      // update profile
      console.log("update profile")
      updateProfile({
        userId: this.props.userId,
        name: this.state.name,
        email: this.state.email,
        aboutMe: this.state.aboutMe,
        links: this.state.links
      }, (data) => {
        this.props.handleModalShow("Update Succeeded", "Successfully updated your profile", "/users/" + data.userId + "/home")
      }, (error) => {
        this.props.handleModalShow("Update Failed", "Failed to update your profile", "")
      })
    } else {
      // create new profile
      console.log("create new profile")
      createProfile({
        userId: this.props.userId,
        name: this.state.name,
        email: this.state.email,
        aboutMe: this.state.aboutMe,
        links: this.state.links
      }, (data) => {
        this.props.handleModalShow("Creation Succeeded", "Successfully created your profile", "/users/" + data.userId + "/home")
      }, (error) => {
        this.props.handleModalShow("Creation Failed", "Failed to create your profile", "")
      })
    }
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />
    } else if (this.state.error != null) {
      return <Navigate replace to="/error" state={this.state.error}/>
    } else {
      return(
        <Form className={"shadow p-3 mb-5 bg-white rounded"} onSubmit={this.createOrUpdateProfile}>
          <Row>
            <h2> {this.props.currentUser.username + " User Profile"} </h2>
          </Row>

          <AvatarEdit userId={this.props.userId} 
                      handleModalShow={this.props.handleModalShow}/>

          <FloatingLabel controlId="userProfile.floatingName" label="Name / Alias" className="mt-2 mb-4">
            <Form.Control type="text"
                          value={this.state.name}
                          onChange={this.changeStateOnEvent("name")}
                          required />
          </FloatingLabel>

          <FloatingLabel controlId="userProfile.contactEmail" label="Contact Email" className="mb-4">
            <Form.Control type="email"
                          value={this.state.email}
                          onChange={this.changeStateOnEvent("email")}
                          required />
          </FloatingLabel>

          <Form.Group className="mb-3" controlId="userProfile.aboutMe">
            <Form.Label><h5>About Me</h5></Form.Label>
            <Form.Control as="textarea" rows={3}
                          value={this.state.aboutMe}
                          onChange={this.changeStateOnEvent("aboutMe")}
                          required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="userProfile.links">
            <Row style={{justifyContent: "space-between", marginBottom: "20px"}}>
              <Col xs={"4"}>
                <Form.Label><h5>Links</h5></Form.Label>
              </Col>
              <Col xs={"4"}>
                <Button style={{width: "100%"}} onClick={this.addNewLinkToLinks}>Add Link</Button>
              </Col>
            </Row>
            {this.listOfLinksFormControl(this.state.links)}
          </Form.Group>

          <Row style={{justifyContent:"right"}} className={"mb-2"}>
            <Col xs={"12"}>
              <Button type="submit" style={{width: "100%"}} variant="success">
                Save Profile
              </Button>
            </Col>
          </Row>
        </Form>
      )
    }
  }
}

export default UserProfileForm;