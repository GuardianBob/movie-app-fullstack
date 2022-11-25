
// var axios = require('axios');
import axios from 'axios';
import option_list from "../src/assets/options";

class RunService {
  async fetch_random(body) {
    console.log('Hit RunService: ', body)
    let url = ""
    let params
    switch (body.type) {
      case "Movie":
        url = 'https://api.themoviedb.org/3/discover/movie'
        params = await this.get_movie_params(body)
        break;
      case "Series":
        url = 'https://api.themoviedb.org/3/discover/tv'
        params = await this.get_tv_params(body)
        break;
      default:
        url = 'https://api.themoviedb.org/3/discover/movie'
        params = await this.get_movie_params(body)
        break;
    }

    // const params = await this.get_movie_params(body)

    let results = await axios.get(url, {params})
    return (results.data.results)
  }

  // WORKS!!
  fetch_random_webstring(body) {
    console.log('Hit RunService: ', body)
    var config = {
      method: 'get',
      url: 'https://api.themoviedb.org/3/discover/movie?with_genres=28&primary_release_date_gte=2001&release_date_lte=2001&api_key=1185412e00a20896217f777462cbdaff',
      headers: { }
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async get_movie_params(params) {
    // console.log(params)
    let new_params = {}
    new_params["api_key"] = process.env.TMDB_API

    if (params.genres) {
      let genres = []
      await params.genres.forEach((item, index) => {
        // console.log(item, index)
        genres.push(option_list.genres[item])
      })
      new_params["with_genres"] = genres.toString()
    }

    if (params.start_year) new_params["primary_release_date.gte"] = params.start_year
    if (params.end_year) new_params["release_date.lte"] = params.end_year
    if (params.rating) new_params["vote_average.gte"] = params.rating
    if (params.country) new_params["with_original_language"] = option_list.country[params.country]
    if (params.sort_by) new_params["sort_by"] = option_list.sortBy[params.sort_by]   

    return new_params
  }

  async get_tv_params(params) {
    // console.log(params)
    let new_params = {}
    new_params["api_key"] = process.env.TMDB_API

    if (params.genres) {
      let genres = []
      await params.genres.forEach((item, index) => {
        // console.log(item, index)
        genres.push(option_list.genres[item])
      })
      new_params["with_genres"] = genres.toString()
    }

    if (params.start_year) new_params["first_air_date.gte"] = params.start_year
    if (params.end_year) new_params["first_air_date.lte"] = params.end_year
    if (params.rating) new_params["vote_average.gte"] = params.rating
    if (params.country) new_params["with_original_language"] = option_list.country[params.country]
    if (params.sort_by) new_params["sort_by"] = option_list.sortBy[params.sort_by]   

    return new_params
  }

  
}

export default new RunService();