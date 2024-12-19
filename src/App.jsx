import PatientContainer from './components/PatientsContainer/PatientsContainer'
import PatientDetailContainer from './components/PatientDetailContainer/PatientDetailContainer'
import NewPatientContainer from './components/NewPatientContainer/NewPatientContainer'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PatientContainer/>} />
          <Route path='/Paciente/:pid' element={<PatientDetailContainer/>} />
          {/* <Route path='/NuevoPaciente' element={<NewPatientContainer/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
