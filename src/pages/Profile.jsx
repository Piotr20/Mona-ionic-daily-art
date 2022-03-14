// import {
//   IonContent,
//   IonHeader,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonList, 
// } from "@ionic/react";
// import { useState } from "react";
// import { useParams } from "react-router";
// import "./Profile.css";
// import UserCard from "../components/UserCard";
// import userService from "../services/userService";

// export default function UserPage() {
//   const [user, setUser] = useState({});
//   const params = useParams();
//   const userId = parseInt(params.id);

//   async function loadData() {
//       const userData = await userService.getUser(userId);
//       setUser(userData);
//   }

//   // useIonViewWillEnter(() => {
//   //     loadData();
//   // });

//   return (
//     <IonPage id="profile">
//     <IonHeader>
//       <IonToolbar>
//         <IonTitle>Profile</IonTitle>
//       </IonToolbar>
//     </IonHeader>
//     <IonContent fullscreen>
//       <IonHeader collapse="condense">
//         <IonToolbar>
//           <IonTitle size="large">Profile</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <UserCard user={user} />
//     </IonContent>
//   </IonPage>
//   );
// }

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  useIonLoading,
  IonToggle,
  IonIcon,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getUserRef } from "../firebase/firebaseInit";
import { get, update } from "@firebase/database";
import { brushOutline, businessOutline, cameraOutline, hammerOutline } from "ionicons/icons";
import "./Profile.css";
// import { storage } from "../firebase-config";
// import { Toast } from "@capacitor/toast";

export default function ProfilePage() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, dismissLoader] = useIonLoading();

  useEffect(() => {
      setUser(auth.currentUser);

      async function getUserDataFromDB() {
          const snapshot = await get(getUserRef(user.uid));
          const userData = snapshot.val();
          if (userData) {
              setName(userData.name);
          }
      }

      if (user) getUserDataFromDB();
  }, [auth.currentUser, user]);

  function handleSignOut() {
      signOut(auth);
  }

  async function handleSubmit(event) {
      event.preventDefault();
      showLoader();

      const userToUpdate = {
          name: name,
          email: email,
          password: password
      };

      await update(getUserRef(user.uid), userToUpdate);
      dismissLoader();
      // await Toast.show({
      //     text: "User Profile saved!",
      //     position: "top"
      // });
  }
  return (
      <IonPage className="profile-page">
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Profile</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense" className="page-title">
                <IonToolbar>
                    <IonTitle size="large">Profile</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader className="header">Edit</IonHeader>

              {/* <IonItem>
                  <IonLabel>Email:</IonLabel>
                  <IonInput value={user?.email} placeholder="Email"></IonInput>
              </IonItem>
              <IonItem>
                  <IonLabel>Name</IonLabel>
                  <IonInput value={user?.name} placeholder="Name"></IonInput>
              </IonItem>
              <IonItem>
                  <IonLabel>Name</IonLabel>
                  <IonInput value={user?.password} placeholder="Password" type="password"></IonInput>
              </IonItem> */}
              <form onSubmit={handleSubmit} className="profile-form">
                  <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                      <IonInput
                          value={user?.email}
                          type="text"
                          placeholder="Type your email"
                          onIonChange={e => setMail(e.target.value)}
                      />
                     
                      <IonLabel position="stacked">Name</IonLabel>
                      <IonInput
                          value={user?.name}
                          type="text"
                          placeholder="Type your name"
                          onIonChange={e => setName(e.target.value)}
                      />
                    
                      <IonLabel position="stacked">Password</IonLabel>
                      <IonInput
                          value={password}
                          type="password"
                          placeholder="Type your password"
                          onIonChange={e => setPassword(e.target.value)}
                      />
                  </IonItem>
                  {/* <IonItem>
                      <IonLabel position="stacked">Title</IonLabel>
                      <IonInput
                          value={title}
                          type="text"
                          placeholder="Type your title"
                          onIonChange={e => setTitle(e.target.value)}
                      />
                  </IonItem> */}
                  <div className="ion-padding">
                      <IonButton type="submit" expand="block">
                          Save
                      </IonButton>
                  </div>
              </form>

              <IonHeader className="header">Preferences</IonHeader>

                <IonItem className="preferences-profile">
                    <IonIcon icon={brushOutline} slot="start" />
                    <IonLabel>Paintings</IonLabel>
                    <IonToggle checked />
                </IonItem>

                <IonItem className="preferences-profile">
                    <IonIcon icon={hammerOutline} slot="start" />
                    <IonLabel>Sculptures</IonLabel>
                    <IonToggle checked />
                </IonItem>

                <IonItem className="preferences-profile">
                    <IonIcon icon={cameraOutline} slot="start" />
                    <IonLabel>Photography</IonLabel>
                    <IonToggle checked />
                </IonItem>

                <IonItem className="preferences-profile">
                    <IonIcon icon={businessOutline} slot="start" />
                    <IonLabel>Architecture</IonLabel>
                    <IonToggle checked />
                </IonItem>

                <div className="ion-padding">
                    <IonButton onClick={handleSignOut} expand="block">Log out
                    </IonButton>
                </div>  
          </IonContent>
                     
      </IonPage>
  );
}