import React from "react";
import { Formik, Form, Field } from "formik";

const initialValues = {
  betType: "Match Odds",
  selection: "",
  min: "",
  max: "",
  conjunction: "or",
};

const additionalInputs = {
  "Match Odds": ["Home", "Away", "Draw"],
  "Over / Under 1.5": ["Under 1.5", "Over 1.5"],
  "Over / Under 2.5": ["Under 2.5", "Over 2.5"],
  "Correct Score": [
    "0-0",
    "0-1",
    "0-2",
    "0-3",
    "1-0",
    "1-1",
    "1-2",
    "1-3",
    "2-0",
    "2-1",
    "2-2",
    "2-3",
    "3-0",
    "3-1",
    "3-2",
    "3-3",
    "AOH",
    "AOA",
    "AOD",
  ],
};

const KOPriceFilter = () => {
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
            <Field as="select" className=" text-xs" name="selection">
              {additionalInputs[values.betType].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <Field
              type="text"
              className="w-8 p-1 text-xs"
              placeholder="min"
              name="min"
            />
            <Field
              type="text"
              className="w-8 p-1 text-xs"
              placeholder="max"
              name="max"
            />
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

export default KOPriceFilter;
