const User = require('../models/users');

module.exports = function (app, passport){

app.post('/api/login',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
      // console.log('Is authenticate?',req.isAuthenticated());
      console.log('req.user',req.user);
        /*req.user: {
        _id: 5a9f97cdf099e98fd62437b9,
        email: '1234@1234.com',
        __v: 0,
        displayName: '',
        password: '1234' }*/
    // res.redirect('/');
	res.send({withCredentials: true, twitterId: req.user.twitterId})
	// res.send(true);
  });

  app.get('/', function(req, res, next) {
    res.render('index');
  });
  app.use('/home', function(req,res,next){
    res.render('home',{user: req.user})
  });
  app.use('/login',function(req,res,next){
    res.render('login')
  });
  app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
      res.render('profile', { user: req.user });
    });

app.get('/api/myInterest/:user', function(req, res, next){
    const query = {'username':req.params.user};
    User.find(query).then(function(results){
      res.send(results[0].interests);
    });
})

app.delete('/api/myInterest/:title', function(req, res, next){
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
app.get('/polls',function(req,res,next){
  const query = {};

  User.find(query).then(function(results){
    console.log(results);
    res.send(results);
  });
});


app.post('/api/myInterest/:username',function(req, res, next){
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

app.post('/api/allInterests', function(req, res, next){
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


}
