import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Collections.css";
import { ellipsisHorizontalOutline } from "ionicons/icons";

const Collection = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { collectionId } = useParams();

  return (
    <IonPage>
      <IonHeader>
        <IonItem>
          <IonTitle>{collectionId}</IonTitle>
          <IonButton onClick={() => setShowActionSheet(true)} fill="clear">
            <IonIcon icon={ellipsisHorizontalOutline} />
          </IonButton>
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass="my-custom-class"
            buttons={[
              {
                text: "Delete",
                role: "destructive",
                id: "delete-button",
                data: {
                  type: "delete",
                },
                handler: () => {
                  console.log("Delete clicked");
                },
              },
              {
                text: "Edit",
                data: 10,
                handler: () => {
                  console.log("Share clicked");
                },
              },
            ]}
          ></IonActionSheet>
        </IonItem>
        <IonItem>
          <Link to="/collections">Back to collections</Link>
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonGrid>
            <IonRow>
              <IonCol>
                <Link to="/collections/2/artwork">
                  <IonImg src="https://cdn.shopify.com/s/files/1/0344/6469/files/Screen_Shot_2018-07-10_at_12.24.43_PM.png?v=1531239937"></IonImg>
                </Link>
              </IonCol>
              <IonCol>
                <IonImg src="https://cdn-images.threadless.com/threadless-media/artist_shops/shops/artbites/products/604372/shirt-1528657779-5406b7bbcc3112ba9515d8ba816befba.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltIiwgW2ZhbHNlLCBmYWxzZV0sIHt9XSwgWyJyZXNpemUiLCBbXSwgeyJ3aWR0aCI6IDk5Ni4wLCAiYWxsb3dfdXAiOiBmYWxzZSwgImhlaWdodCI6IDk5Ni4wfV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzEyMDAsIDEyMDBdLCB7ImJhY2tncm91bmQiOiAiZTVkNWJiIn1dXX0="></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonImg src="https://pictures-of-cats.org/wp-content/uploads/2021/11/Medieval-cat-painting-from-ChinaX.jpg"></IonImg>
              </IonCol>
              <IonCol>
                <IonImg src="https://i.redd.it/v7rx3myrvbc61.jpg"></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonImg src="https://miro.medium.com/max/1400/0*uFu5uij7bvI54j2D.jpg"></IonImg>
              </IonCol>
              <IonCol>
                <IonImg src="https://cdn-images.threadless.com/threadless-media/artist_shops/shops/artbites/products/604372/shirt-1528657779-5406b7bbcc3112ba9515d8ba816befba.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltIiwgW2ZhbHNlLCBmYWxzZV0sIHt9XSwgWyJyZXNpemUiLCBbXSwgeyJ3aWR0aCI6IDk5Ni4wLCAiYWxsb3dfdXAiOiBmYWxzZSwgImhlaWdodCI6IDk5Ni4wfV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzEyMDAsIDEyMDBdLCB7ImJhY2tncm91bmQiOiAiZTVkNWJiIn1dXX0="></IonImg>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Collection;
