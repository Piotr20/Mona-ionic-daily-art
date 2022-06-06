export function hideTabs() {
  const tabsEl = document.querySelector("ion-tab-bar");
  if (tabsEl) {
    tabsEl.hidden = true;
  }
}

export function showTabs() {
  const tabsEl = document.querySelector("ion-tab-bar");
  if (tabsEl) {
    tabsEl.hidden = false;
  }
}

export function displayErrorMessage(code) {
  let errorMessage = "";
  switch (code) {
    case "auth/invalid-email":
      errorMessage = "Incorrect email format";
      break;
    case "auth/invalid-password":
      errorMessage = "Incorrect password";
      break;
    case "auth/wrong-password":
      errorMessage = "Incorrect password";
      break;
    case "auth/user-not-found":
      errorMessage = "User doesn't exist";
      break;
    case "auth/weak-password":
      errorMessage = "Password should be at least 6 characters";
      break;
    case "auth/email-already-in-use":
      errorMessage = "Email taken";
      break;
    default:
      errorMessage = `Error: ${code}`;
      break;
  }
  return errorMessage;
}
