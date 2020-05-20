import Vue from 'vue'
import Vuex from 'vuex'
import { items } from './items.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items,
    totalValue: 90000000000,
    shoppingSpree: []
  },
  mutations: {
    'BUY_ITEMS' (state, newTotalValue) {
      state.totalValue = newTotalValue
    },
    'SELL_ITEMS' (state, { price, quantity }) {
      const value = +state.totalValue
      let calc = 0
      if (quantity) {
        calc = value + price * quantity
      } else {
        calc = value + price
      }
      state.totalValue = calc
    },
    'RESET_VALUE' (state) {
      state.totalValue = 90000000000
    },
    'SET_SHOPPING_SPREEE' (state, item) {
      state.shoppingSpree = item
    }
  },
  actions: {
    buyItems ({ commit }, newTotalValue) {
      commit('BUY_ITEMS', newTotalValue)
    },
    sellItems ({ commit }, item) {
      commit('SELL_ITEMS', item)
    },
    resetValue ({ commit }) {
      commit('RESET_VALUE')
    },
    setShoppingSpree ({ commit }, item) {
      commit('SET_SHOPPING_SPREEE', item)
    }
  },
  modules: {
  }
})
