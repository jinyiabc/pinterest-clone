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
  // require('connect-ensure-login').ensureLoggedIn(),
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

app.post('/api/:liker/islikedby', function(req, res, next){
	const query_likers = { 'username':req.body.owner,
					   'interests':{
								$all:[
									  {"$elemMatch": { "isLikedBy":req.params.liker, 'title': req.body.title}}
									 ]
							  }
					 };

	const query = {
		'username': req.body.owner,
		'interests.title': req.body.title
		};
	User.findOne(query_likers).then(function(result){
		if(result){
			console.log('you have already liked!');
			// res.send('you have already liked!');
			const update ={
				$set:{'interests.$.isLiked': req.body.isLiked},
				$pull:{'interests.$.isLikedBy': req.params.liker}
			};
			User.updateOne(query, update, {upsert:true}).then(function(){
				User.findOne(query).then(function(user){
					res.send(user);
				});
		}).catch(next);
		} else {
			const update = {
				$push:{'interests.$.isLikedBy': req.params.liker},
				$set:{'interests.$.isLiked': req.body.isLiked}
			};
			User.updateOne(query, update, {upsert:true}).then(function(){
				User.findOne(query).then(function(user){
					res.send(user);
				})
			}).catch(next);
		}
	});
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
    const query = {'username':'test'};
  const update = {interests:
      [{
          "title":"Follow Me",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/428539/pexels-photo-428539.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "title":"Bali",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/175658/pexels-photo-175658.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "title":"Angel",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/915051/pexels-photo-915051.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "title":"Mirror",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/678640/pexels-photo-678640.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "title":"Merry Chrismas",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/688012/pexels-photo-688012.jpeg?auto=compress&cs=tinysrgb&h=350"
      },
      {
          "title":"Boy",
		  "owner":"test",
		  "isLikedBy": ['jinyiabc1'],
		  "isLiked": false,
          "imageUrl":"https://images.pexels.com/photos/715546/pexels-photo-715546.jpeg?auto=compress&cs=tinysrgb&h=350"
      }
  ]};

    User.findOneAndUpdate(query,{$push:update},{upsert: true}).then(function(){   //upsert: bool - creates the object if it doesn't exist. defaults to false.

      User.findOne(query).then(function(user){
        res.send(user);
      })
    }).catch(next);


})


}
