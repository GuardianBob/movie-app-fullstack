<template>
  <q-page>
    <div id="app" class="row justify-center text-center">
      <div class="col-12 text-center">
        <h2 class="text-center mt-5">{{ page_name }}</h2>
        <p>Keep up with the hottest movies that are trending this week.</p>
      </div>
    </div>
    <div class="row justify-around">
      <div class="col-12 my-4 text-center">
        <q-btn class="q-ma-sm btn-cstm-w-3rd" size="md" color="primary" @click="getTrendingMovies('day')">
          Trending Today
        </q-btn><br />
        <q-btn class="q-ma-sm btn-cstm-w-3rd" size="md" color="primary" @click="getTrendingMovies('week')">
          Trending This Week
        </q-btn><br />
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-5 text-center">
        <q-card>
          <q-card-section class="">
            <q-input class="" outlined v-model="title" input-class="text-center" type="text" dense />
            <q-btn class="q-my-sm btn-cstm-w-full" size="md" color="primary" @click="test_movie()">
              Add Movie
            </q-btn><br />
            <q-btn class="q-my-sm btn-cstm-w-full" size="md" color="primary" @click="test_connect()">
              Test DB Connection
            </q-btn><br />
            <q-btn class="q-my-sm btn-cstm-w-full" size="md" color="primary" @click="list_all()">
              List All Movies
            </q-btn><br />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="(movie, i) in movies" :key="i">
        <movie-card :movie="movie" />
      </div>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineComponent, ref } from 'vue'
import MovieCard from 'components/MovieCard.vue';
import APIService from '../../services/api'
import { useQuasar } from "quasar";
export default defineComponent({
  name: "App",
  components: {
    MovieCard,
  },
  data() {
    const $q = useQuasar();
    $q.dark.set(true);
    return {
      page_name: "Movies",
      movies: [],
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
      let test_data = { title: this.title }
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
    // this.getTrendingMovies("day");
  },
})
</script>