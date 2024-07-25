import { useFormik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "./AuthWrapper";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
    },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().when({
        is: (val) => !val.includes("@"), // If the value doesn't include '@', consider it a username
        then: Yup.string().required("Username cannot be empty"),
        otherwise: Yup.string()
          .email("Invalid email address")
          .required("Email cannot be empty"),
      }),
    }),
    onSubmit: (values) => {
      // Handle form submission (e.g., send data to server)
      console.log("Form submitted:", values);
    },
  });

  return (
    <AuthWrapper>
      <form className="bg-white px-8 py-4" onSubmit={formik.handleSubmit}>
        <h1 className="mb-4 font-medium">E-mail or Username</h1>
        <div className="mb-4">
          <input
            type="text"
            name="emailOrUsername"
            className="placeholder:text-customGray mb-2 w-full border-b-[1px] border-[#1287a4] p-3 focus:border-b-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.emailOrUsername}
            placeholder="Your E-mail address or username"
          />
          {formik.touched.emailOrUsername && formik.errors.emailOrUsername && (
            <div className="pl-3 text-primary">
              {formik.errors.emailOrUsername}
            </div>
          )}
        </div>
        <button className="mb-8 mt-4 w-full bg-primary px-5 py-4 text-center text-white">
          Reset Password
        </button>
        <p className="font-medium text-center">
          If you are registered you will receive an email containing the steps
          needed to reset your password after pressing the "Reset Password"
          button
        </p>
      </form>
    </AuthWrapper>
  );
}

export default ForgetPassword;
