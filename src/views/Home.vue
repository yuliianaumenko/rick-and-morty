<template>
  <div class="home">
    <ul>
      <li :key="episode.id" v-for="episode in episodes">
        <router-link :to="{ name: 'episode', params: { id: episode.id } }">
          <span>{{ episode.episode }}; </span>
          <span>{{ episode.name}}</span>
        </router-link>
      </li>
    </ul>
    <a 
      v-if="paginationNext" 
      @click.prevent="loadMoreEposides" 
      href="/"
    >
      load more...
    </a>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      episodes: [],
      paginationNext: {},
    };
  },
  methods: {
    async loadEposides(url) {
      try {
        const { data } = await axios.get(url);

        return {
          episodes: data.results,
          paginationNext: data.info.next,
        };
      } catch (e) {
        // CORS on external API does not setted up
        // So in case of error redirect to 404 without error status checking
        return this.$router.push({
          name: 'not-found',
        });
      }
    },
    async loadMoreEposides() {
      const { episodes, paginationNext } = await this.loadEposides(
        this.paginationNext,
      );

      this.episodes = [...this.episodes, ...episodes];
      this.paginationNext = paginationNext;
    },
  },
  async created() {
    const { episodes, paginationNext } = await this.loadEposides(
      'https://rickandmortyapi.com/api/episode',
    );

    this.episodes = episodes;
    this.paginationNext = paginationNext;
  },
};
</script>

<style scoped>
.home {
  position: relative;
  opacity: 0.5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.home > a {
  margin-top: 20px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: center;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  border: 2px solid white;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
}

li a {
  text-decoration: none;
  font-weight: 800;
  font-size: 16px;
}
</style>
