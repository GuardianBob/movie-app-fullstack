<template>
  <q-page>
    <div id="app" class="row justify-center text-center">
      <div class="col-12 text-center">
        <h2 class="text-center mt-5">{{ page_name }}</h2>
        <p>Keep up with the hottest movies that are trending this week.</p>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-10 text-center">
        <div class="row justify-center">
          <!-- <q-form @submit="get_random()" @reset="clear()" class="q-gutter-md"> -->
            <q-select outlined v-model="year_start" :options="years" label="Start Year" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="year_end" :options="years" label="End Year" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="genre" :options="genres" multiple label="Genre" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="rating" :options="rating_options" label="Minimum Rating" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="sort" :options="sort_options" label="Sort By" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="country" :options="countries" label="Country of Origin" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="type" :options="type_options" label="Type" dense class="btn-cstm-w-300 q-ma-sm" />

          <!-- </q-form> -->
        </div>
        <q-btn class="q-my-sm btn-cstm-w-3rd" size="md" color="primary" @click="test_connect()">
          List Random Movies
        </q-btn><br />
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
import mOptions from "../assets/options"
export default defineComponent({
  name: "Random",
  components: {
    MovieCard,
  },
  data() {
    const $q = useQuasar();
    $q.dark.set(true);
    return {
      page_name: "Random",
      movies: [],
      apiKey: process.env.TMDB_API,
      title: ref(""),
      countries: ref(["USA", "Japan"]),
      country: ref(),
      type_options: ref(["Movie", "Series"]),
      type: ref(),
      years: ref([]),
      year_start: ref(),
      year_end: ref(),
      genres: ref([]),
      genre: ref(),
      rating_options: ref([]),
      rating: ref(),
      sort_options: ref([]),
      sort: ref(),
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
    test_connect() {
      // test_add(test_data);
      APIService.test_connect()
        .then((response) => {
          console.log(response.data)
        })
    },  
    async list_years() {
      var start = (new Date("01 Jan 1960")).getFullYear();
      var end = (new Date()).getFullYear();
      for (let i = end; i >= start; i--) this.years.push(i);
    },
    async get_options() {
      console.log(mOptions.genres);
      this.genres = Object.keys(mOptions.genres);
      this.sort_options = Object.keys(mOptions.sortBy)
      this.countries = Object.keys(mOptions.country)
    }
  },
  mounted() {
    // this.getTrendingMovies("day");
    this.list_years();
    for (let i = 10; i >= 0; i--) this.rating_options.push(i);
    this.get_options();
  },
})
</script>