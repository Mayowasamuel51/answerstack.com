import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import ShowPortfollo from "./pages/ShowPortfollo";
import FormPage from "./pages/FormPage";
import AllQ, { questionLoader } from "./pages/AllQ";
import CreateAnswer from "./components/CreateAnswer";
import { Search } from "@mui/icons-material";



axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = "multipart/form-data";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true; // generate




const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element:<ShowPortfollo/>
      },
      {
        path: '/form',
        element:<FormPage/>
      },
      {
        path: '/s',
        element:<Search/>
      }
      ,
      {
        path: "/allquestions",
        element: <AllQ />,
        loader: questionLoader
      },
      {
        path: "createanswer/:question/:problem_title/:id",
        element: <CreateAnswer />,
      },
    ]
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
