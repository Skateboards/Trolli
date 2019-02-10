import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar className="bg-light-blue" color="dark" dark expand="md">
          <NavbarBrand href="/">Trolli</NavbarBrand>
          <Link to="/logout" className="btn bg-light-blue border-0">
            Logout
          </Link>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
