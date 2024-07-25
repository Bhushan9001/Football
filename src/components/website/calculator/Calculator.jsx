// TODO: Slider not showing UP


import { useFormik } from "formik";
import Container from "../../../ui/Container";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import * as Yup from "yup";
import { useEffect, useState } from "react";

function Calculator() {
  const [value, setValue] = useState([20, 80]);

  const betTypes = [
    { name: "Normal bet / Qualifier / Arb", value: "Normal" },
    { name: "Free bet SNR (Stake Not Returned)", value: "SNR" },
    { name: "Free bet SR (Stake Returned)", value: "SR" },
  ];

  const initialValues = {
    betType: "Normal",
    currency: "$",
    betStake: "10",
    backOdds: "2",
    layOdds: "2",
    backCommission: "0",
    layCommission: "3.00",
    lay1: "",
    lay2: "",
    odds1: "",
    odds2: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("vaue", values);
    },
  });

  useEffect(() => {
    document.body.style.background = "transparent";
    return () => {
      document.body.style.background = "unset";
    };
  }, []);

  return (
    <main className="pb-20 pt-48">
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-10 flex items-center justify-between">
            <div className="p-2">
              <label
                className="mb-3 ml-2 block text-sm font-semibold"
                htmlFor=""
              >
                Bet Type
              </label>
              <Dropdown
                value={formik.values.betType}
                onChange={(e) => formik.setFieldValue("betType", e.value)}
                options={betTypes}
                optionLabel="name"
                editable
                className="w-full max-w-3xl rounded-md border border-gray-500 p-2 text-sm"
                pt={{
                  root: "bg-transparent text-black",
                  input: "",
                  wrapper: "border-gray-500 p-2 border bg-white",
                  item: "hover:bg-gray-400",
                }}
              />
            </div>
            <div>
              <label
                className="mb-3 block text-end text-sm font-semibold"
                htmlFor="currency"
              >
                CURRENCY SYMBOL
              </label>
              <div className="flex items-center gap-3">
                <p className="text-sm">Your currency symbol:</p>
                <input
                  type="text"
                  name=""
                  className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                  id=""
                  {...formik.getFieldProps("currency")}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] items-center justify-between">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <label
                  className="mb-3 block text-sm font-semibold"
                  htmlFor="currency"
                >
                  BET
                </label>
                <div className="flex items-center gap-3">
                  <p className="text-sm">Bet stake (¥):</p>
                  <input
                    type="text"
                    name=""
                    className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                    id=""
                    {...formik.getFieldProps("betStake")}
                  />
                </div>
              </div>
              <div className="max-w-max">
                <div>
                  <label
                    className="mb-3 block text-sm font-semibold"
                    htmlFor="currency"
                  >
                    ODDS
                  </label>
                  <div className="mb-2 flex items-center justify-end gap-3">
                    <p className="text-sm">Back odds:</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("backOdds")}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-end gap-3">
                    <p className="text-sm">Lay odds:</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("layOdds")}
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-max">
                <div>
                  <label
                    className="mb-3 block text-sm font-semibold"
                    htmlFor="currency"
                  >
                    COMMISSION
                  </label>
                  <div className="mb-2 flex items-center justify-end gap-3">
                    <p className="text-sm">Back commission (%):</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("backCommission")}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-end gap-3">
                    <p className="text-sm">Lay commission (%):</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("layCommission")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-gray-200 px-4 py-5">
              <label
                className="mb-5 block text-clip text-center font-semibold"
                htmlFor="currency"
              >
                PART LAYS ALREADY IN PLACE
              </label>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <p className="text-sm">Lay (¥):</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("lay1")}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-sm">Lay (¥):</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("lay2")}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <p className="text-sm">@ Odds:</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("odds1")}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-sm">@ Odds:</p>
                    <input
                      type="text"
                      name=""
                      className="w-20 rounded-md border border-gray-500 p-2 text-sm"
                      id=""
                      {...formik.getFieldProps("odds2")}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center text-sm">Leave blank to ignore</p>
            </div>
          </div>
          <div className="my-20 text-center">
            <button className=" bg-primary px-5 py-2 text-lg text-white">
              Calculate/Refresh
            </button>
          </div>
        </form>
        <div className="grid grid-cols-3 gap-9">
          <div className="rounded-md bg-gray-200 px-4 py-5 text-center">
            <h6
              className="mb-5 block text-clip text-center font-semibold"
              htmlFor="currency"
            >
              UNDER LAY
            </h6>
            <p className="mb-1 text-base">
              {" "}
              At odds of 2 you should lay ¥10.00
            </p>
            <p className="mb-2 text-sm">The liability on this bet is ¥10.00</p>
            <p className="mb-1 text-sm">Overall position if win ¥0.00</p>
            <p className="text-sm">Overall position if lose ¥-0.30</p>
          </div>
          <div className="rounded-md bg-gray-200 px-4 py-5 text-center">
            <h6
              className="mb-5 block text-clip text-center font-semibold"
              htmlFor="currency"
            >
              STANDARD MATCH
            </h6>
            <p className="mb-1 text-base">
              {" "}
              At odds of 2 you should lay ¥10.00
            </p>
            <p className="mb-2 text-sm">The liability on this bet is ¥10.00</p>
            <p className="mb-1 text-sm">Overall position if win ¥0.00</p>
            <p className="text-sm">Overall position if lose ¥-0.30</p>
          </div>
          <div className="rounded-md bg-gray-200 px-4 py-5 text-center">
            <h6
              className="mb-5 block text-clip text-center font-semibold"
              htmlFor="currency"
            >
              OVER LAY
            </h6>
            <p className="mb-1 text-base">
              {" "}
              At odds of 2 you should lay ¥10.00
            </p>
            <p className="mb-2 text-sm">The liability on this bet is ¥10.00</p>
            <p className="mb-1 text-sm">Overall position if win ¥0.00</p>
            <p className="text-sm">Overall position if lose ¥-0.30</p>
          </div>
        </div>
        <div className="mx-auto mt-9 max-w-[80%] rounded-md bg-gray-200 px-4 py-5 text-center">
          <h6
            className="mb-5 block text-clip text-center font-semibold"
            htmlFor="currency"
          >
            CUSTOM MATCH
          </h6>
          <Slider
            value={value}
            onChange={(e) => setValue(e.value)}
            className="w-14rem bg-red-500"
            range
            pt={{
              root: "bg-red-500",
              handle: "bg-green-400",
              range: "bg-blue-400",
            }}
          />
        </div>
      </Container>
    </main>
  );
}

export default Calculator;
