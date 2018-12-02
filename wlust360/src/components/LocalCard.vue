<template lang="pug">
   .card-text-white.mb-3.trip-card(:class="'bg-' + local.color")
      .card-header.trip-card-title.local-card-header {{ local.title }}
      img.local-img(:src="getUrl(local.imgSrc)")
      .card-body.local-card-body
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
    getUrl(url) {
      const images = require.context('../assets/', true, /\.png$/)
      return images('./' + url)
    }

  }
}
</script>

