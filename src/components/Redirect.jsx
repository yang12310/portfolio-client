import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

const Redirect = () => {
  const userId = useParams();
  console.log(userId)
  return (
    <Navigate to ={`/profile/${userId.userId}`} />
  )
}

export default Redirect