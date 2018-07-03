# Chirp
Chirp is a twitter/instagram style blogging app built using React.js, Node.js, and Google Firebase for authentication, hosting, and storage.

[Click here](https://chirper-a4c7e.firebaseapp.com/) to see the latest live version of the site.

Get started: 

I'll assume you have NodeJS and Git installed on your machine.

Download or fork this repo to your local machine. Now in the root folder, install all dependencies using 
> npm i

Create a ```.env``` file in the root folder and in it, a variable called ```REACT_APP_FIREBASE``` and assign your Google Firebase API key to it. 
If you don't have a Google Firebase API key, you can get one [here](https://firebase.google.com/docs/web/setup) by signing up for a gmail account and then requesting one. 
Your ```.env``` file should look like this at the end of this step:
> REACT_APP_FIREBASE = 1*************************ZH5szIATzU

Fire her up. In the root folder, run the cmd:
> npm start 