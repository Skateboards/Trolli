import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

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
          <NavbarBrand href="/">
            <i className="fas fa-bus mr-2" />
            Trolli
          </NavbarBrand>
          {!this.props.userAuth && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.currentUser && this.props.currentUser.name}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/myroute">My Route</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/mydings">My Dings</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/ding/new">New Ding</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/logout">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
