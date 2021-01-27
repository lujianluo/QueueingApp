<template>
  <div>
    <ToRestaurantPage/>
    <ToLogin/>
  </div>
</template>

<script>
import ToRestaurantPage from '../components/ToRestaurantPage'
import ToLogin from '../components/ToLogin'

export default {
    name: "MainPage",
    components:{
      ToRestaurantPage,
      ToLogin
    }
  }
</script>
