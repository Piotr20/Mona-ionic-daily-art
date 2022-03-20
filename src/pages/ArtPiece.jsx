import { useIonViewWillEnter } from "@ionic/react";
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

  return <div>{artpieceId}</div>;
};

export default ArtPiece;
