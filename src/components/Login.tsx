import { Container, Form, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Services/UserService";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(5)
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      checkUser(values)
        .then((response) => {
          if (response.data.length) {
            navigate("/home");
            sessionStorage.setItem("userId", response.data[0].id);
          } else {
            alert("Invalid Details");
          }
        })
        .catch((error) => {
          console.error("There was an ERROR: ", error);
        });
    },
  });
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h2>Login</h2>
        <Form onSubmit={formik.handleSubmit}>
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

          <div className="d-flex gap-2 mt-3 mb-3">
            <Button
              variant="outline-danger"
              type="button"
              className="flex-fill"
              onClick={() => formik.resetForm()}
            >
              CANCEL
            </Button>
            <Button
              variant="outline-secondary"
              type="button"
              className="flex-fill"
              onClick={() => formik.resetForm()}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </Button>
          </div>

          <Button variant="primary" type="submit" className="w-100">
            SUBMIT
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
