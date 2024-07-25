import { useFormik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "./AuthWrapper";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Verify() {
  const { verify, loading } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      code: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email cannot be empty"),
      code: Yup.string().required("Code is required"),
    }),
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      await verify(values);
    },
  });

  return (
    <AuthWrapper>
      <form className="bg-white px-8 py-4" onSubmit={formik.handleSubmit}>
        <h1 className="mb-4 font-semibold">Verify your email</h1>
        <p className="mb-4">Please enter the OTP code sent to your email:</p>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            className="mb-2 w-full border-b-[1px] border-[#1287a4] p-3 placeholder:text-customGray focus:border-b-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Your E-mail address"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="pl-3 text-primary">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="code"
            className="mb-2 w-full border-b-[1px] border-[#1287a4] p-3 placeholder:text-customGray focus:border-b-black"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
            placeholder="OTP"
          />
          {formik.touched.code && formik.errors.code && (
            <div className="pl-3 text-primary">{formik.errors.code}</div>
          )}
        </div>
        <button
          className="mb-8 mt-4 flex w-full items-center justify-center gap-2 bg-primary px-5 py-4 text-center text-white"
          disabled={loading}
        >
          Verify Code
          {loading && <i className="pi pi-spin pi-spinner text-xl"></i>}
        </button>
      </form>
    </AuthWrapper>
  );
}

export default Verify;
