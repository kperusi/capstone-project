import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { MyRoutes } from "./components/pages/MyRoutes";
import { UserContext } from "./components/userContext/UserContext";
import { auth } from "./components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function App() {
  const [user] = useAuthState(auth);

  useEffect(()=>{
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },[user])
 
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <NavBar />
        <MyRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
