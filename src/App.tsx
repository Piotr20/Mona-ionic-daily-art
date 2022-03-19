import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import { ellipse, square, triangle } from "ionicons/icons";
import Daily from "./pages/Daily";
import Collections from "./pages/Collections";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";
import Collection from "./pages/Collection";
import SignUpPage from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Preferences from "./pages/Preferences";
import { onAuthStateChanged, getAuth } from "firebase/auth";

setupIonicReact();

const auth = getAuth();
onAuthStateChanged(auth, (userA) => {
  if (userA) {
    // console.log("variable", userA);
  } else {
  }
});

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/daily">
            <Daily />
          </Route>
          <Route exact path="/preferences">
            <Preferences />
          </Route>
          <Route exact path="/collections">
            <Collections />
          </Route>
          <Route exact path="/collections/:collectionId">
            <Collection />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="bottom-nav">
          <IonTabButton tab="tab1" href="/daily">
            {/* <IonIcon icon={triangle} /> */}
            <IonImg src="../assets/icon/daily-art.png" alt="" />
            {/* <IonLabel>Daily</IonLabel> */}
          </IonTabButton>
          <IonTabButton tab="tab2" href="/collections">
            {/* <IonIcon icon={ellipse} /> */}
            <IonImg src="../assets/icon/collections.png" alt="" />
            {/* <IonLabel>Collections</IonLabel> */}
          </IonTabButton>
          <IonTabButton tab="tab3" href="/profile">
            {/* <IonIcon icon={square} /> */}
            <IonImg src="../assets/icon/profile.png" alt="" />
            {/* <IonLabel>Profile</IonLabel> */}
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
