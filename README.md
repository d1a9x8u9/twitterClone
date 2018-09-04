# Chirp
Chirp is a twitter/instagram style blogging app built using React.js, Node.js, and Google Firebase for authentication, hosting, and storage.

[Click here](https://chirper-a4c7e.firebaseapp.com/) to see the latest live version of the site.

Get started: 

I'll assume you have NodeJS and Git installed on your machine.

Download or fork this repo to your local machine. Now in the root folder, install all dependencies using 
> npm i


Create a ```.env``` file in the root folder and in it, a variable called ```REACT_APP_FIREBASE``` and assign your Google Firebase API key to it. 
If you don't have a Google Firebase API key, you can get one [here](https://firebase.google.com/docs/web/setup) by signing up for a gmail account and then requesting one. 
In your Google Firebase project page Develop tab, you have to initalize 3 things: 

Firebase Authentication: Get Started, Authentication tab, Sign-in Method, Under Signin Providers, enable Email/Password. This allows users to create a login and password for the application.

Firebase Database: Click Get Started, then Real-Time database. Since this application is simple, we're going to use db in test mode.

Firebase Storage: Click Get Started. This is where we're going to store user images. 

Your ```.env``` file should look like this at the end of this step:
> REACT_APP_FIREBASE = 1*************************ZH5szIATzU

In the ```.firebaserc``` file, change the project name to your firebase project's name. 

Now in ```src/firebase.js```, copy and paste your config object from your Firebase project config settings into the files config object. NOTE: Don't change this files ```apiKey``` variable because it's set to use the API key from the ```.env``` file you created. 

Fire it up. In the root folder, run the cmd:
> npm i && npm start 

Sign up for an account and start posting on your new IG clone! 