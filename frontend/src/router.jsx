import { createBrowserRouter } from "react-router-dom";
import { Root } from './root.jsx'

import { Index } from "./pages/index.jsx";
import { UserPanel } from "./pages/user.jsx";
import { NewPropiedad } from "./pages/newPropiedad.jsx";
import HousesList from "./componentes/houses/houseList.jsx";





const router = createBrowserRouter([
    {
      path: "/",
      //element: <Root />,
      children: [
        {
          path: "/",
          element: <Root />
        },

        {
          path: "/index",
          element: <Index />
        },

        {
          //path: "/houses",
          //element: <HousesList />,
          //loader: () => fetchHouses()
        },

        {
          //path: "/houses/:id",
          //element: <House />,
          //loader: ({params}) => fetchHouses(params.id)
        },

        {
          //path: "/buscador",
          //element: <Root />
        },

        {
          path: "/user",
          element: <UserPanel />
        },

        {
          path: "/new",
          element: <NewPropiedad />
        }

      ]
    }    
  ]);


export default router;