import { PropertyForm } from '../AddPropertyForm/PropertyForm';
import FeaturedProperties from '../FeaturedProperties/FeaturedProperties'
import FilterProperties from '../FilterProperties/FilterProperties';
import FindPropertyByCity from '../FindPropetiesByCity/FindPropertyByCity';
import Footer from '../Footer/Footer';
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
          <><HomePage /><FeaturedProperties /><FindPropertyByCity/><Footer/></>
        )
      },
      {
        path: "home",
        element: (<><HomePage /><FeaturedProperties /><FindPropertyByCity/><Footer/></>
        )
      },
      {
        path: "listings",
        element: (<>{"Not yet Implemented"}</>)
      },
      {
        path: "add-property",
        element: (<><PropertyForm /></>)
      },
      {
        path: "search",
        element: (<><FilterProperties/></>)
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
