import React, { useState } from 'react'
import Intro from './Intro'
import PreLogin from './PreLogin';
import OTP from './OTP';
import Success from './Success';
import ImmediateError from './ImmediateError';

const Login = ({ preLogin, login, onSuccess, onClose, immediate, onImmediateError = () => { } }) => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [immediateLoading, setImmediateLoading] = useState(false)
  const [isImmediateError, setIsImmediateError] = useState(false)

  const handleLoginSuccess = data => {
    if (typeof onSuccess === 'function') onSuccess(data);
    setStep(4);
  }

  const handleLoginDone = () => {
    if (typeof onClose === 'function') onClose();
  }

  const onClickIntro = () => {
    if (!immediate) return setStep(2)

    setImmediateLoading(true)
    preLogin({ phoneNumber: immediate })
      .then((res) => {
        const status = res.statusCode;
        setImmediateLoading(false);

        if (status === 200) {
          onSuccess()
        } else {
          onImmediateError(res.message)
          setIsImmediateError(true)
        }
      })
  }

  if (immediate && isImmediateError) return <ImmediateError />

  if (step === 1) {
    return <Intro onClick={onClickIntro} immediateLoading={immediateLoading} />
  } else if (step === 2) {
    return <PreLogin onSuccess={() => setStep(3)} preLogin={preLogin} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
  } else if (step === 3) {
    return <OTP onSuccess={handleLoginSuccess} login={login} phoneNumber={phoneNumber} />
  } else if (step === 4) {
    return <Success onClick={handleLoginDone} />
  } else {
    return null
  }
}

export default Login;
