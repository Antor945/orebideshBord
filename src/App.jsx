import Home from "./components/Home"
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Error from "./components/Error";
import AllProducts from "./components/allProduct/AllProducts";
import AddProduct from "./components/addProduct/AddProduct";
import Allcategory from "./components/AllCategory/Allcategory"
import AddCategory from "./components/addCategory/AddCategory";
import AllSubCategory from "./components/allSubCategory/AllSubCategory";
import AddSubCategory from "./components/addSubCategory/AddSubCategory";
import Registration from "./components/registration/Registration";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={<Home />}
      >
        <Route path="/registration" element={<Registration />} />
        <Route path="/Allproduct" element={<AllProducts />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/AllCategory" element={<Allcategory/>} />
        <Route path="/addCategory" element={<AddCategory/>} />
        <Route path="/allsubcategory" element={<AllSubCategory/>} />
        <Route path="/addSubCategory" element={<AddSubCategory/>} />
        <Route path="*" element={<Error/>} />
      </Route>

    </Route>

  )
);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
