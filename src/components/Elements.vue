<template>
  <v-card>
    <v-card-title>
      Элементы: {{ getFiltredDataLength }}шт.
    </v-card-title>
    <v-row class="px-7">
      <v-text-field
        v-model="search"
        placeholder="Поиск..."
        solo
        class="mr-2"
      />
      <v-btn-toggle v-model="sortBy" borderless>
        <v-btn value="ascending" :disabled="!search || search.length === 0">
          <v-icon>
            mdi-sort-ascending
          </v-icon>
        </v-btn>
        <v-btn value="descending" :disabled="!search || search.length === 0">
          <v-icon>
            mdi-sort-descending
          </v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row class="pa-0 ma-0">
      <VueAutoVirtualScrollList
        :totalHeight="$getHeightVirtualScrollElements(207)"
        :defaultHeight="80"
        :extraItems="1"
        style="width: 100%;"
      >
        <Element
          v-for="(item, index_item) in getFiltredData"
          :key="index_item"
          :item="item"
        />
      </VueAutoVirtualScrollList>
    </v-row>
  </v-card>
</template>

<script>
import VueAutoVirtualScrollList from 'vue-auto-virtual-scroll-list'
import Element from '@/components/Element.vue'

export default {
  name: 'Elements',
  components: {
    VueAutoVirtualScrollList,
    Element
  },
  data() {
    return {
      searchTimeout: null
    }
  },
  computed: {
    getFiltredData() {
      return this.$store.getters.getFiltredData
    },
    getFiltredDataLength() {
      return this.getFiltredData.length
    },
    search: {
      get() {
        return this.$store.getters.getSearch
      },
      set(val) {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
          this.$store.commit('setSearch', val)
        }, 500)
      }
    },
    sortBy: {
      get() {
        return this.$store.getters.getSortBy
      },
      set(val) {
        this.$store.commit('setSortBy', val)
      }
    }
  }
}
</script>
