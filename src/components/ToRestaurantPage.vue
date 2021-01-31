<template>
<div class="ToRestaurantPage">
  <v-main>
    <v-img :src="Logo" style="width: 150px; height:100px; display: inline-block;"></v-img>
    <v-container>
      <v-text-field
      label="Restaurant ID"
      hide-details="auto"
      v-model="UserInput"
      outlined
      type="number"
      ></v-text-field>
      <br>
      <v-btn
      depressed
      color="primary"
      @click="ToRestaurantPage"
      block>
      Enter
      </v-btn>
    </v-container>
  </v-main>
  <v-container class="footer">
      <h4>Join us here!<br>
      <router-link :to="'LoginPage'">Login</router-link>
      ||
      <router-link :to="'RegisterPage'">Register</router-link>
      </h4>
  </v-container>
</div>

</template>

<script>
export default {
    name: "ToRestaurantPage",
    props: ['RestaurantId'],
    data: () => ({
      UserInput:"",
      Logo: require('../assets/logo.png')
    }),
    methods: {
      ToRestaurantPage(){
        this.$router.push({ name: 'RestaurantPage', params: { RestaurantId: this.UserInput}})
      }
    }
  }
</script>
<style>
.ToRestaurantPage{
  width: 75%;
  max-width: 400px
}
.v-main{
  height:90vh;
  display:flex;
  align-items: center;
  text-align: center
}
.footer{
  height:10vh;
  display: flex;
  justify-content: center;
}

</style>