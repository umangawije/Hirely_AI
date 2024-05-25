import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './layout/root.layout'
import HomePage from './pages/home/home.page'
import SignInPage from './pages/sign-in.page'
import SignUpPage from './pages/sign-up.page'
import MainLayout from './layout/main.layout'
import path from 'path'

const router = createBrowserRouter([
  {
   element: <RootLayout/>,
   children:[
    {
      path:"/",
      element: <MainLayout/>,
      children:[
      {
        path:"home",
        element:<HomePage/>
      }
    ]
    },
    {
      path:"/sign-in",
      element: <SignInPage/>
    },
    {
      path:"/sign-up",
      element: <SignUpPage/>
    }
   ] 
    
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
