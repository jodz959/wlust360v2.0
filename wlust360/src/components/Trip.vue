<template lang="pug">
   .card-text-white.bg-success.mb-3.trip-card
      .card-header.trip-card-title {{ trip.title }}
      .card-body
         h2.title {{ trip.dest }}
         h2.title 
            span {{ trip.start | moment("dddd, MMMM do YYYY") }} - 
            span {{ trip.end | moment("dddd, MMMM do YYYY") }}
         button.btn.btn-warning Add some events to your trip 
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
