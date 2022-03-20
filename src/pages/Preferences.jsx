import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonImg,
  IonCard,
} from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { hideTabs, showTabs } from "../utilities/utilities";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { usersRef } from "../utilities/firebaseInit";
import "../styles/pages/Preferences.css";

export default function Preferences() {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const [usersArray, setUsersArray] = useState([]);
  const [paintings, setPaintings] = useState(false);
  const [sculptures, setSculptures] = useState(false);
  const [photography, setPhotography] = useState(false);
  const [architecture, setArchitecture] = useState(false);
  const paintingsRef = useRef(null);
  const sculpturesRef = useRef(null);
  const photographyRef = useRef(null);
  const architectureRef = useRef(null);
  const auth = getAuth();
  useEffect(() => {
    hideTabs();
    fetchUserData();
    setUser(auth.currentUser);
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
        if (userPreference.data.Preferences.paintings) {
          setPaintings(userPreference.data.Preferences.paintings);
          console.log("Paintings preference updated", paintings);
        }
        if (userPreference.data.Preferences.sculptures) {
          setSculptures(userPreference.data.Preferences.sculptures);
          console.log("Sculptures preference updated", sculptures);
        }
        if (userPreference.data.Preferences.architecture) {
          setArchitecture(userPreference.data.Preferences.architecture);
          console.log("Architecture preference updated", architecture);
        }
        if (userPreference.data.Preferences.photography) {
          setPhotography(userPreference.data.Preferences.photography);
          console.log("Photography preference updated", photography);
        }
      }
    }
    //all docs in users collection
  }

  async function handleSubmit(e) {
    e.preventDefault();

    for (const userDoc of usersArray) {
      if (userDoc.data.uid == user.uid) {
        const userToUpdate = doc(usersRef, userDoc.docId);

        // Set the "preferences" objec of the current user
        await updateDoc(userToUpdate, {
          Preferences: {
            paintings: paintings,
            sculptures: sculptures,
            photography: photography,
            architecture: architecture,
          },
        });
      }
    }
    showTabs();
    history.replace("/daily");
  }

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="signup-card" color="custom-dark">
          <IonHeader className="preferences-header">
            Choose your preferences
          </IonHeader>
          <form className="preferences-form" onSubmit={handleSubmit}>
            <div className="preferences-wrapper">
              <div
                className="preference-box"
                onClick={() => {
                  setPaintings(!paintings);
                  paintingsRef.current.classList.toggle("activated");
                }}
              >
                <div className="preference-card">
                  <IonImg
                    className={`card-image ${paintings ? "activated" : ""}`}
                    src="assets/Images/preferences/paintings.png"
                    ref={paintingsRef}
                  />
                </div>
                <h4>Paintings</h4>
              </div>
              <div
                className="preference-box"
                onClick={() => {
                  setSculptures(!sculptures);
                  sculpturesRef.current.classList.toggle("activated");
                }}
              >
                <div className="preference-card">
                  <IonImg
                    className={`card-image ${sculptures ? "activated" : ""}`}
                    src="assets/Images/preferences/sculpture.png"
                    ref={sculpturesRef}
                  />
                </div>
                <h4>Sculptures</h4>
              </div>

              <div
                className="preference-box"
                onClick={() => {
                  setArchitecture(!architecture);
                  architectureRef.current.classList.toggle("activated");
                }}
              >
                <div className="preference-card">
                  <IonImg
                    className={`card-image ${architecture ? "activated" : ""}`}
                    src="assets/Images/preferences/architecture.png"
                    ref={architectureRef}
                  />
                </div>
                <h4>Architecture</h4>
              </div>
              <div
                className="preference-box"
                onClick={() => {
                  setPhotography(!photography);
                  photographyRef.current.classList.toggle("activated");
                }}
              >
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
            <div className="ion-padding">
              <IonButton
                color="custom-orange"
                className="preferences-button"
                type="submit"
                expand="block"
              >
                Confirm
              </IonButton>
            </div>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
