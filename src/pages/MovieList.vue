<template>
  <q-page>
    <div id="app" class="row justify-center text-center">
      <div class="col-12 text-center">
        <div class="row">
          <div class="col-4" v-for="(movie, i) in movies" :key="i">
            <movie-card :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineComponent, ref } from 'vue'
import MovieCard from 'components/MovieCard.vue';
import APIService from '../../services/api'
export default defineComponent({
  name: "App",
  components: {
    MovieCard,
  },
  setup() {
    return {
      movies: ref([]),
      apiKey: process.env.TMDB_API,
      title: ref(""),
    };
  },
  methods: {
    getTrendingMovies(category) {
      return fetch(
        `https://api.themoviedb.org/3/trending/movie/${category}?api_key=${this.apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          this.movies = data.results;
          console.log(this.movies);
        });
    },
    test_movie() {
      let test_data = {title: this.title}
      // test_add(test_data);
      APIService.test_add(test_data)
        .then((response) => {
          console.log(response.data)
        })
    }, 
    test_connect() {
      // test_add(test_data);
      APIService.test_connect()
        .then((response) => {
          console.log(response.data)
        })
    }, 
    list_all() {
      // test_add(test_data);
      APIService.list_all()
        .then((response) => {
          console.log(response.data)
        })
    }, 
  },
  mounted() {
    this.getTrendingMovies("day");
  },
})
</script>