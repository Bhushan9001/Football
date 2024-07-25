import React from "react";
import { Formik, Form, Field } from "formik";

const initialValues = {
  betType: "Match Odds",
  min: "",
  currency: "GBP",
  conjunction: "or",
};

const LiquidityFilter = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="flex gap-2">
            <Field as="select" className="text-xs" name="betType">
              <option value="Match Odds">Match Odds</option>
              <option value="Over / Under 1.5">Over / Under 1.5</option>
              <option value="Over / Under 2.5">Over / Under 2.5</option>
              <option value="Correct Score">Correct Score</option>
            </Field>
            <Field
              type="text"
              className="w-8 p-1 text-xs"
              placeholder="min"
              name="min"
            />
            <Field as="select" className="p-1 text-xs" name="currency">
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </Field>
            <Field as="select" className="p-1 text-xs" name="conjunction">
              <option value="or">Or</option>
              <option value="and">And</option>
            </Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LiquidityFilter;
