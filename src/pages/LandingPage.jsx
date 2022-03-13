import {
  IonContent,
  IonImg,
  IonCard,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./LandingPage.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseInit";
import { hideTabs } from "../App";

const LandingPage = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <IonPage id="login-page">
      <IonContent className="page-content" fullscreen>
        <IonImg className="landing-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="landingpage-card" color="transparent">
          <IonHeader className="landingpage-header">Landing page</IonHeader>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit labore nihil mollitia laudantium
            itaque dicta dolores. Eaque, dolor. Nulla, error!
          </p>
          <div className="ion-padding">
            <IonButton
              color="custom-orange"
              expand="block"
              className="landingpage-button"
              onClick={() => history.replace("/login")}
            >
              Login
            </IonButton>
          </div>
          <div className="ion-text-center">
            <IonButton size="small" fill="clear" onClick={() => history.replace("/signup")}>
              Create an account
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
