import PatientContainer from './components/PatientsContainer/PatientsContainer'
import PatientDetailContainer from './components/PatientDetailContainer/PatientDetailContainer'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<PatientContainer/>} />
          <Route path='/Paciente/:pid' element={<PatientDetailContainer/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
