import PatientContainer from './components/PatientsContainer/PatientsContainer'
import PatientDetailContainer from './components/PatientDetailContainer/PatientDetailContainer'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'

function App() {


  return (
    <>
      {/* <BrowserRouter> */}
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<PatientContainer/>} />
          <Route path='/Paciente/:pid' element={<PatientDetailContainer/>} />
        </Routes>
      </HashRouter>
      {/* </BrowserRouter> */}
    </>
  )
}

export default App
