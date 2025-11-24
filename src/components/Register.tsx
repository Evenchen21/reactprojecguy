import { FunctionComponent } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import NavBar from "./NavBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      imageLink: "",
      imageDescription: "",
      country: "",
      state: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
      middleName: Yup.string(),
      lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
      imageLink: Yup.string().url("Must be a valid URL"),
      imageDescription: Yup.string(),
      country: Yup.string().required("Country is required"),
      state: Yup.string(),
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      houseNumber: Yup.string().required("House number is required"),
      zipCode: Yup.string()
        .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
        .required("Zip code is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
    },
  });

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h2>Register</h2>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.firstName && !!formik.errors.firstName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="middleName">
                <Form.Control
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.lastName && !!formik.errors.lastName
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.phoneNumber && !!formik.errors.phoneNumber
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <h2>Address</h2>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="imageLink">
                <Form.Control
                  type="text"
                  name="imageLink"
                  placeholder="Image URL"
                  value={formik.values.imageLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.imageLink && !!formik.errors.imageLink
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.imageLink}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="imageDescription">
                <Form.Control
                  type="text"
                  name="imageDescription"
                  placeholder="Image Description"
                  value={formik.values.imageDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="country">
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.country && !!formik.errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="state">
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="city">
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.city && !!formik.errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="street">
                <Form.Control
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.street && !!formik.errors.street}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.street}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="houseNumber">
                <Form.Control
                  type="text"
                  name="houseNumber"
                  placeholder="House Number"
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.houseNumber && !!formik.errors.houseNumber
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.houseNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="zipCode">
                <Form.Control
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.zipCode && !!formik.errors.zipCode}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.zipCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="form-check d-flex align-items-center mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            {/* sign up as business option */}
            <label className="form-check-label ms-2" htmlFor="flexCheckDefault">
              Sign-Up as Business
            </label>
          </div>

          <div className="d-flex gap-2 mt-3 justify-content-center">
            <Button variant="success" type="submit">
              SUBMIT
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => formik.resetForm()}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Register;
