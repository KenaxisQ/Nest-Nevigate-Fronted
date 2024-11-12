import FeaturedProperties from '../FeaturedProperties/FeaturedProperties'
import HomePage from '../Home/Home'
import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
export default function Landing() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Outlet />
        </>
      ),
      children: [{
        index: true,
        element: (
          <><HomePage /><FeaturedProperties /></>
        )
      },
      {
        path: "home",
        element: (<><HomePage /><FeaturedProperties /></>
        )
      },
      {
        path: "listings",
        element: (<>{"Not yet Implemented"}</>)
      }
      ]

    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <HomePage/>
    <FeaturedProperties/>
    <h1>Hi</h1>
    <PropertyForm /> */}
    </>
  )
}
