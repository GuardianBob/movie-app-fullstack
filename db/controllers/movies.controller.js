
var Datastore = require('nedb')
movies = new Datastore({ filename: './db/databases/movies.db', autoload: true });

exports.test_add = async (req, res) => {
  try {
    console.log(req.params, req.query, req.body);
    let new_movie = {
      title: req.body.title
    };

    movies.insert(new_movie, function (err, newMovie) {
      console.log('Inserted', newMovie.title, 'with ID', newMovie._id);
    })
    
    res.send("Movie Added!");
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};

exports.list_all = async (req, res) => {
  try {
    console.log(req.params, req.query, req.body);

    // let all_movies = await movies.find({}, function (err, all) {
    // })

    await movies.find({}, function (err, all) {
      console.log(all);
      res.status(200).send(all);
    })
    
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};

exports.test_connect = async (req, res) => {
  try {
    console.log(req.params, req.query, req.body);
    console.log("hit the new controller!");
    // console.log('trying to connect db: ', db);
    // const new_movie = await movie.create({ title: req.body.title }); 

    
    res.send("Backend connection success!");
  } catch (error) {
    console.log(`Error: ${error}`)
  }
};