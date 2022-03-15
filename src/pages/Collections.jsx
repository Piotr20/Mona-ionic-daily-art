import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  useIonViewWillEnter,
} from "@ionic/react";
import { addDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { collectionsRef } from "../firebase/firebaseInit";
import "./Collections.css";

const Collections = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collections, setCollections] = useState();

  useIonViewWillEnter(() => {
    getCollections();
  });

  const getCollections = async () => {
    const querySnapshot = await getDocs(collectionsRef);
    const collectionsArray = [];
    querySnapshot.forEach((doc) => {
      const collection = {
        id: doc.id,
        data: doc.data(),
      };
      if (collection.data.name === "Favorites") {
        collectionsArray.unshift(collection);
      } else {
        collectionsArray.push(collection);
      }
    });
    setCollections(collectionsArray);
  };

  const addNewCollection = async () => {
    const newDoc = await addDoc(collectionsRef, {
      name: newCollectionName,
      cover_img: null,
      uid: 1,
    });
    history.push(`/collections/${newDoc.id}`);
    setIsOpen(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonTitle>Collections</IonTitle>
          <IonButton onClick={() => setIsOpen(true)}>+</IonButton>
          <IonModal
            isOpen={isOpen}
            breakpoints={[0, 0.5, 1]}
            initialBreakpoint={0.5}
            onDidDismiss={() => setIsOpen(false)}
          >
            <IonContent>
              <IonTitle>Add a new collection</IonTitle>
              <IonItem>
                <IonInput
                  value={newCollectionName}
                  placeholder="Enter new collection name"
                  onIonChange={(e) => setNewCollectionName(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonButton onClick={addNewCollection}>Save</IonButton>
            </IonContent>
          </IonModal>
        </IonItem>
      </IonHeader>
      <IonContent>
        <div className="collections-grid">
          {collections &&
            collections.map((collection) => {
              return (
                <Link to={`/collections/${collection.id}`} key={collection.id}>
                  <IonImg src="https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2018-07-10_at_12.24.43_PM.png?v=1531239937" />
                  <IonLabel>{collection.data.name}</IonLabel>
                </Link>
              );
            })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Collections;
