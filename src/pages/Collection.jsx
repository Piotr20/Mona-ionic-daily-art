import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  useIonViewWillEnter,
} from "@ionic/react";
import { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import "./Collections.css";
import { ellipsisHorizontalOutline } from "ionicons/icons";
import {
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { collectionsRef } from "../firebase/firebaseInit";
import SheetModal from "../components/SheetModal";

const Collection = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { collectionId } = useParams();
  const [currentCollection, setCurrentCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const getCollection = async () => {
    const docRef = doc(collectionsRef, collectionId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    setCurrentCollection(docSnap.data());
  };

  // const getCollection = async () => {
  //   const querySnapshot = await getDocs(collectionsRef);
  //   const collectionsArray = [];
  //   querySnapshot.forEach((doc) => {
  //     const col = {
  //       id: doc.id,
  //       data: doc.data(),
  //     };
  //     collectionsArray.push(col);
  //   });

  //   const current = collectionsArray.find((col) => col.id === collectionId);
  //   setCurrentCollection(current);
  //   console.log(current);
  // };

  useIonViewWillEnter(() => {
    getCollection();
  });

  const updateCollection = async () => {
    const newDoc = {
      name: newCollectionName,
    };

    const collectionDoc = doc(collectionsRef, collectionId);
    await updateDoc(collectionDoc, newDoc);
    setIsOpen(false);
    window.location.reload();
  };

  const deleteCollection = async () => {
    const collectionDoc = doc(collectionsRef, collectionId);
    await deleteDoc(collectionDoc);
    history.push("/collections");
  };

  // const goBack = () => {
  //   history.push("/collections");
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonTitle>{currentCollection && currentCollection.name}</IonTitle>
          {currentCollection && currentCollection.name !== "Favorites" ? (
            <IonButton
              onClick={() => setShowActionSheet(true)}
              fill="clear"
              color="custom-black"
            >
              <IonIcon icon={ellipsisHorizontalOutline} />
            </IonButton>
          ) : null}
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass="my-custom-class"
            buttons={[
              {
                text: "Edit",
                data: 10,
                handler: () => {
                  setIsOpen(true);
                },
              },
              {
                text: "Delete",
                role: "destructive",
                id: "delete-button",
                data: {
                  type: "delete",
                },
                handler: () => {
                  deleteCollection();
                },
              },
            ]}
          ></IonActionSheet>
          {currentCollection && (
            <SheetModal
              title="Edit collection name"
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              inputValue={newCollectionName}
              setInputValue={setNewCollectionName}
              action={updateCollection}
            />
          )}
        </IonItem>
        <IonItem>
          {/* how to rerender the component after "back" */}
          {/* <IonButton onClick={goBack} fill="clear">Back to collections</IonButton> */}
          {/* <Link to={goBack}>Back to collections</Link> */}
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList></IonList>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
