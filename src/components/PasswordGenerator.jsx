import { useState } from 'react'
import Include from './Include'
import PasswordStrength from './PasswordStrength'

const symbolsArray = [
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '=',
  '+',
]

const PasswordGenerator = () => {
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState()
  const [charLength, setCharLength] = useState(0)
  const [uppercaseChecked, setUppercaseChecked] = useState(false)
  const [lowercaseChecked, setLowercaseChecked] = useState(false)
  const [numbersChecked, setNumbersChecked] = useState(false)
  const [symbolsChecked, setSymbolsChecked] = useState(false)
  const [checkedArray, setCheckedArray] = useState([])

  const onRangeChange = ({ target }) => {
    const value = target.value
    const max = target.max

    setCharLength(target.value)
    const progress = (value / max) * 100

    target.style.background = `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`
  }

  const generateMouseEnter = ({ target }) => {
    const isSmallScreen = window.innerWidth <= 640
    if (isSmallScreen) {
      return
    }

    const button = target
    button.style.backgroundColor = '#24232c'
    button.style.outline = '2px solid #a4ffaf'

    const generateDiv = button.children[0].children[0]
    const arrowIcon = button.children[0].children[1]

    generateDiv.style.color = '#a4ffaf'
    arrowIcon.style.background = '#a4ffaf'
  }

  const generateMouseLeave = ({ target }) => {
    const isSmallScreen = window.innerWidth <= 640
    if (isSmallScreen) {
      return
    }

    const button = target
    button.style.backgroundColor = '#a4ffaf'
    button.style.outline = 'none'

    const generateDiv = button.children[0].children[0]
    const arrowIcon = button.children[0].children[1]

    generateDiv.style.color = '#24232c'
    arrowIcon.style.background = '#24232c'
  }

  const getRandomUppercaseLetter = () => {
    const uppercaseLetters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ]

    return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]
  }

  const getRandomLowercaseLetter = () => {
    const lowercaseLetters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ]

    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]
  }

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 10).toString()
  }

  const getRandomSymbol = () => {
    return symbolsArray[Math.floor(Math.random() * symbolsArray.length)]
  }

  const generatePassword = () => {
    if (charLength === 0 || checkedArray.length === 0) {
      return
    }
    setCopied(false)
    let generatedPassword = ''

    if (charLength >= 4) {
      const shuffled = [...checkedArray].sort(() => Math.random() - 0.5)
      for (let i = 0; i < shuffled.length; i++) {
        if (shuffled[i] === 'lowercase') {
          generatedPassword += getRandomLowercaseLetter()
        } else if (shuffled[i] === 'uppercase') {
          generatedPassword += getRandomUppercaseLetter()
        } else if (shuffled[i] === 'numbers') {
          generatedPassword += getRandomNumber()
        } else {
          generatedPassword += getRandomSymbol()
        }
      }
      for (let i = shuffled.length; i < charLength; i++) {
        const randomType =
          checkedArray[Math.floor(Math.random() * checkedArray.length)]

        if (randomType === 'lowercase') {
          generatedPassword += getRandomLowercaseLetter()
        } else if (randomType === 'uppercase') {
          generatedPassword += getRandomUppercaseLetter()
        } else if (randomType === 'numbers') {
          generatedPassword += getRandomNumber()
        } else {
          generatedPassword += getRandomSymbol()
        }
      }
    } else {
      for (let i = 0; i < charLength; i++) {
        const randomType =
          checkedArray[Math.floor(Math.random() * checkedArray.length)]

        if (randomType === 'lowercase') {
          generatedPassword += getRandomLowercaseLetter()
        } else if (randomType === 'uppercase') {
          generatedPassword += getRandomUppercaseLetter()
        } else if (randomType === 'numbers') {
          generatedPassword += getRandomNumber()
        } else {
          generatedPassword += getRandomSymbol()
        }
      }
    }

    setPassword(generatedPassword)
  }

  return (
    <main>
      <div
        className={`bg-grey-800 flex items-center justify-between px-8 py-4  ${
          password.length > 13 ? 'max-sm:flex-col max-sm:gap-[1rem]' : ''
        } max-sm:p-[16px]`}
      >
        {password ? (
          <div className='text-grey-200 text-[32px] max-sm:text-[24px]/[32px]'>
            {password}
          </div>
        ) : (
          <div className='text-grey-700 text-[32px] max-sm:text-[24px]/[32px]'>
            P4$5W0rD!
          </div>
        )}

        <div className={`flex items-center gap-[1rem] max-sm:gap-[0.5rem]`}>
          <div
            className={`text-[18px]/[24px] text-green-200 font-bold ${
              copied ? '' : 'hidden'
            } max-sm:text-[16px]/[20px] max-sm:mt-[2px]`}
          >
            COPIED
          </div>
          <button
            className={`${password ? 'cursor-pointer' : 'cursor-not-allowed'}
           
            `}
            onClick={() => {
              navigator.clipboard.writeText(password)
              setCopied(true)
            }}
            disabled={`${password}` ? false : true}
          >
            <div className='copy-icon '></div>
          </button>
        </div>
      </div>
      <div className='bg-grey-800 mt-6 px-8 py-6 max-sm:p-[1rem]'>
        <div className='w-full flex items-center justify-between'>
          <div className='text-lg/[24px] text-grey-200 font-bold max-sm:text-[16px]/[20px]'>
            Character Length
          </div>
          <div className='text-[32px]/[42px] text-green-200 font-bold max-sm:text-[24px]/[32px]'>
            {charLength}
          </div>
        </div>
        <div className='mt-4'>
          <input
            type='range'
            min='0'
            max='18'
            value={charLength}
            onChange={onRangeChange}
          />
        </div>
        <div className='my-[32px] grid gap-[1rem]'>
          <Include
            label={'Include Uppercase Letters'}
            value={'uppercase'}
            checked={uppercaseChecked}
            setChecked={setUppercaseChecked}
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
          />
          <Include
            label={'Include Lowercase Letters'}
            value={'lowercase'}
            checked={lowercaseChecked}
            setChecked={setLowercaseChecked}
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
          />
          <Include
            label={'Include Numbers'}
            value={'numbers'}
            checked={numbersChecked}
            setChecked={setNumbersChecked}
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
          />
          <Include
            label={'Include Symbols'}
            value={'symbols'}
            checked={symbolsChecked}
            setChecked={setSymbolsChecked}
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
          />
        </div>
        <div className='w-full flex justify-between bg-grey-850 px-[32px] py-[24px] max-sm:p-[1rem]'>
          <div className='flex items-center text-grey-600 text-[18px]/[24px] max-sm:text-[16px]/[20px]'>
            STRENGTH
          </div>
          <PasswordStrength password={password} symbolsArray={symbolsArray} />
        </div>
        <button
          onClick={generatePassword}
          onMouseEnter={generateMouseEnter}
          onMouseLeave={generateMouseLeave}
          className='mt-[32px] mb-[12px] w-full bg-green-200 text-grey-800 py-[24px] px-[176px] cursor-pointer max-sm:py-[16px] max-sm:px-[104px]'
        >
          <div className='flex justify-center items-center gap-[24px] pointer-events-none max-sm:gap-[16px]'>
            <div className='text-[18px]/[24px] font-bold max-sm:text-[16px]/[20px]'>
              GENERATE
            </div>
            <div className='arrow-icon'></div>
          </div>
        </button>
      </div>
    </main>
  )
}

export default PasswordGenerator
