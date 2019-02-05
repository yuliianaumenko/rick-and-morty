<template>
  <div id="app">
    <header>
      <router-link to="/">Rick and Morty eposides</router-link>
    </header>
    <section>
      <router-view/>
    </section>
  </div>
</template>

<style>
a {
  color: white;
}
</style>

<style scoped>
#app {
  font-family: Rock Salt, cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  background-image: linear-gradient(
    to bottom,
    grey,
    black,
    black,
    black,
    black
  );
}

header {
  background-color: black;
  padding: 10px 20px;
}

header a {
  font-size: 20px;
  text-decoration: none;
  color: #1e96aa;
  font-weight: 600;
}

section {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  z-index: 1;
}
</style>
