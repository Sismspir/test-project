import './App.css'
import './styles/EmployeeHeader.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <div>
        <h2 className='header-style'>Employee Management System</h2>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
