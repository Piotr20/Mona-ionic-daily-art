import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import {
  artInCollectionsRef,
  artpiecesRef,
  collectionsRef,
  usersRef,
} from "../firebase/firebaseInit";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from "@capacitor/push-notifications";
import "./Daily.css";
import "../theme/global.css";
import SheetModal from "../components/AddToCollection";

const Daily = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [usersArray, setUsersArray] = useState([]);
  const [artpiecesArray, setArtpiecesArray] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [recomended, setRecomended] = useState({});
  const [dailyArt, setDailyArt] = useState([]);
  const followIcon = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    verifyUserPreferences();
  }, [auth]);

  async function verifyUserPreferences() {
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

    for (const artwork of artpiecesArray) {
      if (
        userDoc.data.Preferences.paintings === true &&
        artwork.data.category === "painting"
      ) {
        artArray.push(artwork);
      }
      if (
        userDoc.data.Preferences.sculptures === true &&
        artwork.data.category === "sculpture"
      ) {
        artArray.push(artwork);
      }
      if (
        userDoc.data.Preferences.photography === true &&
        artwork.data.category === "photography"
      ) {
        artArray.push(artwork);
      }
      if (
        userDoc.data.Preferences.architecture === true &&
        artwork.data.category === "architecture"
      ) {
        artArray.push(artwork);
      }
    }

    setRecomendations(artArray);

    function rand_from_seed(x, iterations) {
      iterations = iterations || 100;
      for (var i = 0; i < iterations; i++)
        x = (x ^ (x << 1) ^ (x >> 1)) % artArray.length;

      return x;
    }

    let random = rand_from_seed(~~(new Date() / 86400000)); // Seed with the epoch day.

    setRecomended(artArray[random]);
  }

  //push notification code
  console.log("Initializing HomePage");

  // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then((result) => {
    if (result.receive === "granted") {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  // On success, we should be able to receive notifications
  PushNotifications.addListener("registration", (token) => {
    alert("Push registration success, token: " + token.value);
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener("registrationError", (error) => {
    alert("Error on registration: " + JSON.stringify(error));
  });

  // Show us the notification payload if the app is open on our device
  PushNotifications.addListener("pushNotificationReceived", (notification) => {
    alert("Push received: " + JSON.stringify(notification));
  });

  // Method called when tapping on a notification
  PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (notification) => {
      alert("Push action performed: " + JSON.stringify(notification));
    }
  );

  // function displayLike() {
  //   setFavorited(!favorited);

  //   if (favorited) {
  //     followIcon.current.classList.add("active");
  //     addArtPieceToFavorites();
  //   } else {
  //     followIcon.current.classList.remove("active");
  //     // remove artpiece from favorites
  //   }
  // }

  // fetch user's collections to display in the "Add to collection" modal
  const getCollections = async () => {
    const q = query(collectionsRef, where("uid", "==", auth.currentUser.uid));

    let collectionsArray = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let collection = {
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
          {/* <span ref={followIcon} className="like icon" onClick={displayLike}>
            <IonImg
              className="icon-self"
              src="assets/icon/custom-icons/heart.svg"
            ></IonImg>
          </span>*/}
          <span
            className="add-collection icon"
            onClick={() => {
              setIsOpen(true);
              getCollections();
            }}
          >
            <IonImg
              className="icon-self"
              src="assets/icon/custom-icons/folder.svg"
            ></IonImg>
          </span>
          <SheetModal
            title="Add to collection"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            collections={collections}
            artPiece={recomended}
          />
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
