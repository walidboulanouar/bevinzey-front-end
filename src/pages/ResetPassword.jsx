import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import { setCode, settEmail } from '../redux/auth';
import { clearMessage, setMessage } from '../redux/message';

function ResetPassword() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [visible, setIsVisible] = useState(false)
  function handelChange(e) {
    setEmail(e.target.value)
  }

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearMessage())
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsVisible(true)

    await axios.post(
      'https://plankton-app-q74hx.ondigitalocean.app/auth/SendEmail',
      {
        email: email,
      }
    ).then((res) => {
      dispatch(setCode(res.data))
      dispatch(settEmail(email))
      navigate("/otp")
    }).catch((error) => {
      dispatch(setMessage((error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()))
    })
    setIsVisible(false)

  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-slate-800">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Forgot your password?</h1>
                <p className="text-xl text-gray-400">We'll email you instructions on how to reset it.</p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={onSubmit} >
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" onChange={handelChange} value={email} name="email"
                        className="form-input w-full text-gray-300"
                        placeholder="you@yourcompany.com"
                        required />
                    </div>
                  </div>
                  <p className="mt-8 mx-3 text-xs font-bold text-center text-gray-700">
                    {message && (
                      <div
                        className="text-red-500"
                        role="alert"
                      >
                        {message}
                      </div>
                    )}
                  </p>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button type="submit" className="btn text-white bg-orange-600 hover:bg-orange-700 w-full">Verify Email</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  <Link to="/signin" className="text-orange-600 hover:text-gray-200 transition duration-150 ease-in-out">Cancel</Link>
                </div>
              </div>

            </div>
          </div>
          {visible &&
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <ColorRing visible={true}
                height="100"
                width="100"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /></div>
          }
        </section>

      </main>

    </div>
  );
}

export default ResetPassword;