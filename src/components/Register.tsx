import { FunctionComponent } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addUser } from "../Services/UserService";
import { toast } from "react-toastify";

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isBusiness: true,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .required("First name is required"),
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
        .min(9, "Password must be at least 9 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[!@#$%^&*-]/,
          "Password must contain at least one special character !@#$%^&*-"
        )
        .required("Password is required"),
      imageUrl: Yup.string().url("Must be a valid URL").nullable(),
      imageAlt: Yup.string(),
      state: Yup.string(),
      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      houseNumber: Yup.number()
        .typeError("House number must be a number")
        .required("House number is required"),
      zip: Yup.number()
        .typeError("Zip must be a number")
        .required("Zip is required"),
    }),
    onSubmit: async (values) => {
      try {
        const houseNumber = Number(values.houseNumber);
        const zip = Number(values.zip);

        const userData = {
          name: {
            first: values.firstName,
            last: values.lastName,
          },
          phone: values.phoneNumber,
          email: values.email,
          password: values.password,
          image: {
            url: values.imageUrl || "",
            alt: values.imageAlt || "",
          },
          address: {
            state: values.state || "",
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber,
            zip,
          },
          isBusiness: values.isBusiness,
        };

        await addUser(userData);

        toast.success("Account created successfully. You can now log in.");
        navigate("/login");
      } catch (err: any) {
        const errorMessage =
          err.response?.data || err.message || "Registration failed";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <>
      <NavBar />
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7}>
            <div className="bg-white border rounded-4 shadow-sm p-4">
              <h2 className="text-center mb-4">Register</h2>

              <Form onSubmit={formik.handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
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
                  <Col md={6}>
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

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.email && !!formik.errors.email
                        }
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
                          formik.touched.phoneNumber &&
                          !!formik.errors.phoneNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.password && !!formik.errors.password
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="imageUrl">
                      <Form.Control
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.imageUrl && !!formik.errors.imageUrl
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.imageUrl as any}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="imageAlt">
                      <Form.Control
                        type="text"
                        name="imageAlt"
                        placeholder="Image Alt"
                        value={formik.values.imageAlt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <hr className="my-3" />
                <h5 className="mb-3 text-center">Address</h5>

                <Row className="g-3">
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
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="country">
                      <Form.Control
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={
                          formik.touched.country && !!formik.errors.country
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.country}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

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
                        isInvalid={
                          formik.touched.street && !!formik.errors.street
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.street}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

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
                          formik.touched.houseNumber &&
                          !!formik.errors.houseNumber
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.houseNumber as any}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="zip">
                      <Form.Control
                        type="text"
                        name="zip"
                        placeholder="Zip"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.zip && !!formik.errors.zip}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.zip as any}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Check
                      className="mb-2 d-flex justify-content-start"
                      style={{ textAlign: "left" }}
                      type="checkbox"
                      name="isBusiness"
                      id="isBusiness"
                      label="Sign-Up as Business User"
                      checked={formik.values.isBusiness}
                      onChange={formik.handleChange}
                    />
                  </Col>
                </Row>

                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Button variant="success" type="submit">
                    Register
                  </Button>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => formik.resetForm()}
                    title="Clear form"
                  >
                    <i className="fa-solid fa-arrows-rotate me-2"></i>
                    Refresh
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
