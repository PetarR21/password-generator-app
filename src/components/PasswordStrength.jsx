import React, { useEffect, useState } from 'react'

const PasswordStrength = ({ password, symbolsArray }) => {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    if (password) {
      console.log(calculateStrength())
    }
  }, [password])

  const calculateStrength = () => {
    let score = 0

    if (password.length >= 8 && password.length < 12) {
      score++
    }
    if (password.length >= 12) {
      score += 3
    }

    if (/[a-z]/.test(password)) {
      score++
    }
    if (/[A-Z]/.test(password)) {
      score++
    }
    if (/\d/.test(password)) {
      score++
    }

    if (
      symbolsArray &&
      symbolsArray.length > 0 &&
      symbolsArray.some((sym) => password.includes(sym))
    ) {
      score++
    }

    if (score >= 0 && score <= 2) {
      setStrength(1)
    } else if (score >= 3 && score <= 4) {
      setStrength(2)
    } else if (score >= 5 && score <= 6) {
      setStrength(3)
    } else {
      setStrength(4)
    }
  }

  const strengthText = () => {
    if (strength === 1) {
      return 'VERY WEAK'
    } else if (strength === 2) {
      return 'WEAK'
    } else if (strength === 3) {
      return 'MEDIUM'
    } else if (strength === 4) {
      return 'STRONG'
    } else {
      return ''
    }
  }

  const strengthColor = () => {
    if (strength === 0) {
      return ''
    } else if (strength === 1) {
      return 'bg-red-500'
    } else if (strength === 2) {
      return 'bg-orange-400'
    } else if (strength === 3) {
      return 'bg-yellow-300'
    } else {
      return 'bg-green-200'
    }
  }

  return (
    <div className='flex items-center gap-[1rem]'>
      <div className='text-grey-200 text-[24px]/[32px] font-bold max-sm:text-[18px]/[24px]'>
        {strengthText()}
      </div>
      <div className='flex gap-[8px]'>
        <div
          className={`w-[10px] h-[28px] ${
            strength >= 1 ? '' : 'border-[2px] border-solid border-grey-200'
          } ${strength >= 1 ? strengthColor() : ''} `}
        ></div>
        <div
          className={`w-[10px] h-[28px] ${
            strength >= 2 ? '' : 'border-[2px] border-solid border-grey-200'
          } ${strength >= 2 ? strengthColor() : ''}`}
        ></div>
        <div
          className={`w-[10px] h-[28px] ${
            strength >= 3 ? '' : 'border-[2px] border-solid border-grey-200'
          } ${strength >= 3 ? strengthColor() : ''}`}
        ></div>
        <div
          className={`w-[10px] h-[28px] ${
            strength >= 4 ? '' : 'border-[2px] border-solid border-grey-200'
          } ${strength >= 4 ? strengthColor() : ''}`}
        ></div>
      </div>
    </div>
  )
}

export default PasswordStrength
