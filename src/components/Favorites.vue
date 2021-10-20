<template>
  <v-card>
    <v-card-title>Избранные: {{ getFavoritesLength }}шт</v-card-title>
    <v-row class="pa-0 ma-0">
      <VueAutoVirtualScrollList
        :totalHeight="$getHeightVirtualScrollElements(153)"
        :defaultHeight="80"
        :extraItems="1"
        style="width: 100%;"
      >
        <Element
          v-for="(item, index_item) in getFavoritesList"
          :key="index_item"
          :item="item"
          :favorites="true"
        />
      </VueAutoVirtualScrollList>
    </v-row>
  </v-card>
</template>

<script>
import VueAutoVirtualScrollList from 'vue-auto-virtual-scroll-list'
import Element from '@/components/Element.vue'

export default {
  name: 'Favorites',
  components: {
    VueAutoVirtualScrollList,
    Element
  },
  data() {
    return {}
  },
  computed: {
    getFavoritesList() {
      return this.$store.getters.getFavoritesList
    },
    getFavoritesLength() {
      return this.getFavoritesList.length
    }
  }
}
</script>