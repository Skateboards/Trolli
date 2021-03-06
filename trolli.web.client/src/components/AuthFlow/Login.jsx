import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Formik } from "formik";
import {
  Form,
  FormGroup,
  Input,
  Container,
  Card,
  Navbar,
  NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";

import * as userService from "../../Services/userService";
import * as schemas from "../../models/userSchemas";
// import * as prompts from "../NotificationMessage";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.validation = schemas.getLoginSchema;
    this.state = {};
    this.state.userData = this.validation.initialValues;

    // this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  componentDidMount() {
    if (this.props.userAuthorized) {
      this.props.history.goBack();
    }
  }

  onLoginSuccess = (resp, sub) => {
    sub(false);
    console.log(resp);
    if (this.props.location.search) {
      let path = this.props.location.search.replace("?return=", "");
      this.props.history.push(path, {
        action: "USERLOGIN"
      });
    } else {
      this.props.history.push("/", {
        action: "USERLOGIN"
      });
    }
  };

  onLoginFail = (err, sub) => {
    sub(false);
    console.log(err);
  };

  handleSubmit = (values, { setSubmitting }) => {
    userService
      .login(values)
      .then(resp => this.onLoginSuccess(resp, setSubmitting))
      .catch(err => this.onLoginFail(err, setSubmitting));
  };

  render() {
    return (
      <Container fluid>
        <Navbar className="bg-light-blue" color="dark" dark expand="md">
          <NavbarBrand href="/">
            <i className="fas fa-bus mr-2" />
            Trolli
          </NavbarBrand>
        </Navbar>
        <div className="block-center m-4 wd-xl">
          <Card className="py-5 px-4">
            <p className="text-center">LOG IN TO CONTINUE.</p>
            <Formik
              initialValues={this.state.userData}
              onSubmit={this.handleSubmit}
              validationSchema={this.validation()}
            >
              {props => {
                const {
                  values,
                  touched,
                  errors,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit
                } = props;
                return (
                  <Form className="mb-3" onSubmit={handleSubmit}>
                    <FormGroup>
                      <div className="input-group with-focus">
                        <Input
                          id="username"
                          type="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={"Username"}
                          className={
                            errors.username && touched.username
                              ? "is-invalid border-right-0"
                              : "border-right-0"
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text text-muted bg-transparent border-left-0">
                            <em className="fa fa-user" />
                          </span>
                        </div>
                      </div>
                      {errors.username && touched.username && (
                        <span
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.username}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <div className="input-group with-focus">
                        <Input
                          id="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder={"Password"}
                          className={
                            errors.password && touched.password
                              ? "is-invalid border-right-0"
                              : "border-right-0"
                          }
                        />
                        <div className="input-group-append">
                          <span className="input-group-text text-muted bg-transparent border-left-0">
                            <em className="fa fa-lock" />
                          </span>
                        </div>
                      </div>
                      {errors.password && touched.password && (
                        <span
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.password}
                        </span>
                      )}
                    </FormGroup>
                    <div className="text-center">
                      <Link className="text-muted" to="forgot">
                        Forgot your password?
                      </Link>
                    </div>
                    <button
                      className="btn btn-block btn-info mt-3 dynamic-card-header"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <p className="pt-2 text-center">Need to Signup?</p>
            <button
              className="btn btn-block btn-light border"
              onClick={() => this.props.history.push("/register")}
            >
              Register Now
            </button>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Login);
