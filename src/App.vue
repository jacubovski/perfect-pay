<template>
  <div id="app" class="layout">
    <Header />
    <Profile />
    <p class="total-money" id="myHeader">
      $ {{totalValue}} left
    </p>
    <Items :items="items" :totalValue="totalValue"/>
    <ShoppingSpree />
  </div>
</template>
<script>
import Header from './components/Header/Header'
import Profile from './components/Profile/Profile'
import Items from './components/Items/Items'
import ShoppingSpree from './components/ShoppingSpree/ShoppingSpree'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      quantity: null,
      items: [],
      shoppingSpree: [],
      itensShoppingSpree: [],
      header: null,
      sticky: null,
      pageXOffset: 0,
      defaultValue: 90000000000
    }
  },
  mounted () {
    this.items = this.$store.state.items
    this.header = document.getElementById('myHeader')
    this.sticky = this.header.offsetTop
    window.addEventListener('scroll', this.fixValue)
    this.fixValue()
  },
  components: {
    Header,
    Profile,
    Items,
    ShoppingSpree
  },
  methods: {
    fixValue () {
      if (window.pageYOffset > this.sticky) {
        this.header.classList.add('sticky')
      } else {
        this.header.classList.remove('sticky')
      }
    }
  },
  computed: {
    ...mapState(['totalValue'])
  }
}
</script>
<style src="./style.scss" lang="scss">
</style>
