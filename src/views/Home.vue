<template>
  <v-row class="pa-3">
    <v-col cols="6" class="pb-0">
      <Elements />
    </v-col>
    <v-col cols="6" class="pb-0">
      <Favorites />
    </v-col>
  </v-row>
</template>

<script>
import Elements from '@/components/Elements.vue'
import Favorites from '@/components/Favorites.vue'

export default {
  name: 'Home',
  components: {
    Elements,
    Favorites
  }
}
</script>
