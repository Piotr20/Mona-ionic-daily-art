# Mona
Created by Piotr Pospiech, Katarzyna Laniecka and Aleksandra Wytulany.

Do you want to know more about classic masterpieces? Do you find art inspiring but never make an effort to know more about artists and the backstory of their art? Learn something new with *MONA -* an app that serves you an art piece from paintings, sculptures, photography, and architecture every single day.

The app adds some culture to your day through several features:
- sends you a piece of art daily, so you can explore the collection piece by piece
- allows you to save your favourite art pieces so you can enjoy them anytime
- saves works to your customized collections
- sets up your account and preferences, so you can control what artworks are sent to you

**DESIGN CHOICES**

To make *MONA* more engaging, and give the feeling of a ‘virtual museum’ we followed some steps:

- to achieve a classy and elegant look, we decided on *Oranienbaum*, which is a modern and high contrast Antique font; with a combination of sans-serif, modern font - Noto Sans - the fonts establish ****hierarchy and create visual interest
- dark mode with linear, black gradient and shades of grey express sophistication, mystery, elegance, and high-end products and experiences.
    
    As a contrasting color element, we used energetic orange to attract attention (for action buttons) and enhance the aesthetics of the app.
    
- keeping consistency and hierarchy to provide users with a clear and intuitive interface
- applying an 8px grid to keep consistent spacing and make the app more scalable.

**FOCUS ON USER EXPERIENCE**

Besides a modern-looking app, we strive to keep the experience on a user-friendly level so he can easily follow commands and get familiar with the layout:
- the navigation is where you would normally reach to perform standard actions; it’s limited to just a few elements to reduce confusion and decision paralysis (*Miller’s Law*)
- providing familiar design patterns and consistency to increase conversion (*Jakob’s Law*)
- minimalistic design and reduction of complexity to enhance usability and experience (*Hick’s Law*)
- using icons for better communication and increasing the meaning recognition of elements - makes UI easy to understand without much of a learning curve

**MOBILE DEVELOPMENT WITH IONIC REACT**

*MONA* web app is built with the use of **Ionic** platform that allowed us to build it with a single code base, run in everywhere with JS or Web and base the interface on optimized UI components like *Content*, *Tabs*, *Toolbar*, *Modal*, *Toggle,* or *Toast.*

**CAPACITOR FUNCTIONALITY**

But the goal of the app wasn’t only to provide users with a nice-looking interface. *MONA* is a progressive web app with native functionality which we could achieve with **Capacitor** - an open-source runtime that enables our app to run natively on iOS or Android, access native features on your phone, and deploy it to the web store. 

To make that happens we used some Capacitor plugins like:
- Toast
- Action Sheet - In the Collection page we use an action sheet, which allows the user to choose between Edit or Delete. 
- Push Notifications
- Splash Screen

**CLOUD FIRESTORE STRUCTURE**

We created a few collections in Firestore to store our users data:

- *users*
- *artpieces* - At first we wanted to use an external API with a wide selection of art pieces (e.g. Artsy API, MET API). Unfortunately none of them suited our needs, so we decided to create our own small database in a Firestore collection. However, as a future improvement we would need to add more art pieces, because right now we only supply content for maximum 20 days (depending on the user’s preferences)
- *collections* - Stores all collections added by users
- *artpieces_in_collections* - Here, when a user saves an art piece in a collection, we store a connection between the specific collection and the art work

**FOLDER STRUCTURE**

We kept our project and folder structure pretty simple. In the *src* directory we divided our files between these folders:

- *pages* - Page components that are linked in the router in *App.tsx*
- *components* - Smaller components that we used to keep our pages smaller or that were reusable
- *utilities* - Helper files that we used throughout the application (e.g. firebase init file)
- *styles* - CSS files responsible for both global and page-specific styles

**FEATURES**

- Login and Sign up
- Preferences
- Favorites and Collections

A Favorites collection is added when the user signs up. Then when the user wants to create a custom collection, they can tap on the + button in the Collections tab. It opens up a sheet modal, where they enter the name of the collection. That triggers a function, which creates a new document in Firestore with the name and the user ID and redirects to the collection page.

In order to save an art piece in a collection, the user must tap on the collection icon in the Daily Art tab. That also opens up a sheet modal, which fetches the existing collection names (including Favorites, which are placed as the first one for easy access) and displays them in an Ionic radio component. If the current art piece has already been saved, a toast will show to inform the user and stop them from saving it again. If not, a new document is added to Firestore connected to the collection ID and an cover image for the collection is updated.

In the collection page, the user can preview all their saved art pieces. They can also remove chosen art pieces as well as delete or update the name of the collection in the action sheet.

- Profile

In the Profile page, the user can preview their account details and update them if needed. They are fetched from the Firestore collection and inserted as the value of the inputs. When the Save button is tapped, the document is updated with the new data.
