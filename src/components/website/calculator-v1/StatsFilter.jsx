import React from "react";
import { Formik, Form, Field } from "formik";

const initialValues = {
  betType: "Match Odds",
  min: "",
  currency: "GBP",
  conjunction: "or",
};

const StatsFilter = () => {
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
              <option value="SOT">SOT</option>
              <option value="SOFFT">SOFFT</option>
              <option value="Total Shots">Total Shots</option>
              <option value="C/Score">C/Score</option>
              <option value="HT C/Score">HT C/Score</option>
              <option value="Goals">Goals</option>
              <option value="Goal Diff">Goal Diff</option>
              <option value="Corners">Corners</option>
              <option value="R/Cards">R/Cards</option>
              <option value="D/Attacks">D/Attacks</option>
              <option value="TSLG">TSLG</option>
              <option value="PI1">PI1</option>
              <option value="PI2">PI2</option>
              <option value="PI3">PI3</option>
              <option value="2nd half SOT">2nd half SOT</option>
              <option value="2nd half Corners">2nd half Corners</option>
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

export default StatsFilter;
