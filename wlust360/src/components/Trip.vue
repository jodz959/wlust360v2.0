<template lang="pug">
   .card-text-white.bg-pink.mb-3
      .card-header {{ trip.title }}
      .card-body
         h2.title {{ trip.dest }}
         h2.title {{ trip.start }} - {{ trip.end }}
         h2.card-text Add some events to your trip 
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
