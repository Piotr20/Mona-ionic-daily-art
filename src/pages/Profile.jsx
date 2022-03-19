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
import { get, update } from "@firebase/database";
import {
  brushOutline,
  businessOutline,
  cameraOutline,
  hammerOutline,
} from "ionicons/icons";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { Toast } from "@capacitor/toast";
import "./Profile.css";
import "../theme/global.css";

export default function ProfilePage() {
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

  function handleSignOut() {
    signOut(auth);
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
              placeholder={user?.name}
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
              className="signup-button"
              type="submit"
              expand="block"
            >
              Save
            </IonButton>
          </div>
        </form>

        <IonHeader className="header">Preferences</IonHeader>

        <form onSubmit={handleSubmit} className="profile-form">
          <IonItem className="preferences-profile">
            <IonIcon icon={brushOutline} slot="start" />
            <IonLabel>Paintings</IonLabel>
            <IonToggle checked />
          </IonItem>

          <IonItem className="preferences-profile">
            <IonIcon icon={hammerOutline} slot="start" />
            <IonLabel>Sculptures</IonLabel>
            <IonToggle checked />
          </IonItem>

          <IonItem className="preferences-profile">
            <IonIcon icon={cameraOutline} slot="start" />
            <IonLabel>Photography</IonLabel>
            <IonToggle checked />
          </IonItem>

          <IonItem>
            <IonIcon icon={businessOutline} slot="start" />
            <IonLabel>Architecture</IonLabel>
            <IonToggle checked />
          </IonItem>
          <div className="ion-padding">
            <IonButton
              color="custom-orange"
              className="signup-button"
              type="submit"
              expand="block"
            >
              Save
            </IonButton>
          </div>
        </form>

        <div className="ion-padding">
          <IonButton
            className="logout-button"
            onClick={handleSignOut}
            expand="block"
          >
            <h3>Log out</h3>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
