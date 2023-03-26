import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useSelector } from "react-redux";

import { BsFillGearFill } from "react-icons/bs";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

function Subscriptions({ userData, getUserData }) {
  const { user } = useSelector((state) => state.auth);

  const plans = {
    Basic: {
      Monthly: 18,
      Yearly: 13 * 12,
    },
    Premium: {
      Monthly: 37,
      Yearly: 29 * 12,
    },
  };

  const [invoices, setInvoices] = useState([]);
  const getInvoices = () => {
    axios
      .get(
        "https://plankton-app-q74hx.ondigitalocean.app/users/invoices/user/5"
      )
      .then((res) => {
        console.log(res.data);
        setInvoices(res.data.data);
      });
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="space-y-5 my-8 xl:mb-0 ">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 font-bold mb-4">
            Billing & Invoices
          </h2>
          <div className="text-sm text-[#475569]">
            Your {userData?.subscription?.plan} Plan is set to{" "}
            <strong className="font-medium">
              $
              {
                plans[userData?.subscription?.plan][
                  userData?.subscription?.frequency
                ]
              }
            </strong>{" "}
            per{" "}
            {userData?.subscription?.frequency === "Yearly" ? "year" : "month"}{" "}
            and will renew on{" "}
            <strong className="font-medium">{userData?.subscription?.end_date.slice(0,10)}</strong>.
          </div>
          <div className="flex justify-between mt-6">
            <div className="md:w-[200px]">
              <a
                href="https://billing.stripe.com/p/login/test_00g3fM5A0gwaav6144"
                target="_blank"
              >
                <button className="flex items-center justify-center w-full bg-[green] font-semibold py-[6px] text-white rounded-md text-sm">
                  <BsFillGearFill className="mr-1" /> Manage Subscription
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <section className="mt-6">
          <div className="flex justify-between">
            <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">
              Billing Information
            </h3>
            <span
              className={
                userData?.subscription?.Status === "Active"
                  ? "text-[green] font-semibold"
                  : "text-[red] font-semibold"
              }
            >
              {userData?.subscription?.Status}
            </span>
          </div>
          <ul>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              {/* Left */}
              <div className="text-sm text-slate-800 font-medium">
                Payment Method
              </div>
              {/* Right */}
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">Bank card</span>
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              <div className="text-sm text-slate-800 font-medium">Plan</div>
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">
                  {userData?.subscription?.plan}
                </span>
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              <div className="text-sm text-slate-800 font-medium">
                Billing Interval
              </div>
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">
                  {userData?.subscription?.frequency}
                </span>
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              <div className="text-sm text-slate-800 font-medium">
                VAT/GST Number
              </div>
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">-</span>
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              <div className="text-sm text-slate-800 font-medium">
                Your Address
              </div>
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">-</span>
              </div>
            </li>
            <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
              <div className="text-sm text-slate-800 font-medium">
                Billing Address
              </div>
              <div className="text-sm text-slate-800ml-4">
                <span className="mr-3 text-[#475569] ">{userData?.email}</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Invoices */}
        <section>
          <h3 className="text-xl leading-snug text-slate-800 font-bold mb-1">
            Invoices
          </h3>
          {/* Table */}
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400">
              <tr className="flex flex-wrap md:table-row md:flex-no-wrap">
                <th className="w-full block md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Year</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Plan</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="w-full hidden md:w-auto md:table-cell py-2">
                  <div className="font-semibold text-right"></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm">
              {invoices.map((inv) => (
                <tr className="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0">
                  <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                    <div className="text-left font-medium text-slate-800">
                      {inv.created}
                    </div>
                  </td>
                  <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                    <div className="text-left">
                      {inv.lines.data[0].description.split(" ")[2]} Plan -{" "}
                      {inv.lines.data[0].description.split(" ")[4] + "ly"}
                    </div>
                  </td>
                  <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                    <div className="text-left font-medium">
                      {inv.lines.data[0].description.split(" ")[6]}
                    </div>
                  </td>
                  <td className="w-full block md:w-auto md:table-cell py-0.5 md:py-2 text-[#475569]">
                    <div className="text-right flex items-center md:justify-end">
                      <span
                        className="block w-px h-4 bg-slate-200 mx-2"
                        aria-hidden="true"
                      ></span>
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600"
                        href={inv.invoice_pdf}
                        target="_blank"
                      >
                        <BsFillFileEarmarkPdfFill />
                      </a>
                      <a
                        className="font-medium text-indigo-500 hover:text-indigo-600 ml-3"
                        href={inv.hosted_invoice_url}
                        target="_blank"
                      >
                        <FiExternalLink />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default Subscriptions;
