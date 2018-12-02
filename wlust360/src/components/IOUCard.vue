<template lang="pug">
   .card-text-white.bg-success.mb-3.trip-card
      .card-header.trip-card-title 
         span {{ iou.date | moment("dddd, MMMM Do YYYY") }}
      .card-body
         h2.title {{ iou.title }}
         h3.title Total - ${{ iou.total }}
         p.card-text
            | {{ iou.notes }}
      
</template>

<script>
export default {
  name: 'Trip',
  props: {
   iou: {
     type: Object,
     default: function () {}
    }
  }
}
</script>
