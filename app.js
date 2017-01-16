var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// connection to database made
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '12345',
	database : 'bedtime',
	multipleStatements: true
});

db.connect();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/getallstory',function(req,res){
				db.query('SELECT * FROM story',function(err,data){
					if(err){
						return res.json({message:'database is empty',success:false});
					}else{
						return res.json({allstories:data,message:'all story',success:true});
					}
				})
});



app.post('/addstory',function(req,res){

      // db.query('SELECT * FROM story where storyname="'+req.body.storyname+'" or storydescription="'+req.body.storydescription+'" or storyimage="'+req.body.storyimage+'"',function(err,data){
      //       if(err){
      //         return res.json({message:'query problem',success:false});
      //       }else{
			//
      //       if(!data){
      //         return res.json({message:'data already exist',success:false});
      //       }else{

						



              var story ={
                storyname:req.body.storyname,
                storydescription:req.body.storydescription,
                storyimage:req.body.storyimage
              }
              db.query('INSERT INTO story SET ?',story,function(err,data){
                if(err){
									console.log(err);
                  return res.json({message:"data already exists",success:false});
                }else{

                        return res.json({message:"data added",success:true});
                }

              });
          //   }
          // }
            // });

});

app.get('/todaystory',function(req,res){


		db.query('SELECT * FROM story ORDER BY story_id DESC LIMIT 1',function(err,data){
				if(err){
					return res.json({message:'query problem',success:false});
				}
			  else{
					return res.json({todaystoy:data,message:'today story',success:true});
				}
		})
})


app.post('/login',function(req,res){

					if(req.body.adminusername == "admin" && req.body.adminpassword == "admin"){
						console.log(req.body.adminusername);
						console.log(req.body.adminpassword);
						return res.json({message:'successful login',success:true});
					}else{
						return res.json({message:'username and password does not match',success:false});
					}

})



app.post('/delete/:storyname',function(req,res){
	// var query = "SELECT * FROM story WHERE storyname="+req.params.storyname+"; DELETE  FROM story WHERE storyname="+req.params.storyname+";";

		var query = 'DELETE FROM story WHERE storyname="'+req.params.storyname+'"';
			db.query(query,function(err,data){
				if(err){
					return res.json({message:'data not present',success:false});
				}else{
				    return res.json({message:'data deleted',success:true});
				}
			})
})






var port =3000;
app.listen(port,function(){
  console.log('server is running' + port);
})
