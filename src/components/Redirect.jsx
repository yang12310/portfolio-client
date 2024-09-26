import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

const Redirect = () => {
  const userId = useParams();
  return (
    <Navigate to ={`/profile/${userId.userId}`} />
  )
}

export default Redirect