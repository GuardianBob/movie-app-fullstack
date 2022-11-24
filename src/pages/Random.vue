<template>
  <q-page>
    <div id="app" class="row justify-center text-center">
      <div class="col-12 text-center">
        <h2 class="text-center mt-5">{{ page_name }}</h2>
        <p>Keep up with the hottest movies that are trending this week.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div class="row justify-center">
          <!-- <q-form @submit="get_random()" @reset="clear()" class="q-gutter-md"> -->
            <q-select outlined v-model="genre" :options="genre_options" label="Genre" dense class="btn-cstm-w-300 q-ma-sm" />
            <q-select outlined v-model="rating" :options="rating_options" label="rating" dense class="btn-cstm-w-300 q-ma-sm" />
            
          <!-- </q-form> -->
        </div>
      </div>
    </div>
    <q-btn class="q-my-sm btn-cstm-w-full" size="md" color="primary" @click="list_all()">
      List All Movies
    </q-btn><br />
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
  },
  mounted() {
    // this.getTrendingMovies("day");
  },
})
</script>