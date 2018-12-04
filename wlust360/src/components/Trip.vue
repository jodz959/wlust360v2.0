<template lang="pug">
   router-link.card-link(:to="{ name: 'TripSummary', params: { trip: trip.slug } }")
      .card-text-white.bg-success.mb-3.trip-card(@click="redirect(trip)")
         .card-header.trip-card-title {{ trip.title }}
         .card-body
            h2.title {{ trip.dest }}
            h2.title 
               span {{ trip.start | moment("dddd, MMMM Do YYYY") }} - 
               span {{ trip.end | moment("dddd, MMMM Do YYYY") }}
            button.btn.btn-warning View Trip 
</template>

<script>
export default {
  name: 'Trip',
  props: {
   trip: {
     type: Object,
     default: function () {}
    }
  }
}
</script>
