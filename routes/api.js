const User = require('../models/users');

module.exports = function (app, passport){

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}

app.get('/api/login',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
      // console.log('Is authenticate?',req.isAuthenticated());
      console.log('req.user',req.user);
	  console.log(req.session);

/* req.user { interests: [],
   _id: '5ac455c0b2541800206b14f2',
   twitterId: '955461477552369664',
   username: 'jinyiabc',
   displayName: 'Alex J.Y.',
   imageUrl: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
  __v: 0 }*/

	// res.send({withCredentials: true, twitterId: req.user.twitterId})
	res.send(req.session.passport.user)
	// res.send(true);
  });

app.post('/api/:username/islikedby', function(req, res, next){
	const query = {
		"username": req.body.username,
		"interests.title": req.body.title
	}
	const update = {
		$set: {
			"interests.$.isLiked": req.params.username
		}
	}
	User.findOneAndUpdate(query, update, {upsert: true}).then(function(){
		  User.findOne(query).then(function(result){
			res.send(result);
		  })
	}).catch(next);
});


app.get('/api/myInterest/:user', function(req, res, next){
    const query = {'username':req.params.user};
    User.find(query).then(function(results){
      res.send(results[0].interests);
    });
})

app.get('/api/allInterests', function(req, res, next){
    const query = {};
	var allInterests = [];
    User.find(query).then(function(results){
		for( var i=0; i< results.length; i++){
			allInterests = allInterests.concat(results[i].interests)
		}
      res.send(allInterests);
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
		  "isLikedBy": ['jinyiabc1'],
          "imageUrl":"../assets/data/cow.jpg"
      },
      {
          "title":"Win baby yeah!",
		  "isLikedBy": ['jinyiabc1'],
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
		  "isLikedBy": ['jinyiabc1'],
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
		  "isLikedBy": ['jinyiabc1'],
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"Win baby yeah!",
		  "isLikedBy": ['jinyiabc1'],
          "imageUrl":"../assets/data/winbaby.jpg"
      },
      {
          "title":"A winner is you!",
		  "isLikedBy": ['jinyiabc1'],
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
