<template lang="pug">
   .card-text-white.mb-3.trip-card(:class="'bg-' + local.color")
      .card-header.trip-card-title.local-card-header
         img.local-img(:src="getUrl(local.imgSrc)")
         h4 {{ local.title }}
         h2.title.local-card-number {{ local.number }}
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

