<template>
    <div>

    </div>
</template>

<script>
export default {
    name: "CheckQueueNumber",
    props: ['RestaurantId'],
    data(){
        return{
            rules: [
                value => !!value || 'Required.',
                value => {
                    const pattern = /^[0-9]\d*$|^$/
                    return pattern.test(value) || 'Numbers Only'
                },
                value => (value && value.length == 8) || 'Eight Number needed',
            ],
        }
    }
}
</script>