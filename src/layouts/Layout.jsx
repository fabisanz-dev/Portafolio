import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../componentes/Sidebar'
const Layout = () => {
  return (
    <>
      <div className='md:flex md:min-h-screen md:w-3/4 border border-blue-pastel-100 bg-slate-100'>
        <Sidebar />
        <main className='flex-1 p-5'>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
