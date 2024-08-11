import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './layout/root.layout'
import HomePage from './pages/home/home.page'
import SignInPage from './pages/sign-in/sign-in.page'
import SignUpPage from './pages/sign-up/sign-up.page'
import MainLayout from './layout/main.layout'
import JobPage from './pages/job/job.page'
import { ClerkProvider } from '@clerk/clerk-react';
import AdminMainLayout from './layout/admin.layout'
import AdminJobPostPage from './pages/admin/jobPosts/admin-job-posts.page'
import JobCreatePage from './pages/admin/createJob/job-create-page'
import AdminJobPage from './pages/admin/job/admin-job.page'
import AdminJobApplicationPage from './pages/admin/jobApplication/admin-job-application.page'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

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
        },
        {
          path:"job/:id",
          element: <JobPage/>,
        },
      ],
    },
    {
      path:"admin",
      element:<AdminMainLayout/>,
      children:[
        {
          path:"jobs",
          element:<AdminJobPostPage/>
        },
        {
          path:"job/create",
          element:<JobCreatePage/>,
        },
        {
          path:"job/:id",
          element:<AdminJobPage/>,
        },
        {
          path:"job/:id/application/:applicationId",
          element:<AdminJobApplicationPage/>
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
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
