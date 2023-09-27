import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import BusinessList from "./pages/businessList/BusinessList";
import Business from "./pages/business/Business";
import NewBusiness from "./pages/newBusiness/NewBusiness";


function App() {
  const {currentUser } = useSelector(
    (state) => state.userSlice
  );

  console.log(currentUser)

 
  return (
    <>
    <BrowserRouter>
    {currentUser ? ( 
    <>
    <Topbar />
          <div className="container">
          <Sidebar />
          <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route path="/newUser" element={<NewUser />}></Route>
          <Route path="/businesses" element={<BusinessList />}></Route>
          <Route path="/business/:businessId" element={<Business />}></Route>
          <Route path="/newbusiness" element={<NewBusiness />}></Route>
        </Routes>
        </div>
    </>
    ) : (
      <Login />
    )
    }
          
  </BrowserRouter>
  </>
  );
}

export default App;
