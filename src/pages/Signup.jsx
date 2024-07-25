import { useFormik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "./AuthWrapper";
import styled from "styled-components";
import { countries } from "countries-list";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ErrorMessage = styled.div`
  background: #bf0000;
  border-radius: 10px;
  color: #fff;
  padding: 8px;
  max-width: 200px;
  text-align: center;
`;

function Signup() {
  const { signup, loading } = useAuth();
  const formik = useFormik({
    initialValues: {
      country: "",
      mobile: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      dataProtectionPolicy: false,
      termsAndConditions: false,
    },

    validationSchema: Yup.object({
      country: Yup.string().required("Select a country."),
      mobile: Yup.string()
        .matches(/^[0-9+]{10,}$/, "Invalid phone number")
        .required("Please, provide your valid mobile phone number."),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter your e-mail address."),
      username: Yup.string().required("Select a username."),
      password: Yup.string().required("Password cannot be empty."),
      passwordConfirm: Yup.string()
        .required("Password cannot be empty and must be identical.")
        .test("password-match", "Passwords must match", function (value) {
          return value === this.parent.password;
        }),
      dataProtectionPolicy: Yup.boolean().oneOf(
        [true],
        "You must accept the data protection policy",
      ),
      termsAndConditions: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions",
      ),
    }),

    onSubmit: async (values) => {
      const {
        dataProtectionPolicy,
        termsAndConditions,
        passwordConfirm,
        email,
        ...formData
      } = values;
      const lowercaseEmail = email.toLowerCase();
      const updatedFormData = {
        ...formData,
        email: lowercaseEmail,
      };
      await signup(updatedFormData);
    },
  });

  return (
    <AuthWrapper>
      <form className="bg-white p-4" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-3 gap-3">
          {/* 01) Country */}
          <div>
            <p className="mb-4 font-medium text-gray-700">Country</p>
            <div className="mb-4 flex items-center">
              <i className=" bi bi-pin-map p-3 text-lg text-gray-700"></i>
              <select
                id="country"
                name="country"
                className="w-full border-b-[1px] border-[#1287a4] bg-transparent p-3 font-medium text-black"
                onChange={(e) => {
                  formik.handleChange(e);
                  const countryCode = e.target.value;
                  const phoneCode = countries[countryCode]?.phone[0];
                  formik.setFieldValue("country", countryCode);
                  formik.setFieldValue("mobile", `+${phoneCode}`);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {Object.keys(countries).map((countryCode) => (
                  <option key={countryCode} value={countryCode}>
                    {countries[countryCode].name}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.country && formik.errors.country && (
              <ErrorMessage>{formik.errors.country}</ErrorMessage>
            )}
          </div>
          {/* 02) Mobile */}
          <div>
            <p className="mb-4 font-medium text-gray-700">
              Mobile Phone Number
            </p>
            <div className="mb-4 flex items-center">
              <i className="bi bi-phone p-3 text-lg text-gray-700"></i>
              <input
                type="tel"
                name="mobile"
                className="w-full border-b-[1px] border-[#1287a4] p-3 font-medium"
                placeholder="International format i.e. +44715521585"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
            </div>
            {formik.touched.mobile && formik.errors.mobile && (
              <ErrorMessage>{formik.errors.mobile}</ErrorMessage>
            )}
          </div>
          {/* 03) Email */}
          <div>
            <p className="mb-4">E-mail</p>
            <div className="mb-4 flex items-center">
              <i className="bi bi-envelope p-3 text-lg text-gray-700"></i>
              <input
                type="email"
                name="email"
                className="w-full border-b-[1px] border-[#1287a4] p-3"
                placeholder="yourmail@domain.universe"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage>{formik.errors.email}</ErrorMessage>
            )}
          </div>
          {/* 04) Username */}
          <div>
            <p className="mb-4">Username</p>
            <div className="mb-4 flex items-center">
              <i className="bi bi-person p-3 text-lg text-gray-700"></i>
              <input
                type="text"
                name="username"
                className="w-full border-b-[1px] border-[#1287a4] p-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
            {formik.touched.username && formik.errors.username && (
              <ErrorMessage>{formik.errors.username}</ErrorMessage>
            )}
          </div>
          {/* 05) Password */}
          <div>
            <p className="mb-4">Password</p>
            <div className="mb-4 flex items-center">
              <i className="bi bi-key p-3 text-lg text-gray-700"></i>
              <input
                type="password"
                name="password"
                className="w-full border-b-[1px] border-[#1287a4] p-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage>{formik.errors.password}</ErrorMessage>
            )}
          </div>
          {/* 06) Confirm Password */}
          <div>
            <p className="mb-4">Retype Password</p>
            <div className="mb-4 flex items-center">
              <i className="bi bi-key p-3 text-lg text-gray-700"></i>
              <input
                type="password"
                name="passwordConfirm"
                className="w-full border-b-[1px] border-[#1287a4] p-3"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
              />
            </div>
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <ErrorMessage>{formik.errors.passwordConfirm}</ErrorMessage>
              )}
          </div>
        </div>
        {/* 07) T&Cs */}
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              id="termsAndConditions"
              name="termsAndConditions"
              className="pl-2"
              checked={formik.values.termsAndConditions}
              onChange={formik.handleChange}
            />
            <label htmlFor="termsAndConditions" className="font-medium">
              Accept
              <Link className="pl-1 transition hover:text-[#0a58ca]">
                Terms & Conditions
              </Link>
            </label>
          </div>
          {formik.touched.termsAndConditions &&
          formik.errors.termsAndConditions ? (
            <div className="text-primary">
              {formik.errors.termsAndConditions}
            </div>
          ) : null}
        </div>
        {/* 08) Data Protection */}
        <div className="mb-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <input
              type="checkbox"
              id="dataProtectionPolicy"
              name="dataProtectionPolicy"
              checked={formik.values.dataProtectionPolicy}
              onChange={formik.handleChange}
            />
            <label htmlFor="dataProtectionPolicy" className="font-medium">
              Accept
              <Link className="pl-1 transition hover:text-[#0a58ca]">
                Data Protection Policy
              </Link>
            </label>
          </div>
          {formik.touched.dataProtectionPolicy &&
          formik.errors.dataProtectionPolicy ? (
            <div className="text-primary">
              {formik.errors.dataProtectionPolicy}
            </div>
          ) : null}
        </div>

        <button
          className="my-4 flex w-full items-center justify-center gap-2 bg-primary px-5 py-4 text-center font-medium text-white"
          disabled={loading}
        >
          Creat Account
          {loading && <i className="pi pi-spin pi-spinner text-xl"></i>}
        </button>
      </form>
    </AuthWrapper>
  );
}

export default Signup;
