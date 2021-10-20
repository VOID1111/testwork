<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        TestWork
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/" exact text color="white">
        Главная
      </v-btn>
      <v-btn to="/history" exact text color="white">
        История
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
  computed: {},
  created() {
    // Загружаем список данных
    this.$store.dispatch('loadData')

    // Проверяем избраное в куках
    let favorites = this.$cookies.get('favorites')
    if (favorites) {
      favorites = JSON.parse(favorites)
      this.$store.commit('setFavorites', favorites)
    }

    // Проверяем историю в куках
    let history = this.$cookies.get('history')
    if (history) {
      history = JSON.parse(history)
      this.$store.commit('setHistory', history)
    }
  }
};
</script>
