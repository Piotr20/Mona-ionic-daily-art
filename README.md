# Mona

Created by Piotr Pospiech, Katarzyna Laniecka and Aleksandra Wytulany.

Do you want to know more about classic masterpieces? Do you find art inspiring but never make an effort to know more about artists and the backstory of their art? Learn something new with _MONA -_ an app that serves you an art piece from paintings, sculptures, photography, and architecture every single day.

The app adds some culture to your day through several features:

- sends you a piece of art daily, so you can explore the collection piece by piece
- allows you to save your favourite art pieces so you can enjoy them anytime
- saves works to your customized collections
- sets up your account and preferences, so you can control what artworks are sent to you

**DESIGN CHOICES**

To make _MONA_ more engaging, and give the feeling of a ‘virtual museum’ we followed some steps:

- to achieve a classy and elegant look, we decided on _Oranienbaum_, which is a modern and high contrast Antique font; with a combination of sans-serif, modern font - Noto Sans - the fonts establish \*\*\*\*hierarchy and create visual interest
- dark mode with linear, black gradient and shades of grey express sophistication, mystery, elegance, and high-end products and experiences. As a contrasting color element, we used energetic orange to attract attention (for action buttons) and enhance the aesthetics of the app.

- keeping consistency and hierarchy to provide users with a clear and intuitive interface
- applying an 8px grid to keep consistent spacing and make the app more scalable.

**USER EXPERIENCE**

Besides a modern-looking app, we strive to keep the experience on a user-friendly level so he can easily follow commands and get familiar with the layout:

- the navigation is where you would normally reach to perform standard actions; it’s limited to just a few elements to reduce confusion and decision paralysis (_Miller’s Law_)
- providing familiar design patterns and consistency to increase conversion (_Jakob’s Law_)
- minimalistic design and reduction of complexity to enhance usability and experience (_Hick’s Law_)
- using icons for better communication and increasing the meaning recognition of elements - makes UI easy to understand without much of a learning curve

**MOBILE DEVELOPMENT WITH IONIC REACT**

_MONA_ web app is built with the use of **Ionic** platform that allowed us to build it with a single code base, run in everywhere with JS or Web and base the interface on optimized UI components like _Content_, _Tabs_, _Toolbar_, _Modal_, _Toggle,_ or _Toast._

**CAPACITOR FUNCTIONALITY**

But the goal of the app wasn’t only to provide users with a nice-looking interface. _MONA_ is a progressive web app with native functionality which we could achieve with **Capacitor** - an open-source runtime that enables our app to run natively on iOS or Android, access native features on your phone, and deploy it to the web store.

To make that happens we used some Capacitor plugins like:

- Toast
- Action Sheet
- Push Notifications
- Splash Screen

**CLOUD FIRESTORE STRUCTURE**

We created a few collections in Firestore to store our users data:

- _users_
- _artpieces_ - At first we wanted to use an external API with a wide selection of art pieces (e.g. Artsy API, MET API). Unfortunately none of them suited our needs, so we decided to create our own small database in a Firestore collection. However, as a future improvement we would need to add more art pieces, because right now we only supply content for maximum 20 days (depending on the user’s preferences)
- _collections_ - Stores all collections added by users
- _artpieces_in_collections_ - Here, when a user saves an art piece in a collection, we store a connection between the specific collection and the art work

**FOLDER STRUCTURE**

We kept our project and folder structure pretty simple. In the _src_ directory we divided our files between these folders:

- _pages_ - Page components that are linked in the router in _App.tsx_
- _components_ - Smaller components that we used to keep our pages smaller or that were reusable
- _utilities_ - Helper files that we used throughout the application (e.g. firebase init file)
- _styles_ - CSS files responsible for both global and page-specific styles

**FEATURES**

- Login and Sign up
- One random artpiece a day
- Preferences
- Favorites and Collections

A Favorites collection is added when the user signs up.

To create a custom collection, they can tap on the + button in the Collections tab to enter the name. That triggers a function, which creates a new document in Firestore and redirects to the collection page.

In order to save an art piece in a collection, the user must tap on the collection icon in the Daily Art tab. In the sheet modal we display the exsititng collection names in an Ionic radio component. If the current art piece has already been saved, a toast will show to inform the user and stop them from saving it again. If not, a new document is added to Firestore and an cover image for the collection is updated.

In the collection page, the user can preview all their saved art pieces. They can also remove chosen art pieces as well as delete or update the name of the collection in the action sheet.

- Profile

In the Profile page, the user can preview their account details and update them if needed. They are fetched from the Firestore collection and inserted as the value of the inputs. When the Save button is tapped, the document is updated with the new data.

- Daily art
  The way that functionality works is by taking seeded rabdom number which we later use to fetch fitting artpiece once a day according to the preferences.
- Preferences
  For the preferences we are checking the logged user's art preferebces abd vased wheteher he already chosen or not highlight them and later update the very user doc.
- login/signup
  To leverage authentication we used basic firebase auth functions with a minor additions such as ionic toasts.

# How to run

**Important!**

Remember to turn on dark mode since that what's how it was intended to be used with

## Web

If you want to run it on the web, you need to clone this repositiory, make sure you are on master and run these commands

    npm i

Followed by

    ionic serve

## iOS

If you want to run it on your device we shipped a prepared iOS folder

    npm i

Followed by

    ionic capacitor open ios

It should open the XCode for you and you should be able to either choose your own device or any given emulator.

We did not prepare anything for Android since we are not a big fans of Android :)
