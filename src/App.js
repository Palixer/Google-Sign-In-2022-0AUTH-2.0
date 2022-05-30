import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/ <------ ESTE COMENTARIO ES ESENCIAL DADO QUE, SI NO ESTA, ESLINT DA ERROR!!!
    google.accounts.id.initialize({
      client_id:
        "<Your client ID>", <----VISITAR EL SITIO DE GOOGLE IDENTITY SERVICES.
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  //Si no hay usuario: Mostrar botón de SignIn.
  //Si hay usuario: Mostrar botón de LogOut.

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Cerrar Sesión</button>
      )}
      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
