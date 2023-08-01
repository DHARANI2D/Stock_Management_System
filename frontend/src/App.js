import { React } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from '../src/components/Pages/landinpage';
import Login from './components/Login/login';
import Analysis from './components/Pages/Analysis';
import Bill from './components/Pages/Bill';
import Expenses from './components/Pages/Expenses';
import GeneralLedger from './components/Pages/GeneralLedger';
import Inventory from './components/Pages/Inventory';
import Payroll from './components/Pages/Payroll';
import Settings from './components/Pages/Settings';
import Tax from './components/Pages/Tax';
import Users from './components/Pages/Users';
import Register from './components/Sigin/Signin';

const App = () => {
  
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/GeneralLedger' element={<GeneralLedger />}/>
        <Route path='/Users' element={<Users />}/>
        <Route path='/Expenses' element={<Expenses />}/>
        <Route path='/Analysis' element={<Analysis />}/>
        <Route path='/Bill' element={<Bill />}/>
        <Route path='/Inventory' element={<Inventory />}/>
        <Route path='/Payroll' element={<Payroll />}/>
        <Route path='/Tax' element={<Tax />}/>
        <Route path='/Settings' element={<Settings />}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App