<template>
  <div class="shopping-spree">
    <h2 style="width:100%;text-align:center">Your Shopping Spree</h2>
    <div class="box-item-shopping" v-for="item in shoppingSpree" :key="item.name">
      <div class="box-item-container">
        <img :src="item.img" :alt="item.name" style="float:left" />
        <span> {{item.name}} <b> x {{item.quantity}}</b></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  computed: {
    ...mapState(['shoppingSpree'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./style.scss" lang="scss">

</style>
