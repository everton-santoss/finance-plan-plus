import './App.css'
import MyIcon from './assets/logo-1.svg'
import Results from './components/Results'
function App() {

  return (
    <>
      <div className='container'>
        <div className='container2'>
          <img src={MyIcon} alt="Descrição do ícone" width="100" height="100" />

          <Results />

        </div>
      </div>
    </>
  )
}

export default App
