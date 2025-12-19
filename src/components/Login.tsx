import { Container, Form, Button } from "react-bootstrap";
import NavBar from "./NavBar";
import { FunctionComponent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Services/UserService";
import { toast } from "react-toastify";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate(); // Hook for navigation
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
    onSubmit: async (values) => {
      try {
        // Call the API to check user credentials
        const response = await checkUser(values);
        // The API returns a token in response.data (string token)
        if (response.data) {
          // Store the JWT token
          sessionStorage.setItem("token", response.data);

          // Decode and store user details (used help to do it)
          const base64Url = response.data.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );
          // Parse user details from the decoded JWT payload
          const userDetails = JSON.parse(jsonPayload);
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          sessionStorage.setItem("userId", userDetails._id);

          toast.success("Login successful");
          navigate("/home"); // Navigate to Home page after successful login
        } else {
          toast.error("Invalid Details");
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data || error.message || "Login failed";
        toast.error(errorMessage);
      }
    },
  });
  return (
    <>
      <NavBar />
      {/* Login Form */}
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
