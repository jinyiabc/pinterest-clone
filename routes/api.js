const express = require('express');
const router = express.Router();
const User = require('../models/users');


router.get('/myInterest/:user', function(req, res, next){
    const query = {'username':req.params.user};
    User.find(query).then(function(results){
      res.send(results[0].interests);
    });
})

router.delete('/myInterest/:title', function(req, res, next){
    const query = {'username':'jinyiabc'};
    const update = {
                    $pull:{'interests':{"title":req.params.title}}
                  };


    User.updateOne(query,update,{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

      User.findOne(query).then(function(user){
        res.send(user);
      })
    }).catch(next);

})


// Get all polls from all users
router.get('/polls',function(req,res,next){
  const query = {};

  User.find(query).then(function(results){
    console.log(results);
    res.send(results);
  });
});


router.post('/myInterest/:username',function(req, res, next){
    const query = {'username':req.params.username};
    const update = {interests: {
                          $each:[ req.body ],
                          $sort: { score: -1 }
                        }
                   };
       User.findOneAndUpdate(query,{$push:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

         User.findOne(query).then(function(user){
           res.send(user);
         })
       }).catch(next);

})

router.post('/allInterests', function(req, res, next){
    const query = {'username':'jinyiabc'};
  const update = {interests:
      [{
          "title":"cowabunga!",
          "imageUrl":"../assets/data/cow.jpg"
      },
      {
          "title":"Win baby yeah!",
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"A winner is you!",
          "imageUrl":"../assets/data/winnerYou.jpg"
      }
  ]};

    User.findOneAndUpdate(query,{$push:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

      User.findOne(query).then(function(user){
        res.send(user);
      })
    }).catch(next);


})


module.exports = router;
