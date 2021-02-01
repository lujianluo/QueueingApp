<template>
  <div class="HomePage" style="background-image: url('https://media.giphy.com/media/oNTQZNB67kMf5VHiCj/giphy.gif'); background-size: 100% 100%;">
    <ToRestaurantPage/>
  </div>
</template>

<script>
import ToRestaurantPage from '../components/ToRestaurantPage'

export default {
    name: "HomePage",
    components:{
      ToRestaurantPage,
    },
    data(){
      return{
         
      }
    }
  }
</script>
<style>
.HomePage{
  display: flex;
  justify-content: center;
}

</style>
