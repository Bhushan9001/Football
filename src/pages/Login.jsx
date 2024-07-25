import { useFormik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "./AuthWrapper";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../services/apiAuth";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { email, ...formData } = values;
      const lowercaseEmail = email.toLowerCase();
      const updatedFormData = { ...formData, email: lowercaseEmail };
      await login(updatedFormData);
    },
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated, navigate]);

  return (
    <AuthWrapper>
      <form className="bg-white px-8 py-4" onSubmit={formik.handleSubmit}>
        <h1 className="mb-4 font-medium">Login</h1>
        <div className="mb-4">
          <input
            type="text"
            id="email"
            name="email"
            className="mb-2 w-full border-b-[1px] border-[#1287a4] p-3 placeholder:text-customGray focus:border-b-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Username or e-mail"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="pl-3 text-primary">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            className="mb-2 w-full border-b-[1px] border-[#1287a4] p-3 placeholder:text-customGray"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="pl-3 text-primary">{formik.errors.password}</div>
          )}
        </div>
        <Link
          to="/forget-password"
          className="block text-end font-medium text-[#012d43]"
        >
          Forget Password?
        </Link>
        <button
          className="my-4 flex w-full items-center justify-center gap-2 bg-primary px-5 py-4 text-center text-white"
          disabled={loading}
        >
          Login
          {loading && <i className="pi pi-spin pi-spinner text-xl"></i>}
        </button>
        <Link
          to="/signup"
          className="block bg-accent px-5 py-4 text-center text-white"
        >
          Creat a Free Account
        </Link>
      </form>
    </AuthWrapper>
  );
}

export default Login;
