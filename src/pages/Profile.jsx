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
  IonImg,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { usersRef } from "../utilities/firebaseInit";
import { useHistory } from "react-router-dom";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { query, getDocs, doc, getDoc } from "firebase/firestore";
import "../styles/global.css";

import "../styles/pages/Profile.css";

export default function ProfilePage() {
  const history = useHistory();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const [paintings, setPaintings] = useState(false);
  const [sculptures, setSculptures] = useState(false);
  const [photography, setPhotography] = useState(false);
  const [architecture, setArchitecture] = useState(false);
  const paintingsRef = useRef(null);
  const sculpturesRef = useRef(null);
  const photographyRef = useRef(null);
  const architectureRef = useRef(null);

  useEffect(() => {
    fetchUserData();
    getUserDataFromDB();
  }, []);

  async function fetchUserData() {
    onAuthStateChanged(auth, (userA) => {
      if (userA) {
        //when user signed ins
        setUser(userA);

        //current user
      } else {
        // when user signed out
        history.replace("/login");
      }
    });

    const querySnapshot = await getDocs(usersRef);

    querySnapshot.forEach(async (doc) => {
      const docData = {
        data: await doc.data(),
        docId: doc.id,
      };

      usersArray.push(docData);
    });
    for (const userPreference of await usersArray) {
      if (userPreference.data.uid === auth.currentUser.uid) {
        if (userPreference?.data.Preferences?.paintings) {
          setPaintings(userPreference?.data.Preferences?.paintings);
        }
        if (userPreference?.data.Preferences?.sculptures) {
          setSculptures(userPreference?.data?.Preferences?.sculptures);
        }
        if (userPreference?.data?.Preferences?.architecture) {
          setArchitecture(userPreference?.data?.Preferences?.architecture);
        }
        if (userPreference?.data?.Preferences?.photography) {
          setPhotography(userPreference?.data?.Preferences?.photography);
        }
      }
    }
    //all docs in users collection
  }

  async function getUserDataFromDB() {
    let userData = null;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signed in
        setUser(user);
      } else {
        // when user signed out
      }
    });
  }

  async function handleSignOut() {
    await signOut(auth);
    history.replace("/");
  }

  async function handleSubmit(event) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    await updateEmail(auth.currentUser, email);
    await updatePassword(auth.currentUser, password);
  }

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
            <IonInput type="text" placeholder={user?.email} onIonChange={(e) => setMail(e.target.value)} />

            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              type="text"
              placeholder={user?.displayName}
              onIonChange={(e) => setName(e.target.value)}
            />

            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
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
          <div className="preferences-wrapper">
            <div className="preference-box">
              <div className="preference-card">
                <IonImg
                  className={`card-image ${paintings ? "activated" : ""}`}
                  src="assets/Images/preferences/paintings.png"
                  ref={paintingsRef}
                />
              </div>
              <h4>Paintings</h4>
            </div>
            <div className="preference-box">
              <div className="preference-card">
                <IonImg
                  className={`card-image ${sculptures ? "activated" : ""}`}
                  src="assets/Images/preferences/sculpture.png"
                  ref={sculpturesRef}
                />
              </div>
              <h4>Sculptures</h4>
            </div>

            <div className="preference-box">
              <div className="preference-card">
                <IonImg
                  className={`card-image ${architecture ? "activated" : ""}`}
                  src="assets/Images/preferences/architecture.png"
                  ref={architectureRef}
                />
              </div>
              <h4>Architecture</h4>
            </div>
            <div className="preference-box">
              <div className="preference-card">
                <IonImg
                  className={`card-image ${photography ? "activated" : ""}`}
                  src="assets/Images/preferences/photography.png"
                  ref={photographyRef}
                />
              </div>
              <h4>Photography</h4>
            </div>
          </div>

          <p className="profile-preferences-text">
            If you want to change your daily preferences please follow the button.
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
          <IonButton className="logout-button" onClick={handleSignOut} expand="block" color="custom-black">
            <h3>Log out</h3>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
