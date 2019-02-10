import React from "react";
import { Form, Formik } from "formik";
import { Row, Button, Label, Input } from "reactstrap";
import * as schemas from "../../models/dingsSchemas";
import * as dingService from "../../Services/dingService";

class DingCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getDingSchema;
    this.state = {
      primarySponsorTypeId: 1,
      routes: [],
      categorys: [],
      addressId: undefined,
      inputHide: "d-none",
      addressValue: null
    };
    this.state.dings = this.validation.initialValues;
  }
  componentDidMount() {
    dingService
      .getRoutes()
      .then(r => console.log(r))
      .catch(r => console.log(r));
  }
  handleSubmitDing = (values, obj) => {
    debugger;
    var data = {
      DingCategory: values.category,
      Value: values.message,
      CreatedBy: "Gurgen",
      RouteId: values.route,
      StopId: 1,
      StopDisplayName: "Maria street",
      Agency: "Test Agency",
      Lat: 1212,
      Long: 122112
    };
    // if (this.props.match.params.uid === undefined) {
    //   sponsorServices
    //     .add(data)
    //     .then(this.onAddSponsorSucsses)
    //     .catch(this.onAddSponsorError);
    // } else {
    //   sponsorServices
    //     .update(data, this.props.match.params.uid)
    //     .then(this.onUpdateSponsorSucsses)
    //     .catch(this.onUpdateSponsorError);
    // }
  };
  hand = a => {
    if (a.target.value === "lametro-rail" || a.target.value === "lametro") {
      this.setState({ inputHide: "" });
    }
    if (a.target.value === "") {
      this.setState({ inputHide: "d-none" });
    }
    console.log(a.target.value);
  };
  render() {
    return (
      <div className="bg-light-blue">
        <Formik
          enableReinitialize={true}
          initialValues={this.state.dings}
          onSubmit={this.handleSubmitDing}
          validationSchema={this.validation()}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <Row>
                <div className="col-lg-12">
                  <Form
                    className="form-horizontal"
                    action="#"
                    data-parsley-validate=""
                    noValidate=""
                  >
                    <div className="col-md-6">
                      <div className="card card-default">
                        <div className="card-header">
                          <div className="card-title text-primary">
                            New Ding
                          </div>
                        </div>

                        <div className="card-body">
                          <fieldset>
                            <Label className="col-form-label text-primary">
                              Agency
                            </Label>
                            <select
                              className="form-control"
                              name="agency"
                              value={values.agency}
                              onChange={handleChange}
                              onClick={this.hand}
                              onBlur={handleBlur}
                              style={{ display: "block" }}
                            >
                              <option value="" label="Select Type" />
                              <option value="lametro" label="lametro" />
                              <option
                                value="lametro-rail"
                                label="lametro-rail"
                              />
                            </select>
                            {errors.agency && touched.agency && (
                              <div className="input-feedback text-danger">
                                {errors.agency}
                              </div>
                            )}
                          </fieldset>
                          <fieldset className={this.state.inputHide}>
                            <Label className="col-form-label text-primary">
                              Route
                            </Label>
                            <select
                              className="form-control"
                              name="route"
                              value={values.route}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ display: "block" }}
                            >
                              <option value="" label="Select Type" />
                              {/* {this.state.routes.map(this.renderOptions)} */}
                            </select>
                            {errors.route && touched.route && (
                              <div className="input-feedback text-danger">
                                {errors.route}
                              </div>
                            )}
                          </fieldset>
                          <fieldset className={this.state.inputHide}>
                            <Label className="col-form-label text-primary">
                              Category
                            </Label>
                            <select
                              className="form-control"
                              name="category"
                              value={values.category}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              style={{ display: "block" }}
                            >
                              <option value="" label="Select Type" />
                              {/* {this.state.categorys.map(this.renderOptions)} */}
                            </select>
                            {errors.category && touched.category && (
                              <div className="input-feedback text-danger">
                                {errors.category}
                              </div>
                            )}
                          </fieldset>
                          <fieldset className={this.state.inputHide}>
                            <div className="row">
                              <Label
                                className="col-xl-2 col-form-label text-primary"
                                for="message"
                              >
                                Message
                              </Label>
                              <div className="col-xl-10">
                                <Input
                                  className={
                                    errors.message && touched.message
                                      ? "error"
                                      : ""
                                  }
                                  value={values.message}
                                  name="message"
                                  type="textarea"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                {errors.message && touched.message && (
                                  <label className="error text-danger">
                                    {errors.message}
                                  </label>
                                )}
                              </div>
                            </div>
                          </fieldset>
                        </div>
                        <div className="card-footer text-center">
                          <Button
                            color="primary"
                            type="button"
                            onClick={handleSubmit}
                            className="submitForm"
                          >
                            Ding!
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </Row>
            );
          }}
        </Formik>
      </div>
    );
  }
}
export default DingCreate;
