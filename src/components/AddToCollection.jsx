import { getAuth } from "@firebase/auth";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { artInCollectionsRef, collectionsRef } from "../firebase/firebaseInit";

const SheetModal = ({ title, isOpen, setIsOpen, collections, artPiece }) => {
  const [selected, setSelected] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    console.log(collections);
  }, []);

  const addArtPieceToCollection = async () => {
    if (await isAlreadyAddedToCollection()) {
      setShowErrorToast(true);
    } else {
      // get doc with the selected name and current uid
      const q = query(
        collectionsRef,
        where("uid", "==", auth.currentUser.uid),
        where("name", "==", selected)
      );

      let collectionId = "";

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        collectionId = doc.id;
      });

      // add new doc to artpieces in collections
      await addDoc(artInCollectionsRef, {
        artpiece_id: artPiece.docId,
        collection_id: collectionId,
        img: artPiece.data.imgUrl,
      });
      // setIsOpen(false);
      setShowSuccessToast(true);
    }
  };

  const isAlreadyAddedToCollection = async () => {
    // get selected collection id
    const q1 = query(
      collectionsRef,
      where("uid", "==", auth.currentUser.uid),
      where("name", "==", selected)
    );

    let selectedCollectionId = "";

    const querySnapshot1 = await getDocs(q1);

    querySnapshot1.forEach((doc) => {
      // console.log("check if", doc.id, " => ", doc.data());
      selectedCollectionId = doc.id;
    });

    // get artpiece reference
    const q2 = query(
      artInCollectionsRef,
      where("artpiece_id", "==", artPiece.docId),
      where("collection_id", "==", selectedCollectionId)
    );

    let artPieceAlreadyAdded = false;
    let addedArtPiece = "";

    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      addedArtPiece = doc.data().artpiece_id;
    });

    if (addedArtPiece) {
      artPieceAlreadyAdded = true;
    } else {
      artPieceAlreadyAdded = false;
    }

    return artPieceAlreadyAdded;
  };

  return (
    <IonModal
      isOpen={isOpen}
      breakpoints={[0, 0.5, 1]}
      initialBreakpoint={0.5}
      onDidDismiss={() => setIsOpen(false)}
    >
      <IonContent className="new-collection-modal">
        <IonTitle>{title}</IonTitle>
        <IonRadioGroup
          value={selected}
          onIonChange={(e) => setSelected(e.detail.value)}
        >
          {collections ? (
            collections.map((collection) => {
              return (
                <IonItem key={collection.id}>
                  <IonLabel>{collection.data.name}</IonLabel>
                  <IonRadio slot="start" value={collection.data.name} />
                </IonItem>
              );
            })
          ) : (
            <p>No collections found.</p>
          )}
        </IonRadioGroup>
        <IonButton
          onClick={addArtPieceToCollection}
          color="custom-orange"
          expand="block"
          className="orange-button"
        >
          Save
        </IonButton>
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message={`Art piece added to ${selected}`}
          duration={2500}
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message={"Art piece has already been added to the collection"}
          duration={2500}
        />
      </IonContent>
    </IonModal>
  );
};

export default SheetModal;
