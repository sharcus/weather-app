import './App.css';
import {Routes, Route } from "react-router";
import Home from './pages/Home';
import Month from './pages/Month';

export default function App() {
  return (<div className='App'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/m/:month/y/:year" element={<Month />} />
    </Routes>
  </div>);



}

