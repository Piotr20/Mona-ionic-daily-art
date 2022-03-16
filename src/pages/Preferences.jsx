import { IonContent, IonHeader, IonPage, IonButton, IonImg, IonCard } from "@ionic/react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { hideTabs, showTabs } from "../components/utilities";
import { addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebaseInit";

import "./Preferences.css";

export default function Preferences() {
  const history = useHistory();
  const [user, setUser] = useState("");
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
    hideTabs();
    fetchUserData();
  }, []);

  async function fetchUserData() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //when user signed in
        setUser(user);
        console.log(user);
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
    console.log(usersArray);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(user);
    for (const userDoc of usersArray) {
      if (userDoc.data.uid == user.uid) {
        const userToUpdate = doc(usersRef, userDoc.docId);

        // Set the "capital" field of the city 'DC'
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
    history.replace("/preferences");
  }

  return (
    <IonPage className="posts-page">
      <IonContent fullscreen>
        <IonImg className="login-bg-img" src="assets/Images/Mona-lisa.jpg" />
        <IonCard className="signup-card" color="custom-dark">
          <IonHeader className="preferences-header">Choose your preferences</IonHeader>
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
                    className="card-image"
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
                    className="card-image"
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
                    className="card-image"
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
                    className="card-image"
                    src="assets/Images/preferences/photography.png"
                    ref={photographyRef}
                  />
                </div>
                <h4>Photography</h4>
              </div>
            </div>
            <div className="ion-padding">
              <IonButton color="custom-orange" className="preferences-button" type="submit" expand="block">
                Confirm
              </IonButton>
            </div>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
