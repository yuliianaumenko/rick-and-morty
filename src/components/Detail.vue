<template>
  <section class="detail" v-show="isBlockShown">
    <aside>
      <h3>{{name}}</h3>
      <p>species: {{species}}</p>
      <p>gender: {{gender}}</p>
      <p>created: {{dateCreated}}</p>
    </aside>
    <section class="image-wrapper">
      <img 
        :src="image"
        :class="{ 'avatar-dead': isDead }"
        @load="onLoadImage"
        alt="episode image"
        width="150"
        height="150"
      />
      <div 
        v-if="isDead" 
        class="dead-info"
      >
        Dead
      </div>
    </section>
  </section>
</template>

<script>
import formatDate from '@/helpers/formatDate';

export default {
  name: 'Details',
  data() {
    return {
      isBlockShown: false,
    };
  },
  props: {
    name: String,
    status: String,
    species: String,
    gender: String,
    image: String,
    created: String,
  },
  methods: {
    async onLoadImage() {
      this.isBlockShown = true;
    },
  },
  computed: {
    isDead() {
      return this.status === 'Dead';
    },
    dateCreated() {
      return formatDate(this.created);
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px;
  box-shadow: 5px 5px 20px 5px rgba(255, 255, 255, 0.3);
  background-color: lightgray;
  color: black;
}

.image-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

img {
  border-radius: 50%;
}

.avatar-dead {
  filter: brightness(30%);
}

.dead-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 34px;
}
</style>
