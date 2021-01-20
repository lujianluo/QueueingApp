<template>
    <h1>
    this is page {{RestaurantId}}
    </h1>
</template>

<script>
export default {
    data(){
        return{
            RestaurantId: this.$route.params.RestaurantId,
            }
    }
}
</script>