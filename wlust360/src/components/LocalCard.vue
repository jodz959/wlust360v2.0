<template lang="pug">
   .card-text-white.mb-3.trip-card(:class="'bg-' + local.color")
      .card-header.trip-card-title.local-card-header {{ local.title }}
      .card-body.local-card-body
         img(:src="getImageUrl(local.imgSrc)")
         h2.title.local-card-number {{ local.number }}
         p.card-text
            | {{ local.text }}
</template>
<script>

export default {
  name: 'LocalCard',
  props: {
   local: {
     type: Object,
     default: function () {}
    }
  },
  methods: {
    getImageUrl(url) {
       return require(""+url)
    }
  }
}
</script>

