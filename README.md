
# Trivia Night - Q&Ale

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
