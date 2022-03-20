import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  useIonLoading,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { usersRef } from "../firebase/firebaseInit";
import { useHistory } from "react-router-dom";

import {
  brushOutline,
  businessOutline,
  cameraOutline,
  hammerOutline,
} from "ionicons/icons";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { Toast } from "@capacitor/toast";
import "../theme/global.css";

import "./Profile.css";

export default function ProfilePage() {
  const history = useHistory();
  const auth = getAuth();
  // const user = auth.currentUser;

  const [user, setUser] = useState({});
  const [usersArray, setUsersArray] = useState([]);

  const [name, setName] = useState("");
  //   const displayName = user.name;
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, dismissLoader] = useIonLoading();

  async function getUserDataFromDB() {
    const q = query(usersRef);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      usersArray.push({ data: doc.data(), docId: doc.id });
    });
    console.log(usersArray);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signed in
        setUser(user);
        console.log(user);
      } else {
        // when user signed out
      }
    });
    // current user from users collection
    // for (const cokolwiek of usersArray) {
    //   if (cokolwiek.uid == user.uid) {
    //     setCurrentUser(cokolwiek);
    //   }
    // }
  }

  useEffect(() => {
    getUserDataFromDB();
  });

  async function handleSignOut() {
    await signOut(auth);
    history.replace("/");
  }

  async function handleSubmit(event) {}

  return (
    <IonPage className="profile-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="page-title">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonHeader className="header">Edit</IonHeader>

        <form onSubmit={handleSubmit} className="profile-form">
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={email}
              type="text"
              placeholder={user?.email}
              onIonChange={(e) => setMail(e.target.value)}
            />

            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={name}
              type="text"
              placeholder={user?.displayName}
              onIonChange={(e) => setName(e.target.value)}
            />

            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              value={password}
              type="password"
              placeholder="Type your password"
              onIonChange={(e) => setPassword(e.target.value)}
            />
          </IonItem>
          <div className="ion-padding">
            <IonButton
              color="custom-orange"
              className="signup-button orange-button"
              type="submit"
              expand="block"
            >
              Save
            </IonButton>
          </div>
        </form>

        <IonHeader className="header">Preferences</IonHeader>

        <form className="profile-form">
          <p>
            If you want to change your daily preferences please follow the
            button.
          </p>
          <div className="ion-padding">
            <IonButton
              color="custom-orange"
              className="signup-button orange-button"
              expand="block"
              onClick={() => history.replace("/preferences")}
            >
              Change preferences
            </IonButton>
          </div>
        </form>

        <div className="ion-padding logout-wrapper">
          <IonButton
            className="logout-button"
            onClick={handleSignOut}
            expand="block"
            color="custom-black"
          >
            <h3>Log out</h3>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
