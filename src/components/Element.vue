<template>
  <div class="py-2 px-4">
    <v-card>
      <v-card-title>
        <span v-if="!keyword || favorites">{{ item.name }}</span>
        <span v-else-if="keyword && !favorites">
          <Highlighter
            highlightClassName="highlight"
            :searchWords="[keyword]"
            :textToHighlight="item.name"
          />
        </span>
        <v-spacer></v-spacer>
        <v-btn v-if="!favorites" @click="$store.dispatch('addFavorites', item.id)">
          В избраное
        </v-btn>
        <v-btn v-if="favorites" @click="$store.dispatch('removeFavorites', item.id)">
          Удалить
        </v-btn>
      </v-card-title>
      <v-card-subtitle :class="{ 'pb-0': keyword }">{{ item.id }}</v-card-subtitle>
      <v-card-subtitle v-if="keyword" class="pt-0">Вхождений: {{ item.matches }}</v-card-subtitle>
      <v-row 
        v-if="item.items && item.items.length > 0"
        class="px-4 pb-1"
        no-gutters
      >
        <v-col
          v-for="(subItem, index_subItem) in item.items"
          :key="index_subItem"
          cols="12"
          class="py-1 px-0"
        >
          <v-card>
            <v-card-title>
              <span v-if="!keyword || favorites">{{ subItem.name }}</span>
              <span v-else-if="keyword && !favorites">
                <Highlighter
                  highlightClassName="highlight"
                  :searchWords="[keyword]"
                  :textToHighlight="subItem.name"
                />
              </span>
            </v-card-title>
            <v-card-subtitle>{{ subItem.id }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import Highlighter from 'vue-highlight-words'

export default {
  props: [ 'item', 'favorites'],
  components: {
    Highlighter
  },
  computed: {
    keyword() {
      return this.$store.getters.getSearch
    }
  }
}
</script>
