const controller = require("../controllers/movies.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      );
    // console.log(controller);
    next();
  });

  app.post(
    "/db/movie/test_add",
    function (req, res) {
      // [authJwt.verifyToken],
      console.log("made it to the routes test_add..."),
      controller.test_add(req, res)
    }
  );
    
  app.post(
      "/db/movie/test_connect", 
      function (req, res) {
        console.log("made it to the routes test_connect..."),
        // [authJwt.verifyToken],
        controller.test_connect(req, res)
    }
    );

  app.post(
      "/db/movie/list_all",
      function (req, res) {
        // [authJwt.verifyToken],
        console.log("made it to the routes list_all`..."),
        controller.list_all(req, res)
      }
    );
};