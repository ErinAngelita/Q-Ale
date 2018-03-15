const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

const app = express();
mongoose.Promise = require('bluebird');
const UserSchema = require('./models/UserSchema.js');
const TriviaSchema = require('./models/TriviaSchema.js');
const RoundSchema = require('./models/RoundSchema.js');
const QuestionSchema = require('./models/QuestionSchema.js');
const router = express.Router();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// connect to database
mongoose.connection.openUri(db);
// Answer API requests.
app.get('/api', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

router.use((res, req, next) => {
  console.log("something is afoot")
  next();
});

router.get('/', (req, res) => {
  res.json({message: "What's up? Welcome to QuizPig!~"});
});

//________________________________________________________________CREATE_QUIZ__

router.route('/createquiz')

  .post((req, res) => {
    const userId = new UserSchema.userId();
    userId.tokenSub = req.body.tokenSub;
    const trivia = new TriviaSchema.trivia({
      name: req.body.name,
      date: req.body.date
    });
    trivia.save();
    userId.trivias.push(trivia);
    userId.save(err => {
      console.log("saved");
      if (err)
        res.send(err);
      res.json(trivia._id);
    });
  })
  .get((req, res) => {
    UserSchema.userId.find((err, userId) => {
      if (err)
        res.send(err);
      res.json(userId);
    });
  });

//___________________________________________________________TEXT_ROUND_INPUT__

router.route('/textroundinput/:trivia_id')

  .get((req, res) => {
    TriviaSchema.trivia.findById(req.params.trivia_id).populate({
      path: 'rounds',
      populate: {
        path: 'questions'
      }
    }).exec((err, userId) => {
      if (err)
        res.send(err);
      res.json(userId);
    });
  })

  .put((req, res) => {
    TriviaSchema.trivia.findById(req.params.trivia_id, (err, trivia) => {
      if (err)
        res.send(err);
      const round = new RoundSchema.round({
        category: req.body.category
      });
      const question = new QuestionSchema.question({
        question1: req.body.question1,
        answer1: req.body.answer1,
        question2: req.body.question2,
        answer2: req.body.answer2,
        question3: req.body.question3,
        answer3: req.body.answer3,
        question4: req.body.question4,
        answer4: req.body.answer4,
        question5: req.body.question5,
        answer5: req.body.answer5,
        question6: req.body.question6,
        answer6: req.body.answer6,
        question7: req.body.question7,
        answer7: req.body.answer7,
        question8: req.body.question8,
        answer8: req.body.answer8,
        question9: req.body.question9,
        answer9: req.body.answer9,
        question10: req.body.question10,
        answer10: req.body.answer10,
      });
      round.save();
      question.save();
      trivia.rounds.push(round);
      round.questions.push(question);
      trivia.save(err => {
        if(err)
          res.send(err);
        res.json({message: "Added round category and questions!"});
      });
    });
  });

//________________________________________________________________QUIZ_REVIEW__

router.route('/quizreview/:trivia_id')

  .get((req, res) => {
    TriviaSchema.trivia.findById(req.params.trivia_id).populate({
      path: 'rounds',
      populate: {
        path: 'questions'
      }
    }).exec((err, userId) => {
      if (err)
        res.send(err);
      res.json(userId);
    });
  });

//_______________________________________________________________________USER__
// Routes for UserSchema

router.route('/userId')

  .get((req, res) => {
    UserSchema.userId.find((err, userId) => {
      if (err)
        res.send(err);
      res.json(userId);
    });
  })

  .delete(({
    params
  }, res) => {
    UserSchema.userId.remove((err, userId) => {
      if (err)
        res.send(err);
      res.json({message: "Users removed!"});
    });
  })

  .post((req, res) => {
    const userId = new UserSchema.userId();
    userId.tokenSub = req.body.tokenSub;
    const trivia = new TriviaSchema.trivia({
      name: req.body.name,
      date: req.body.date
    });
    const round = new RoundSchema.round({
      category: req.body.category,
      roundNumber: req.body.roundNumber
    });
    const question = new QuestionSchema.question({
      question1: req.body.question1,
      answer1: req.body.answer1,
      question2: req.body.question2,
      answer2: req.body.answer2,
      question3: req.body.question3,
      answer3: req.body.answer3,
      question4: req.body.question4,
      answer4: req.body.answer4,
      question5: req.body.question5,
      answer5: req.body.answer5,
      question6: req.body.question6,
      answer6: req.body.answer6,
      question7: req.body.question7,
      answer7: req.body.answer7,
      question8: req.body.question8,
      answer8: req.body.answer8,
      question9: req.body.question9,
      answer9: req.body.answer9,
      question10: req.body.question10,
      answer10: req.body.answer10,
    });
    trivia.save();
    round.save();
    question.save();
    userId.trivias.push(trivia);
    trivia.rounds.push(round);
    round.questions.push(question);
    userId.save(err => {
      console.log("saved");
      if (err)
        res.send(err);
      res.json({message: "User created with a quiz!!"});
    });
  });

router.route('/userId/:userId_id')
  .get((req, res) => {
    UserSchema.userId.findById(req.params.userId_id).populate({
      path: 'trivias',
      populate: {
        path: 'rounds',
        populate: {
          path: 'questions'
        }
      }
    }).exec((err, userId) => {
      if (err)
        res.send(err);
      res.json(userId);
    });
  })

  .post((req, res) => {
    UserSchema.userId.findById(req.params.userId_id, (err, userId) => {
      if(err)
        res.send(err);
      const trivia = new TriviaSchema.trivia({
        name: "do you work yet?"
      });
      trivia.save();
      userId.trivias.push(trivia);
      userId.save(err => {
        if(err)
          res.send(err);
        res.json({message: "userId trivias updated!"});
      });
    });
  })

  .put((req, res) => {
    UserSchema.userId.findById(req.params.userId_id, (err, userId) => {
      if (err)
        res.send(err);
      userId.tokenSub = req.body.tokenSub;
      userId.trivias = req.body.trivias;
      userId.save(err => {
        if (err)
          res.send(err);
        res.json({message: "User updated!"});
      });
    });
  })
  .delete(({
    params
  }, res) => {
    UserSchema.userId.remove({
      _id: params.userId_id
    }, (err, userId) => {
      if (err)
        res.send(err);
      res.json({message: "User removed!"});
    });
  });

//_____________________________________________________________________TRIVIA__
//Routes for TriviaSchema

router.route('/trivia')
  .post((req, res) => {
    const trivia = new TriviaSchema.trivia();
    trivia.name = req.body.name;
    trivia.date = req.body.date;
    trivia.rounds = req.body.rounds;
    console.log(req.body.name);
    trivia.save(err => {
      console.log("saved");
      if (err)
        res.send(err);
      res.json({message: "Quiz created!!"});
    });
  })
  .get((req, res) => {
    TriviaSchema.trivia.find((err, trivia) => {
      if (err)
        res.send(err);
      res.json(trivia);
    });
  })
  .delete(({
    params
  }, res) => {
    TriviaSchema.trivia.remove((err, trivia) => {
      if (err)
        res.send(err);
      res.json({message: "Quizzes removed!"});
    });
  });



router.route('/trivia/:trivia_id')
  .get((req, res) => {
    TriviaSchema.trivia.findById(req.params.trivia_id, (err, trivia) => {
      if (err)
        res.send(err);
      res.json(trivia);
    });
  })
  .put((req, res) => {
    TriviaSchema.trivia.findById(req.params.trivia_id, (err, trivia) => {
      if (err)
        res.send(err);
      trivia.name = req.body.name;
      trivia.date = req.body.date;
      trivia.rounds = req.body.rounds;
      trivia.save(err => {
        if (err)
          res.send(err);
        res.json({message: "Quiz updated!"});
      });
    });
  })
  .delete(({
    params
  }, res) => {
    TriviaSchema.trivia.remove({
      _id: params.trivia_id
    }, (err, trivia) => {
      if (err)
        res.send(err);
      res.json({message: "Quiz removed!"});
    });
  });

//______________________________________________________________________ROUND__
//Begining of RoundSchema

router.route('/round')

  .post((req, res) => {
    const round = new RoundSchema.round();
    round.category = req.body.category;
    round.roundNumber = req.body.roundNumber;
    const question = new QuestionSchema.question({
      question: "hey",
      answer: "you",
      is_Img: false,
      img_Url: "there"
    });
    round.questions.push(question);
    round.save(err => {
      console.log("saved");
      if (err)
        res.send(err);
      res.json({message: "Round created with a question!!"});
    });
  })

  .get((req, res) => {
    RoundSchema.round.find((err, round) => {
      if (err)
        res.send(err);
      res.json(round);
    });
  })

  .delete(({
    params
  }, res) => {
    RoundSchema.round.remove((err, round) => {
      if (err)
        res.send(err);
      res.json({message: "rounds removed!"});
    });
  });

router.route('/round/:round_id')

  .post((req, res) => {
    RoundSchema.round.findById(req.params.round_id, (err, round) => {
      if(err)
        res.send(err);
      const question = new QuestionSchema.question({
        question: "hey",
        answer: "you",
        is_Img: false,
        img_Url: "there"
      });
      question.save();
      round.questions.push(question);
      round.save(err => {
        if(err)
          res.send(err);
        res.json({message: "round questions updated!"});
      });
    });

  })

  .get((req, res) => {
    RoundSchema.round.findById(req.params.round_id).populate('questions').exec((err, round) => {
      if (err)
        res.send(err);
      res.json(round);
    });
  })

  .put((req, res) => {
    RoundSchema.round.findById(req.params.round_id, (err, round) => {
      if (err)
        res.send(err);
      round.category = req.body.category;
      round.roundNumber = req.body.roundNumber;
      round.questions = req.body.questions;
      round.save(err => {
        if (err)
          res.send(err);
        res.json({message: "Round updated!"});
      });
    });
  })

  .delete(({params}, res) => {
    RoundSchema.round.remove({
      _id: params.round_id
    }, (err, round) => {
      if (err)
        res.send(err);
      res.json({message: "Round removed!"});
    });
  });

//___________________________________________________________________QUESTION__
//beginning of QuestionSchema

router.route('/question')

  .post((req, res) => {
    console.log(req.body);
    const question = new QuestionSchema.question();
    question.question = req.body.question;
    question.answer = req.body.answer;
    question.is_Img = req.body.is_Img;
    question.img_Url = req.body.img_Url;
    question.save(err => {
      console.log("saved");
      if (err)
        res.send(err);
      res.json({message: "Question created!!"});
    });
  })
  .get((req, res) => {
    QuestionSchema.question.find((err, question) => {
      if (err)
        res.send(err);
      res.json(question);
    });
  })

  .delete(({
    params
  }, res) => {
    QuestionSchema.question.remove((err, question) => {
      if (err)
        res.send(err);
      res.json({message: "questions removed!"});
    });
  });

router.route('/question/:question_id')
  .get((req, res) => {
    QuestionSchema.question.findById(req.params.question_id, (err, question) => {
      if (err)
        res.send(err);
      res.json(question);
    });
  })
  .put((req, res) => {
    QuestionSchema.question.findById(req.params.question_id, (err, question) => {
      if (err)
        res.send(err);
      question.question = req.body.question;
      question.answer = req.body.answer;
      question.is_Img = req.body.is_Img;
      question.img_Url = req.body.img_Url;
      question.save(err => {
        if (err)
          res.send(err);
        res.json({message: "Question updated!"});
      });
    });
  })
  .delete(({params}, res) => {
    QuestionSchema.question.remove({
      _id: params.question_id
    }, (err, question) => {
      if (err)
        res.send(err);
      res.json({message: "Question removed!"});
    });
  });

//_____________________________________________________________________________

app.use('/api', router);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function() {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
