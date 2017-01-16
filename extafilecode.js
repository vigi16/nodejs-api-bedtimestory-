

app.post('/getstories',function(req,res){

  db.query('SELECT * FROM story WHERE storyname="'+req.body.storyname+'"',function(err,data){
    if(err){
      return res.status(400).send({message:'query problem 1',success:false});
    }else{
      return res.status(400).send({message:'name of the story already exists',success:false});
    }
  });

  db.query('SELECT * FROM story WHERE storydescription="'+req.body.storydescription+'"',function(err,data){
    if(err){
      return res.status(400).send({message:'query problem 2',success:false});
    }else{
      return res.status(400).send({message:'description of the story already present',success:false});
    }
  });

  db.query('SELECT * FROM story WHERE storyimage="'+req.body.storyimage+'"',function(err,data){
    if(err){
      return res.status(400).send({message:'query problem 3',success:false});
    }else{
      return res.status(400).send({message:'image path for story already exist',succes:false});
    }
  });

  var story ={
    storyname : req.body.storyname,
    storydescription :req.body.storydescription,
    storyimage : req.body.storyimage
  }
  db.query('INSERT INTO story SET ?',story,function(err,data){
    if(err){
      return res.status(400).send({message:'query problem 4',succes:false});
    }else{
      return res.status(200).send({message:'data added',succes:true});
    }

  });



});


app.post('/gets',function(req,res){


  db.query('SELECT * FROM story where storyname="'+req.body.storyname+'"',function(err,data){
        if(data){
              return res.json({message:'name already exist',success:false});
        }
			});

	db.query('SELECT * FROM story WHERE storydescription="'+req.body.storydescription+'"',function(err,datad){
						if(datad){
					 				res.send({message:'description already exist',success:false});
						}
					});
});
