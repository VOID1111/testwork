<template>
  <div class="py-2 px-4">
    <v-card>
      <v-card-title>{{ item.element.name }}</v-card-title>
      <v-card-subtitle class="pb-1">{{ item.element.id }}</v-card-subtitle>
      <v-card-subtitle class="pt-1 pb-0">Время: {{ getTime(item.id) }}</v-card-subtitle>
      <v-card-subtitle class="pt-1">Действие: {{ actions[item.action] }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      actions: {
        add: 'Добавлено',
        remove: 'Удалено'
      }
    }
  },
  methods: {
    getTime(time) {
      let date = new Date(time)
      return date.toLocaleString('ru', {weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'})
    }
  }
}
</script>