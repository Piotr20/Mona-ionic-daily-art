import { IonCard, IonItem, IonIcon, IonLabel, IonInput, IonHeader, IonToggle } from "@ionic/react";
import { brushOutline, businessOutline, cameraOutline, hammerOutline } from "ionicons/icons";
import "../pages/Profile.css";


export default function UserCard({ user }) {
    return (
        <IonCard className="profile-card">
            <IonHeader className="edit-header">Edit</IonHeader>
            <form className="profile-form">
                    {/* <IonCardTitle>{user.name}</IonCardTitle> */}
                    <IonItem className="input">
                        <IonInput value={user.name} placeholder="Enter Name"></IonInput>
                    </IonItem>
                    {/* <IonCardTitle>{user.email}</IonCardTitle> */}
                    <IonItem className="input">
                        <IonInput value={user.email} placeholder="Enter Email"></IonInput>
                    </IonItem>
                    {/* <IonCardTitle>{user.password}</IonCardTitle> */}
                    <IonItem className="input">
                        <IonInput value={user.password} type="password" placeholder="Enter Password"></IonInput>
                    </IonItem>
                    {/* <IonCardSubtitle>{user.title}</IonCardSubtitle> */}
            </form>

            <IonHeader className="edit-header">Preferences</IonHeader>

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
        </IonCard>
    );
}