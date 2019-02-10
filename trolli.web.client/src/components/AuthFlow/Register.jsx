import React, { PureComponent } from "react";
import { withRouter } from "react-router";
import { Formik } from "formik";
import { Form, FormGroup, Input, Container, Card } from "reactstrap";

// import * as accountsService from "../../services/accountsService";
import * as schemas from "../../models/userSchemas";
// import * as prompts from "../NotificationMessage";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.validation = schemas.getRegisterSchema;
    this.state = {};
    this.state.userData = this.validation.initialValues;

    // this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  //   componentDidMount() {
  //     if (this.props.userAuthorized) {
  //       this.props.history.goBack();
  //     }
  //   }

  //   onLoginSuccess = sub => {
  //     sub(false);
  //     prompts.success({ message: "Welcome Back!" });
  //     if (this.props.location.search) {
  //       let path = this.props.location.search.replace("?return=", "");
  //       this.props.history.push(path, {
  //         action: "USERLOGIN"
  //       });
  //     } else {
  //       this.props.history.push("/", {
  //         action: "USERLOGIN"
  //       });
  //     }
  //   };

  //   onLoginFail = (err, sub) => {
  //     sub(false);
  //     prompts.error({ message: "Oops! Something went wrong." });
  //     console.log(err);
  //   };

  //   handleSubmit = (values, { setSubmitting }) => {
  //     accountsService
  //       .login(values)
  //       .then(() => this.onLoginSuccess(setSubmitting))
  //       .catch(err => this.onLoginFail(err, setSubmitting));
  //   };

  render() {
    return (
      <Container fluid>
        <div className="block-center m-4 wd-xl">
          <Card className="py-5 px-4">
            <p className="text-center">CREATE AN ACCOUNT</p>
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
                          type="text"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Pick a Username"
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
                        {errors.username && touched.username && (
                          <span
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {errors.username}
                          </span>
                        )}
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="input-group with-focus">
                        <Input
                          id="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
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
                    <FormGroup>
                      <div className="input-group with-focus">
                        <Input
                          id="passwordConfirm"
                          type="password"
                          value={values.passwordConfirm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Confirm Password"
                          className={
                            errors.passwordConfirm && touched.passwordConfirm
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
                      {errors.passwordConfirm && touched.passwordConfirm && (
                        <span
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {errors.passwordConfirm}
                        </span>
                      )}
                    </FormGroup>
                    <button
                      type="submit"
                      className="btn btn-block btn-info mt-4"
                      disabled={isSubmitting}
                    >
                      Register Now
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <p className="pt-2 text-center">Already have an account?</p>
            <button
              className="btn btn-block btn-light border"
              onClick={() => this.props.history.push("/login")}
            >
              Login
            </button>
          </Card>
        </div>
      </Container>
    );
  }
}

export default withRouter(Login);