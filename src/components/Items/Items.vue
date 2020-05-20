<template>
  <div class="box">
    <div class="box-item" v-for="item in items"  :key="item.name">
      <span><img :src="item.img" :alt="item.name" />
      {{item.name}}</span>
      <span class="price-item">${{item.price}}</span>
      <span class="action">
        <button
        @click="sellItem(item)"
        :class="{'btn-sell':'btn-sell', bgRed: item.quantity}"
        :disabled="!item.quantity"
        >Sell</button>
        <input
        type="text"
        v-model.number="item.quantity"
        @input="buyItem(item)"
        class="quantity"
        placeholder="0"/>
        <button
        @click="btnBuyItem(item)"
        class="btn-buy"
        v-if="item.quantity !== item.max"
        >Buy</button>
      </span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Items',
  props: ['items', 'totalValue'],
  methods: {
    buyItem: _.debounce(function (items) {
      const idxItems = this.getItemIndex(items.name, 'items')
      const { quantity, price } = this.items[idxItems]
      const totalValue = this.totalValue
      const totalAmount = quantity * price
      const newTotalValue = totalValue - totalAmount
      this.$store.dispatch('buyItems', newTotalValue)
    }, 500),
    btnBuyItem (items) {
      const idxItems = this.getItemIndex(items.name, 'items')
      this.items[idxItems].quantity += 1
      const { price } = this.items[idxItems]
      const totalValue = this.totalValue
      const newTotalValue = totalValue - price
      this.handlerShoppingSpreeItem()
      this.$store.dispatch('buyItems', newTotalValue)
    },
    sellItem (items) {
      const idxItems = this.getItemIndex(items.name, 'items')
      this.items[idxItems].quantity -= 1
      const { price } = this.items[idxItems]
      const totalValue = this.totalValue
      const newTotalValue = totalValue + price
      this.handlerShoppingSpreeItem()
      this.$store.dispatch('buyItems', newTotalValue)
    },
    getItemIndex (name, target) {
      let idxItems
      for (const i in this[target]) {
        if (this[target][i].name === name) {
          idxItems = i
        }
      }
      return idxItems
    },
    handlerShoppingSpreeItem () {
      const item = this.items.filter(i => i.quantity)
      const payload = [...item]
      this.$store.dispatch('setShoppingSpree', payload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.scss" lang="scss">

</style>
