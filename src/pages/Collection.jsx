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

const Collection = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { collectionId } = useParams();
  const [currentCollection, setCurrentCollection] = useState();
  const [newCollectionName, setNewCollectionName] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  // const getCollection = async () => {
  //   const q = query(collectionsRef, where(documentId(), "==", collectionId));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((snap) => {
  //     setCurrentCollection(snap.data());
  //     console.log(snap.data());
  //   });
  //   // const unsub = onSnapshot(doc(collectionsRef, collectionId), (doc) => {
  //   //   // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //   //   console.log(doc.data());
  //   //   setCurrentCollection(doc.data());
  //   // });
  // };

  const getCollection = async () => {
    const querySnapshot = await getDocs(collectionsRef);
    const collectionsArray = [];
    querySnapshot.forEach((doc) => {
      const col = {
        id: doc.id,
        data: doc.data(),
      };
      collectionsArray.push(col);
    });

    const current = collectionsArray.find((col) => col.id === collectionId);
    setCurrentCollection(current);
    console.log(current);
  };

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
          <IonTitle>
            {currentCollection && currentCollection.data.name}
          </IonTitle>
          {currentCollection && currentCollection.data.name !== "Favorites" ? (
            <IonButton onClick={() => setShowActionSheet(true)} fill="clear">
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
            <IonModal
              isOpen={isOpen}
              breakpoints={[0, 0.5, 1]}
              initialBreakpoint={0.5}
              onDidDismiss={() => setIsOpen(false)}
            >
              <IonContent>
                <IonTitle>Edit collection name</IonTitle>
                <IonItem>
                  <IonInput
                    value={newCollectionName}
                    onIonChange={(e) => setNewCollectionName(e.detail.value)}
                  ></IonInput>
                </IonItem>
                <IonButton onClick={updateCollection}>Save</IonButton>
              </IonContent>
            </IonModal>
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
