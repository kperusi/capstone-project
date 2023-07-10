import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { MyRoutes } from "./components/pages/MyRoutes";
import { UserContext } from "./components/userContext/UserContext";
import { auth } from "./components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate()


 console.log(user)
  return (
    <div className="app">
      <UserContext.Provider value={user}>
       
       <section className="nav-cx">
         <NavBar />
        </section>
        <section className="pages">
          <MyRoutes />
        </section>
        
      </UserContext.Provider>
    </div>
  );
}

export default App;
