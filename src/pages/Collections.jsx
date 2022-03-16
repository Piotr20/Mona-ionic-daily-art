import { getAuth } from "@firebase/auth";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { collectionsRef } from "../firebase/firebaseInit";
import "./Collections.css";
import SheetModal from "../components/SheetModal";
import placeholder from "../assets/img-placeholder.png";

const Collections = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [collections, setCollections] = useState();
  const auth = getAuth();

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
      if (auth.currentUser.uid === collection.data.uid) {
        if (collection.data.name === "Favorites") {
          collectionsArray.unshift(collection);
        } else {
          collectionsArray.push(collection);
        }
      }
    });
    setCollections(collectionsArray);
  };

  const addNewCollection = async () => {
    const newDoc = await addDoc(collectionsRef, {
      name: newCollectionName,
      cover_img: null,
      uid: auth.currentUser.uid,
    });
    history.push(`/collections/${newDoc.id}`);
    setIsOpen(false);
  };

  return (
    <IonPage className="collections">
      <IonHeader>
        <IonItem>
          <IonTitle>Collections</IonTitle>
          <IonButton
            onClick={() => setIsOpen(true)}
            className="add-btn"
            color="custom-orange"
          >
            +
          </IonButton>
          {/* Add a new collection - modal */}
          <SheetModal
            title="Add a new collection"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            inputValue={newCollectionName}
            setInputValue={setNewCollectionName}
            action={addNewCollection}
          />
        </IonItem>
      </IonHeader>
      <IonContent>
        <div className="collections-grid">
          {collections &&
            collections.map((collection) => {
              return (
                <Link to={`/collections/${collection.id}`} key={collection.id}>
                  <IonImg
                    className="collection-img"
                    alt="coverimage"
                    src={placeholder}
                  />
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

// add a Favorites collection after signup
export const addFavorites = async (uid) => {
  await addDoc(collectionsRef, {
    name: "Favorites",
    cover_img: null,
    uid: uid,
  });
};
