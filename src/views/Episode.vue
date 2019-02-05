<template>
  <section class="episode">
    <section class="episode-info">
      <h1>Episode: {{episode.episode}}</h1>
      <p>name: {{ episode.name}}</p>
      <p>air date: {{episode.air_date}}</p>
      <p>amount of characters: {{ episode.characters.length }}</p>
      <p>created: {{dateCreated}}</p>
    </section>
    <a 
      v-if="!details.length" 
      @click.prevent="getEpisodeInfo" 
      href="/"
      class="load-characters"
    >
      load characters
    </a>
  
    <section class="characters" v-else>
      <ul>
        <li :key="detail.id" v-for="detail in details">
          <Detail v-bind="detail" />
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import axios from 'axios';
import Detail from '@/components/Detail.vue';
import formatDate from '@/helpers/formatDate';

export default {
  name: 'home',
  components: {
    Detail,
  },
  data() {
    return {
      episode: {
        characters: {
          length: 0,
        },
      },
      details: [],
    };
  },
  async created() {
    try {
      const { id } = this.$route.params;
      const { data } = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`,
      );

      this.episode = data;
    } catch (e) {
      // CORS on external API does not setted up
      // So in case of error redirect to 404 without error status checking
      this.$router.push({
        name: 'not-found',
      });
    }
  },
  methods: {
    async getEpisodeInfo() {
      const { characters } = this.episode;
      this.details = [];
      const charsPromises = characters.map(async char => {
        const { data } = await axios.get(char);

        this.details = [...this.details, data];

        return data;
      });

      Promise.all(charsPromises);
    },
  },
  computed: {
    dateCreated() {
      return formatDate(this.episode.created);
    },
  },
};
</script>

<style scoped>
.episode {
  padding-top: 50px;
}

.episode-info {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 0 20px;
  width: 70%;
  border: 2px solid grey;
  padding-bottom: 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}

h1 {
  color: #1e96aa;
}

ul {
  list-style-type: none;
}

ul,
li {
  margin: 0;
  padding: 0;
}

.episode {
  text-align: center;
  font-size: 24px;
}

.characters {
  margin-top: 40px;
  text-align: left;
  font-size: 16px;
}

.characters ul {
  display: flex;
  flex-wrap: wrap;
}

.characters li {
  flex: 0 33.33%;
  box-sizing: border-box;
  padding: 20px;
}

p {
  margin-bottom: 10px;
}

.load-characters {
  margin-top: 40px;
  color: grey;
  font-size: 18px;
}
</style>
