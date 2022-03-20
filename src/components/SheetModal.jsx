import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const SheetModal = ({
  title,
  isOpen,
  setIsOpen,
  inputValue,
  setInputValue,
  action,
}) => {
  return (
    <IonModal
      isOpen={isOpen}
      breakpoints={[0, 0.5, 1]}
      initialBreakpoint={0.5}
      onDidDismiss={() => setIsOpen(false)}
    >
      <IonContent className="new-collection-modal">
        <IonHeader className="addNewCollection-tittle">{title}</IonHeader>
        <IonItem>
          <IonInput
            value={inputValue}
            placeholder="Enter new collection name"
            onIonChange={(e) => setInputValue(e.detail.value)}
          ></IonInput>
        </IonItem>
        <div className="ion-padding">
          <IonButton
            onClick={action}
            color="custom-orange"
            expand="block"
            className="modal-btn orange-button"
          >
            Save
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SheetModal;
