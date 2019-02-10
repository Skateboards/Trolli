import React from "react";
import { Form, Formik } from "formik";
import { Label, Card, CardBody, CardHeader } from "reactstrap";

class DingCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getDingSchema;
    this.state = {
      submitButtomText: "Add Sponsor",
      sponsorTypes: [],
      primarySponsorTypeId: 1,
      types: [],
      modalIsOpen: false,
      addressId: undefined,
      AddAddressButtom: "",
      addressValue: null
    };
    this.state.sponsor = this.validation.initialValues;
  }
  render() {
    return (
      <div className="bg-light-blue">
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
                  <div className="card-title">New Ding</div>
                </div>

                <div className="card-body">
                  <fieldset>
                    <div className="Form-group Row">
                      <Label className=" col-form-label">Route</Label>
                      <div>
                        <select
                          className="form-control"
                          name="sponsorType"
                          //   value={values.sponsorType}
                          //   onChange={handleChange}
                          //   onBlur={handleBlur}
                          style={{ display: "block" }}
                        >
                          <option value="" label="Select Type" />
                          {/* {this.state.sponsorTypes.map(this.renderOptions)} */}
                        </select>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
export default DingCreate;
