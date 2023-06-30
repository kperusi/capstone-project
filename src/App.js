import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { MyRoutes } from "./components/pages/MyRoutes";
import { UserContext } from "./components/userContext/UserContext";
import { auth } from "./components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  if (user) {
    // console.log(user.displayName || user.email);
    localStorage.setItem("user", JSON.stringify(user));
  }
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
