import React from 'react'
import SideNav from '../Components/Layout/SideNav'
import TopNav from "../Components/Layout/TopNav"
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div style={{width:"100%"}}>
       <TopNav/>
       <div style={{display:"flex"}}>
       <SideNav/>
       <Outlet/>
       </div>
    </div>
  )
}

export default Layout
