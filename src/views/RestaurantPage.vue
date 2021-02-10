<template>
  <div class="Restaurant" style="background-image: url('https://images.unsplash.com/photo-1547623641-d2c56c03e2a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'); background-size: 100% 100%;">
    <QueueDisplay :RestaurantId = "RestaurantId" />
    <GetTicketBtn :RestaurantId = "RestaurantId"/>
    <CheckQueueNumber :RestaurantId = "RestaurantId"/>
    <ShowMenu :RestaurantId = "RestaurantId"/>
    <ShowReview :RestaurantId = "RestaurantId"/>
  </div>
</template>

<script>

import QueueDisplay from '../components/QueueDisplay'
import GetTicketBtn from '../components/GetTicketBtn'
import CheckQueueNumber from '../components/CheckQueueNumber'
import ShowMenu from '../components/ShowMenu'
import ShowReview from '../components/ShowReview'

export default {
  name: "RestaurantPage",
  components: {
    QueueDisplay,
    GetTicketBtn,
    CheckQueueNumber,
    ShowMenu,
    ShowReview
  },
  data(){
    return{
      RestaurantId: this.$route.params.RestaurantId
    }
  }
}
</script>
<style>
.Restaurant{
  height:100vh;
}
</style>

