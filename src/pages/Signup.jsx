import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonImg,
  IonCard,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { auth, app } from "../firebase/firebaseInit";
import { hideTabs } from "../components/utilities";
import "./Signup.css";

export default function SignUpPage() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    hideTabs();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        user.auth.currentUser.displayName = name;
        console.log(user);
        history.replace("/daily");
      })
      .catch((error) => {
        console.log(error);
      });
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
                type="email"
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
            <div className="ion-padding">
              <IonButton color="custom-orange" className="signup-button" type="submit" expand="block">
                Sign up
              </IonButton>
            </div>
            <div className="ion-text-center">
              <IonButton size="small" fill="clear" onClick={() => history.replace("/login")}>
                Go back to sign in
              </IonButton>
            </div>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
