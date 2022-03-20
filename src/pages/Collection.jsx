import {
  IonActionSheet,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
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
import {
  artInCollectionsRef,
  artpiecesRef,
  collectionsRef,
} from "../firebase/firebaseInit";
import SheetModal from "../components/SheetModal";

const Collection = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { collectionId } = useParams();
  const [currentCollection, setCurrentCollection] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [artPieces, setArtPieces] = useState([]);
  const history = useHistory();

  const getCollection = async () => {
    const docRef = doc(collectionsRef, collectionId);
    const docSnap = await getDoc(docRef);
    setCurrentCollection(docSnap.data());
  };

  const getArtPieces = async () => {
    const querySnapshotId = await getDocs(artInCollectionsRef);
    const artPiecesArray = [];
    querySnapshotId.forEach((doc) => {
      const artpiece = {
        id: doc.id,
        data: doc.data(),
      };
      if (artpiece.data.collection_id === collectionId) {
        artPiecesArray.push(artpiece);
      }
    });

    // const querySnapshotData = await getDocs(artpiecesRef);
    // // const artPiecesArray = [];
    // querySnapshotData.forEach((doc) => {
    //   console.log(doc.data());
    //   // const artpiece = {
    //   //   id: doc.id,
    //   //   data: doc.data(),
    //   // };
    //   // if (artpiece.data.collection_id === collectionId) {
    //   //   artPiecesArray.push(artpiece);
    //   // }
    // });

    setArtPieces(artPiecesArray);
    console.log(artPiecesArray);
  };

  useIonViewWillEnter(() => {
    getCollection();
    getArtPieces();
  });

  const updateCollection = async () => {
    const newDoc = {
      name: newCollectionName,
    };

    const collectionDoc = doc(collectionsRef, collectionId);
    await updateDoc(collectionDoc, newDoc);
    setIsOpen(false);
    window.location.reload();
    setShowUpdateToast(true);
    setNewCollectionName("");
  };

  const deleteCollection = async () => {
    const collectionDoc = doc(collectionsRef, collectionId);
    await deleteDoc(collectionDoc);
    history.push("/collections");
    setShowDeleteToast(true);
  };

  // const goBack = () => {
  //   history.push("/collections");
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{currentCollection && currentCollection.name}</IonTitle>
          {/* Don't show action sheet in favorites */}
          {currentCollection && currentCollection.name !== "Favorites" ? (
            <IonButton
              onClick={() => setShowActionSheet(true)}
              fill="clear"
              color="custom-light"
              slot="end"
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
          <IonToast
            isOpen={showUpdateToast}
            onDidDismiss={() => setShowUpdateToast(false)}
            message={`Collection name changed to ${newCollectionName}`}
            duration={1500}
          />
          {currentCollection && (
            <IonToast
              isOpen={showDeleteToast}
              onDidDismiss={() => setShowDeleteToast(false)}
              message={`Collection ${currentCollection.name} has been deleted`}
              duration={1500}
            />
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="collections-grid">
          {artPieces.map((piece) => {
            return (
              <div key={piece.id}>
                {piece.data.img && (
                  <Link
                    to={`/collections/${collectionId}/${piece.data.artpiece_id}`}
                  >
                    <IonImg
                      className="collection-img"
                      src={piece.data.img}
                      alt="artpiece"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
