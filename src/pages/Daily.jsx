import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDocs } from "firebase/firestore";
import { artpiecesRef, usersRef } from "../firebase/firebaseInit";
import "./Daily.css";

const Daily = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const [artpiecesArray, setArtpiecesArray] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [dailyArt, setDailyArt] = useState([]);

  useEffect(() => {
    verifyUserPreferences();
  }, []);

  async function verifyUserPreferences() {
    const auth = getAuth();

    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach(async (doc) => {
      const docData = {
        data: await doc.data(),
        docId: doc.id,
      };

      usersArray.push(docData);
    });
    // console.log(usersArray);
    const awaitedUsersDoc = await usersArray;

    //all docs in users collection
    const querySnapshotArt = await getDocs(artpiecesRef);
    querySnapshotArt.forEach(async (doc) => {
      const docData = {
        data: await doc.data(),
        docId: doc.id,
      };
      artpiecesArray.push(docData);
    });

    for (const userDoc of awaitedUsersDoc) {
      if (userDoc.data.uid === auth.currentUser.uid) {
        getArtpiece(userDoc, await artpiecesArray);
      }
    }
  }
  async function getArtpiece(userDoc, artpiecesArray) {
    console.log(userDoc);
    for (const artwork of artpiecesArray) {
      if (userDoc.data.Preferences.paintings === true && artwork.data.category === "painting") {
        recomendations.push(artwork);
      }
      if (userDoc.data.Preferences.sculptures === true && artwork.data.category === "sculpture") {
        recomendations.push(artwork);
      }
      if (userDoc.data.Preferences.photography === true && artwork.data.category === "photography") {
        recomendations.push(artwork);
      }
      if (userDoc.data.Preferences.architecture === true && artwork.data.category === "architecture") {
        recomendations.push(artwork);
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Daily</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Daily;
