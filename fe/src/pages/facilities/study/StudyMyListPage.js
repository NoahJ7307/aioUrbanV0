import React from 'react'
import StudyMyList from '../../../components/facilities/study/StudyMyList'
import { Outlet } from 'react-router-dom'

const StudyMyListPage = () => {
  return (
    <>
    <StudyMyList />
    <Outlet/>
</>
  )
}

export default StudyMyListPage