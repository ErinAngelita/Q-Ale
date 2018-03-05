const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;
const db = process.env.MONGODB_URI || 'mongodb://localhost/trivia';

// Multi-process to utilize all CPU cores.

// if (cluster.isMaster) {
//   console.error(`Node cluster master ${process.pid} is running`);
//
//    Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
//
//   cluster.on('exit', (worker, code, signal) => {
//     console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//   });
//
// } else {

const app = express();
mongoose.Promise = require('bluebird');
const TriviaSchema = require('./models/TriviaSchema.js');
const RoundSchema = require('./models/RoundSchema.js');
const QuestionSchema = require('./models/QuestionSchema.js');
const router = express.Router();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// check to see I if I need this...

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
//end of TriviaSchema routes

//Begining of RoundSchema started working on first .post

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
  })
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

//End of Round Schema

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

//End of QuestionSchema

app.use('/api', router);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function() {
  console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
//}
