import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy } from "react"
import GettingStarted from "./core/public/gettingstarted.jsx";


// import Login from "./core/public/login"
// const Login =lazy(()=>import("./core/public/login"))



// import Layout from "./core/private/layout"
const Layout =lazy(()=>import("./core/private/layout"))



function App() {


  const publicRoutes=[
    // {path:"/",element:<Login/>},
    {path:"/",element:<GettingStarted/>},
    {path:"*",element:<>unauthorized</>}
  ]

  const privateRoutes=[
    {path:"/admin",element:<Layout/>},
    {path:"*",element:<>Page not found</>}
  ]

  // LOGIN logic TODO
  const isAdmin=false;
  const routes=isAdmin?privateRoutes:publicRoutes
  return (
      <>
        <RouterProvider router={createBrowserRouter(routes)}/>
      </>
  )
}

export default App
