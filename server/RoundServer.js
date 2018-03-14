



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
