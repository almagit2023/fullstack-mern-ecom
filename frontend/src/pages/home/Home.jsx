import React from 'react'
import DisplayRecords from '../../components/displayRecords/DisplayRecords'
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <div>
      <DisplayRecords/>
      <ToastContainer />
    </div>
  )
}
