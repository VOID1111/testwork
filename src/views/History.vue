<template>
  <v-row class="pa-3 d-flex justify-center">
    <v-col cols="6" class="pb-0">
      <v-card>
        <v-tabs
          v-model="historyTab"
          fixed-tabs
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab class="primary--text" :href="`#all`">
            Вся история
          </v-tab>
          <v-tab class="primary--text" :href="`#add`">
            Добавление
          </v-tab>
          <v-tab class="primary--text" :href="`#remove`">
            Удаление
          </v-tab>
        </v-tabs>
        <v-row class="pa-0 ma-0">
          <VueAutoVirtualScrollList
            :totalHeight="$getHeightVirtualScrollElements(137)"
            :defaultHeight="80"
            :extraItems="1"
            style="width: 100%;"
          >
            <HistoryItem
              v-for="(item, index_item) in getHistory"
              :key="index_item"
              :item="item"
            />
          </VueAutoVirtualScrollList>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueAutoVirtualScrollList from 'vue-auto-virtual-scroll-list'
import HistoryItem from '@/components/HistoryItem.vue'

export default {
  name: 'History',
  components: {
    VueAutoVirtualScrollList,
    HistoryItem
  },
  data() {
    return {
      tabs: 'all'
    }
  },
  computed: {
    historyTab: {
      get() {
        return this.$store.getters.getHistoryTab
      },
      set(val) {
        this.$store.commit('setHistoryTab', val)
      }
    },
    getHistory() {
      return this.$store.getters.getHistory
    }
  }
}
</script>
