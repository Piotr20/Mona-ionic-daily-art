import {
  IonContent,
  IonImg,
  IonCard,
  IonHeader,
  IonPage,
  IonButton,
} from "@ionic/react";
import "../styles/pages/LandingPage.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilities/firebaseInit";
import { hideTabs } from "../utilities/utilities";

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
          <IonHeader className="landingpage-header">MONA</IonHeader>
          <p className="italic-subtext">
            Discover history of human creativity and add some culture to your
            daily life with MONA app.
          </p>
          <div className="ion-padding">
            <IonButton
              color="custom-orange"
              expand="block"
              className="landingpage-button orange-button"
              onClick={() => history.replace("/login")}
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
              Create an account
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
