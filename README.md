# Trivia Night - Q&Ale

## Welcome to Q&Ale!  A trivia host's companion app to generate and present trivia quizzes.

#### If you're new to Q&Ale...
- Clone the repo
- npm install on both the front and back ends.
  - front-end is in the react-ui folder
  - back-end is in the server folder
- in order to run the app on your local server, you will need to simultaneously run 2 terminals (one for both the front and back ends)
  - on the front-end: cd into the react-ui folder and run
    `npm start`
  - on the back-end: make sure to be in triviaNight and run
    `npm run devstart`
- app is served on `localhost:5000`

#### Q&Ale's Features...
- Our app utilizes Okta user authentication (you will need to sign up for your own Okta account and link it with the page)
  - In samples.config.js, you will need to input clientId and issuer from your own Okta accout
- Users can login and create a trivia quiz
  - Here, they will input the name and date of the quiz, then input all round categories and question/answer combos (handled on individual pages of app)
- Users will then be directed to a quiz review page and can enter presentation mode from there.
- Users can also go to the My Quizzes section and review all of the quizzes they have previously made (can review details and enter presentation mode from there as well).

#### Known bugs...
- When creating a quiz, if the user doesn't input the name of the quiz and all round categories, they won't be able to review the quiz

## Daily Workflow Logs
### 2/28/18
- Converted files into create-react-app-buildpack structure.
- Pushed to Heroku https://enigmatic-coast-39458.herokuapp.com/
- linked mLabs account to Heroku
- scrapped everything up until this point.... # ILoveLearning

### 3/1/18
- added Okta Authentication
- Created file structure for components
- having issues with redirects from login and login on heroku
- bear bones css

### 3/2/18
- created our schemas
- wrote routes for our schemas
- tested our route functionality with postman (not working :( specifically POST function for TriviaSchema)

### 3/5/18
- built test route for question schema
- nested create question in round POST route in API server

### 3/6/18
- reworked okta authentication with samples-js-react (successful!)
- tested redirect Uri with Heroku
- pushed to heroku successfully
- removed cluster fork code

### 3/7/18
- built userschema.js (need to reassess userschema)
- with testroute.js, used withAuth (helpers.js, async) to access userinfo.sub
- nested user POST route to include trivias, rounds, and questions
- started testing nested populate functions (deep population for days)

### 3/8/18
- implemented deep population for our POST userid functions
- Edited site structure and made createquiz in navbar
- started exploring route variation and tested with createquiz (worked!)

### 3/9/18
- added textroundinput.js file
- started working on passing props from createquiz to textroundinput so that we can link info from previous page to new page
- added a POST route to index.js for textroundinput

### 3/14/2018
- we finally figured out how to pass props. oh wow!
- working on routes to post to trivias with multiple rounds.
- in progress route "textroundinput/:trivia_id"
- make sure to test all routes with hard codes because its simple!

### 3/15/18
- successfully wrote PUT route on the back end in TextRoundInput
- successfully linked front-end route to back end (textroundinput)
- created all textroundinput files for each round and have them sending info to backend
- added quizreview file (redirected here after you submit info on last round page)
- started fetching info from backend to be displayed on quizreview page

### 3/16/18 - 3/20/18
- finished displaying all quiz info on QuizReview
- created presentation format that goes through all questions, intermissions, and answer reviews
- created My Quizzes page that displays all quizzes for a particular user and links that specific quiz to a button - takes user back to quizreview for that specific quizzes
- started css styling for home, navbar, presentation, quizreview, and all textroundinput files


----
