import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonThumbnail,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Collections.css";
import "../theme/global.css";

const Collections = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const addNewCollection = () => {
    console.log(newCollectionName + " added");
    history.push("/collections/2");
    setIsOpen(false);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonTitle>Collections</IonTitle>
          <IonButton onClick={() => setIsOpen(true)}>+</IonButton>
          <IonModal
            isOpen={isOpen}
            breakpoints={[0, 0.5, 1]}
            initialBreakpoint={0.5}
            onDidDismiss={() => setIsOpen(false)}
          >
            <IonContent>
              <IonTitle>Add a new collection</IonTitle>
              <IonItem>
                <IonInput
                  value={newCollectionName}
                  placeholder="Enter new collection name"
                  onIonChange={(e) => setNewCollectionName(e.detail.value)}
                ></IonInput>
              </IonItem>
              <IonButton onClick={addNewCollection}>Save</IonButton>
            </IonContent>
          </IonModal>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList>
          <Link to="/collections/2">
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src="https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2018-07-10_at_12.24.43_PM.png?v=1531239937" />
              </IonThumbnail>
              <IonLabel>Favorites</IonLabel>
            </IonItem>
          </Link>
          <Link to="/collections/2">
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src="https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2018-07-10_at_12.24.43_PM.png?v=1531239937" />
              </IonThumbnail>
              <IonLabel>Medieval cats</IonLabel>
            </IonItem>
          </Link>
          <Link to="/collections/2">
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src="https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2018-07-10_at_12.24.43_PM.png?v=1531239937" />
              </IonThumbnail>
              <IonLabel>Women in art</IonLabel>
            </IonItem>
          </Link>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Collections;
