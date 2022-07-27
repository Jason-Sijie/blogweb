import {Component} from "react";

/**
 * params : {
 *   userId : int,
 *   currentUser : (optional) {
 *
 *   }
 * }
 */
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (<> User Home: {this.props.userId} </>)
  }
}

export default UserHome;