import Header from './components/Header'
import PasswordGenerator from './components/PasswordGenerator'

const App = () => {
  return (
    <div className='text-white font-primary flex flex-col gap-8  mx-auto text-center w-[540px] max-sm:w-[343px] '>
      <Header />
      <PasswordGenerator />
    </div>
  )
}

export default App
