const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {

  const app = express();
  mongoose.Promise = require('bluebird');
  const triviaSchema = require('../models/triviaSchema.js');
  const router = express.Router();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(bodyParser.json());
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // check to see I if I need this...

  // connect to database
  mongoose.connection.openUri('mongodb://localhost/trivia');

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  router.use((res, req, next) => {
    console.log("something is afoot")
    next();
  });

  router.get('/', (req, res) => {
    res.json({message:"What's up? Welcome to QuizPig!~"});
  });

  router.route('/trivia')

    .post((req, res) => {
      const trivia = new trivia();
      trivia.question = req.body.question;
  // add other schema fields here
      trivia.save(err => {
        console.log("saved");
        if (err)
          res.send(err);
        res.json({ message: "Question created!!"});
      });
    })

      .get((req, res) => {
          trivia.find((err, trivia) => {
            if(err)
              res.send(err);
            res.json(trivia);
          });
        });

    router.route('/trivia/:trivia_id')

      .get((req, res) => {
        trivia.findById(req.params.trivia_id, (err, trivia) => {
          if (err)
            res.send(err);
          res.json(trivia);
        });
      })

    .put((req, res) => {
      trivia.findById(req.params.trivia_id, (err, trivia) => {
        if (err)
          res.send(err);
        trivia.question = req.body.question;
    // enter remaining schema fields here ! :)
        trivia.save(err => {
          if(err)
            res.send(err);
          res.json({message: "trivia updated!"});
        });
      });
    })

    .delete(({params}, res) => {
      trivia.remove({
        _id: params.trivia_id
      }, (err, trivia) => {
        if (err)
          res.send(err);
        res.json({message: "trivia id removed!"});
      });
    });

  app.use('/api', router);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
