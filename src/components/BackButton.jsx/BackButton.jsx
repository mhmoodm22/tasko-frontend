import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton() {
    const navigate = useNavigate();
  return (
    <button className='py-3 px-[53px] font-semibold rounded-[8px] bg-primaryColor text-headingColor text-base' onClick={() => navigate(-1)}>
        Back
    </button>
  )
}
