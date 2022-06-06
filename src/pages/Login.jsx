import {
  IonContent,
  IonImg,
  IonCard,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import "../styles/pages/Login.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilities/firebaseInit";
import {
  displayErrorMessage,
  hideTabs,
  showTabs,
} from "../utilities/utilities";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    hideTabs();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        showTabs();
        history.replace("/daily");
      })
      .catch((error) => {
        console.log(error);
        setError(displayErrorMessage(error.code));
      });
  }

  return (
    <IonPage id="login-page">
      <IonContent className="page-content" fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="login-card" color="custom-dark">
          <IonHeader className="login-header">Welcome back</IonHeader>
          <form className="login-form" onSubmit={handleSubmit}>
            <IonItem color="custom-dark" className="login-item">
              <IonInput
                value={mail}
                type="text"
                placeholder="Type your mail"
                onIonChange={(e) => setMail(e.target.value)}
              />
            </IonItem>
            <IonItem color="custom-dark" className="login-item">
              <IonInput
                value={password}
                type="password"
                placeholder="Type your password"
                onIonChange={(e) => setPassword(e.target.value)}
              />
            </IonItem>
            <p>{error}</p>
            <div className="ion-padding">
              <input type="submit" className="submit-enter" />
              <IonButton
                color="custom-orange"
                expand="block"
                className="login-button orange-button"
                type="submit"
              >
                Login
              </IonButton>
            </div>
            <div className="ion-text-center">
              <IonButton
                size="small"
                fill="clear"
                color="custom-light"
                onClick={() => history.replace("/signup")}
              >
                Not a member?&nbsp;
                <span className="create-account-text">Create an account</span>
              </IonButton>
            </div>
          </form>{" "}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
