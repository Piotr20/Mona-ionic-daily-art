import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { artInCollectionsRef, artpiecesRef, collectionsRef, usersRef } from "../firebase/firebaseInit";
import "./Daily.css";

const Daily = () => {
  const history = useHistory();
  const [user, setUser] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const [artpiecesArray, setArtpiecesArray] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [recomended, setRecomended] = useState({});
  const [dailyArt, setDailyArt] = useState([]);
  const followIcon = useRef(null);
  const [favorited, setFavorited] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    verifyUserPreferences();
  }, [auth]);

  async function verifyUserPreferences() {
    console.log(auth.currentUser);
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
    const artArray = [];

    console.log(userDoc);
    for (const artwork of artpiecesArray) {
      if (userDoc.data.Preferences.paintings === true && artwork.data.category === "painting") {
        artArray.push(artwork);
      }
      if (userDoc.data.Preferences.sculptures === true && artwork.data.category === "sculpture") {
        artArray.push(artwork);
      }
      if (userDoc.data.Preferences.photography === true && artwork.data.category === "photography") {
        artArray.push(artwork);
      }
      if (userDoc.data.Preferences.architecture === true && artwork.data.category === "architecture") {
        artArray.push(artwork);
      }
    }

    console.log(artArray);
    setRecomendations(artArray);

    function rand_from_seed(x, iterations) {
      iterations = iterations || 100;
      for (var i = 0; i < iterations; i++) x = (x ^ (x << 1) ^ (x >> 1)) % artArray.length;
      console.log("number", x);
      return x;
    }

    let random = rand_from_seed(~~(new Date() / 86400000)); // Seed with the epoch day.

    setRecomended(artArray[random]);
  }

  function handleLike(e) {
    console.log("favourite", favorited);
    setFavorited(!favorited);

    if (favorited == true) {
      followIcon.current.classList.add("active");
      addArtPieceToFavorites();
    } else {
      followIcon.current.classList.remove("active");
    }

    console.log(favorited);
  }

  async function addArtPieceToFavorites() {
    console.log(recomended.docId);

    // get doc with the name "Favorites" and current uid
    const q = query(
      collectionsRef,
      where("uid", "==", auth.currentUser.uid),
      where("name", "==", "Favorites")
    );

    let collectionId = "";

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      collectionId = doc.id;
    });

    // add new doc to artpieces in collections
    const newDoc = await addDoc(artInCollectionsRef, {
      artpiece_id: recomended.docId,
      collection_id: collectionId,
      img: recomended.data.imgUrl,
    });
  }

  return (
    <IonPage>
      <IonContent color="custom-black" fullscreen>
        <div className="daily-img-wrapper">
          <div className="daily-overlay">
            <h2>{recomended?.data?.name}</h2>
            <h4>{recomended?.data?.author}</h4>
            <span>{recomended?.data?.year}</span>
          </div>
          <IonImg className="daily-img" src={recomended?.data?.imgUrl}></IonImg>
        </div>
        <div className="daily-labels-wrapper">
          <span className="category label">{recomended?.data?.period}</span>
          <span className="category label">{recomended?.data?.category}</span>
          <span ref={followIcon} className="like icon" onClick={handleLike}>
            <IonImg className="icon-self" src="assets/icon/custom-icons/heart.svg"></IonImg>
          </span>
          <span className="add-collection icon">
            <IonImg className="icon-self" src="assets/icon/custom-icons/folder.svg"></IonImg>
          </span>
        </div>
        <div className="daily-page-content">
          <div className="art-bio">
            <p
              dangerouslySetInnerHTML={{
                __html: recomended?.data?.embededText,
              }}
            />
          </div>
          <div className="period details">
            <h5>Period</h5>
            <p>{recomended?.data?.period}</p>
          </div>
          <div className="location details">
            <h5>Location</h5>
            <p>{recomended?.data?.location}</p>
          </div>
          <div className="size details">
            <h5>Size</h5>
            <p>{recomended?.data?.size}</p>
          </div>
          <div className="medium details">
            <h5>Medium</h5>
            <p>{recomended?.data?.medium}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Daily;
