import React from 'react'
import { Navigate, useParams } from 'react-router-dom';

const Temp = () => {
  const userId = useParams();
  console.log(userId);
  return (
    <Navigate to ={`/profile/${userId.userId}`} />
  )
}

export default Temp