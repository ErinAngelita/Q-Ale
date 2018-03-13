



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
