import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    search: '',
    sortBy: 'ascending',
    favorites: [],
    history: [],
    historyTab: 'all'
  },
  getters: {
    getData: state => { return state.data },
    getSearch: state => { return state.search },
    getSortBy: state => { return state.sortBy },
    getFiltredData: state => {
      let data = state.data
      let search = state.search.toLowerCase()
      let sortBy = state.sortBy
      let favorites = state.favorites
      let regexp = RegExp(`${search}`, 'g')

      if (search && search.length > 0) {
        let newData = []

        for (let key in data) {
          let item = data[key]
          let newItem = { ...item, matches: 0 }

          let itemName = item.name.toLowerCase()
          let matchesArray = [...itemName.matchAll(regexp)]
          newItem.matches = newItem.matches + matchesArray.length

          if (newItem.items) {
            for(let subKey in newItem.items) {
              let subItem = newItem.items[subKey]
              let subItemName = subItem.name.toLowerCase()
              let subMatchesArray = [...subItemName.matchAll(regexp)]
              newItem.matches = newItem.matches + subMatchesArray.length
            }
          }

          if (newItem.matches > 0) {
            newData.push(newItem)
          }
        }
        data = newData.sort((a,b) => {
          if (sortBy === 'ascending') {
            return b.matches - a.matches;
          } else if (sortBy === 'descending') {
            return a.matches - b.matches;
          }
        })
      }

      // Вычищаем избранные
      let newData = []
      for (let key in data) {
        let item = data[key]
        if (!favorites.includes(item.id)) {
          newData.push(item)
        }
      }

      return newData
    },

    // favorites
    getFavorites: state => { return state.favorites },
    getFavoritesList: state => {
      let arr = []
      for (let key in state.favorites) {
        let id = state.favorites[key]
        let find = state.data.find(x => x.id === id)
        if (find) {
          arr.push(find)
        }
      }
      return arr
    },

    // history
    getHistory: state => {
      let arr = []
      let history = state.history
      let tab = state.historyTab

      for (let key in history) {
        let item = history[key]
        if (tab === 'all' || item.action === tab) {
          let find = state.data.find(x => x.id === item.element)
          if (find) {
            arr.push({ ...item, element: find })
          }
        }
      }

      arr = arr.sort((a,b) => {
        return new Date(b.id) - new Date(a.id) // id это и id и timestamp одновременно
      })

      return arr 
    },
    getHistoryTab: state => { return state.historyTab },
  },
  mutations: {
    setData(state, data) {
      state.data = data
    },
    setSearch(state, data) {
      state.search = data
    },
    setSortBy(state, data) {
      state.sortBy = data
    },

    // favorites
    setFavorites(state, data) {
      state.favorites = data
    },
    addFavorites(state, data) {
      state.favorites.push(data)
      Vue.$cookies.set('favorites', JSON.stringify(state.favorites))
    },
    removeFavorites(state, data) {
      let indexInArr = state.favorites.findIndex(x => x === data)
      if (indexInArr != undefined) {
        state.favorites.splice(indexInArr, 1)
        Vue.$cookies.set('favorites', JSON.stringify(state.favorites))
      }
    },

    // history
    setHistory(state, data) {
      state.history = data
    },
    addHistory(state, data) {
      state.history.push(data)
      Vue.$cookies.set('history', JSON.stringify(state.history))
    },
    setHistoryTab(state, data) {
      state.historyTab = data
    }
  },
  actions: {
    async loadData({ commit }) {
      try {
        let req = await axios.get(
          'https://api.jsonbin.io/v3/b/616fd45f4a82881d6c62cbec',
          {
            headers: {
              'X-Master-Key': '$2b$10$YkBclS9kRrYVt1akt8QnDePQaWv9AqKtCudhYKVVjobDASZMvnH7q'
            }
          }
        )
        if (req.status === 200) {
          commit('setData', req.data.record)
        }
      } catch(err) {
        console.log(err)
      }
    },
    addFavorites({ commit }, data) {
      commit('addFavorites', data)
      commit('addHistory', {
        id: Date.now(),
        action: 'add',
        element: data
      })
    },
    removeFavorites({ commit }, data) {
      commit('removeFavorites', data)
      commit('addHistory', {
        id: Date.now(),
        action: 'remove',
        element: data
      })
    }
  },
})
