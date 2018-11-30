<template lang="pug">
   .card-text-white.bg-success.mb-3.trip-card
      .card-header.trip-card-title {{ trip.title }}
      .card-body
         h2.title {{ trip.dest }}
         h2.title 
            span {{ trip.start | moment("dddd, MMMM do YYYY") }} - 
            span {{ trip.end | moment("dddd, MMMM do YYYY") }}
         router-link(:to="{ name: 'TripSummary', params: { trip: trip.slug.slice(0, -22) } }")
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
