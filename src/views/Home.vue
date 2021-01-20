<template>
<v-app>
  <v-app-bar
  app
  color=blue
  >
    <span
    style="margin: auto">
    DonQ
    </span>
  </v-app-bar>
  <v-main>
    <v-text-field
    label="Enter RestaurantId Here"
    :rules="rules"
    hide-details="auto"
    v-model="RestaurantId"
    >
    </v-text-field>
    <v-btn
    rounded
    color="primary"
    @click="ToRestaurantPage">
    Go
    </v-btn>
  </v-main>
</v-app>

</template>

<script>
export default {
    data: () => ({
      rules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^[0-9]\d*$|^$/
          return pattern.test(value) || 'Numbers Only'
        }
      ],
      Code:"",
      RestaurantId:"",
    }),
    methods: {
      ToRestaurantPage(){
        this.$router.push({ name: 'RestaurantPage', params: { RestaurantId: this.RestaurantId}})
      }
    }
  }
</script>
