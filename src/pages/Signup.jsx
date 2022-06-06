import {
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonInput,
  IonButton,
  IonImg,
  IonCard,
  IonCheckbox,
  IonToast,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../utilities/firebaseInit";
import "../styles/pages/Signup.css";
import "../styles/global.css";
import { addFavorites } from "./Collections";
import { displayErrorMessage, hideTabs } from "../utilities/utilities";

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [idiotCounter, setIdiotCounter] = useState(0);
  const [error, setError] = useState("");
  const auth = getAuth();

  const history = useHistory();

  useEffect(() => {
    hideTabs();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (checkbox === true) {
      createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          user.auth.currentUser.displayName = name;
          try {
            const docRef = addDoc(usersRef, {
              uid: user.uid,
              createdAt: user.metadata.createdAt,
              creationTime: user.metadata.creationTime,
              email: mail,
              name: name,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          addFavorites(user.uid);
          history.replace("/preferences");
        })
        .catch((error) => {
          console.log(error);
          setError(displayErrorMessage(error.code));
        });
    } else {
      setIdiotCounter(idiotCounter + 1);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  }

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="signup-card" color="custom-dark">
          <IonHeader className="login-header">Sign up</IonHeader>
          <form className="signup-form" onSubmit={handleSubmit}>
            <IonItem color="custom-dark" className="signup-item">
              <IonInput
                value={name}
                type="name"
                placeholder="Name"
                onIonChange={(e) => setName(e.target.value)}
              />
            </IonItem>
            <IonItem color="custom-dark" className="signup-item">
              <IonInput
                value={mail}
                type="text"
                placeholder="Email"
                onIonChange={(e) => setMail(e.target.value)}
              />
            </IonItem>

            <IonItem color="custom-dark" className="signup-item">
              <IonInput
                value={password}
                type="password"
                placeholder="Password"
                onIonChange={(e) => setPassword(e.target.value)}
              />
            </IonItem>
            <p className="signup-checkbox-wrapper">
              <IonCheckbox
                value={checkbox}
                className="signup-checkbox"
                color="light"
                onIonChange={(e) => setCheckbox(e.target.checked)}
              />
              I accept Terms & Conditions
            </p>
            <p>{error}</p>
            <div className="ion-padding">
              <IonButton
                color="custom-orange"
                className="signup-button orange-button"
                type="submit"
                expand="block"
              >
                Sign up
              </IonButton>
            </div>
            <div className="ion-text-center">
              <IonButton
                size="small"
                color="custom-light"
                fill="clear"
                onClick={() => history.replace("/login")}
              >
                Go back to sign in
              </IonButton>
            </div>
          </form>
        </IonCard>
        <IonToast
          isOpen={showToast}
          message="You need to agree to the Terms & Conditions"
          duration={1000}
        />
      </IonContent>
    </IonPage>
  );
}
