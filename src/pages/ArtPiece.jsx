import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { artpiecesRef } from "../firebase/firebaseInit";

const ArtPiece = () => {
  const { collectionId, artpieceId } = useParams();
  const [currentArtPiece, setCurrentArtPiece] = useState();
  const history = useHistory();

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
      <IonContent color="custom-black" fullscreen>
        {collectionId && (
          <Link to={`/collections/${collectionId}`} className="artpiece-back">
            Go back
          </Link>
        )}
        <div className="daily-img-wrapper">
          <div className="daily-overlay">
            <h2>{currentArtPiece?.name}</h2>
            <h4>{currentArtPiece?.author}</h4>
            <span>{currentArtPiece?.year}</span>
          </div>
          <IonImg className="daily-img" src={currentArtPiece?.imgUrl}></IonImg>
        </div>
        <div className="daily-labels-wrapper">
          <span className="category label">{currentArtPiece?.period}</span>
          <span className="category label">{currentArtPiece?.category}</span>
        </div>
        <div className="daily-page-content">
          <div className="art-bio">
            <p
              dangerouslySetInnerHTML={{
                __html: currentArtPiece?.embededText,
              }}
            />
          </div>
          <div className="period details">
            <h5>Period</h5>
            <p>{currentArtPiece?.period}</p>
          </div>
          <div className="location details">
            <h5>Location</h5>
            <p>{currentArtPiece?.location}</p>
          </div>
          <div className="size details">
            <h5>Size</h5>
            <p>{currentArtPiece?.size}</p>
          </div>
          <div className="medium details">
            <h5>Medium</h5>
            <p>{currentArtPiece?.medium}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ArtPiece;
