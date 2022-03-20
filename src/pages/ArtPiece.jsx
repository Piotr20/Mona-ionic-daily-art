import {
  IonContent,
  IonImg,
  IonPage,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router";
import { artpiecesRef } from "../firebase/firebaseInit";

const ArtPiece = () => {
  const { artpieceId } = useParams();
  const [currentArtPiece, setCurrentArtPiece] = useState();

  const getArtPiece = async () => {
    const docRef = doc(artpiecesRef, artpieceId);
    const docSnap = await getDoc(docRef);
    setCurrentArtPiece(docSnap.data());
    console.log(docSnap.data());
  };

  useIonViewWillEnter(() => {
    getArtPiece();
  });

  useIonViewWillLeave(() => {
    setCurrentArtPiece(null);
  });

  return (
    <IonPage>
      <IonContent>
        <IonImg src={currentArtPiece?.imgUrl} alt="artpiece" />
      </IonContent>
    </IonPage>
  );
};

export default ArtPiece;
