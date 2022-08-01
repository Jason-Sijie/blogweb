import {Component} from "react";
import { connect } from "react-redux";

import {acquireJwtCredentials, logout} from "../actions/userAction";
import {handleModalShow, handleModalClose} from "../actions/modalAction";

import AppHeader from "../components/stateless/AppHeader";
import {AppRoutes} from "../utils/routes";
import GlobalModal from "../components/stateful/GlobalModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/app_style.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"app"}>
        <AppHeader {...this.props.user}/>
        <div style={{marginTop: "70px"}}>
          <AppRoutes {...this.props} />
          <GlobalModal {...this.props.modal.globalModal} {...this.props.action.modal}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {  
  return {
    user: state.userReducer,
    modal: state.modalReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: {
      user: {
        acquireJwtCredentials: (username, password) => {
          acquireJwtCredentials(username, password)(dispatch);
        },
        logout: () => {
          logout()(dispatch);
        }
      },
      modal: {
        handleModalShow: (title, content, path) => {
          handleModalShow(title, content, path)(dispatch)
        },
        handleModalClose: (path) => {
          handleModalClose(path)(dispatch)
        }
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
