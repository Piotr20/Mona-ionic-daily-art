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
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="new-collection-modal">
        <IonItem>
          <IonInput
            value={inputValue}
            placeholder="Enter new collection name"
            onIonChange={(e) => setInputValue(e.detail.value)}
          ></IonInput>
        </IonItem>
        <IonButton
          onClick={action}
          color="custom-orange"
          expand="block"
          className="orange-button"
        >
          Save
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default SheetModal;
