<template lang="pug">
   v-navigation-drawer(:mini-variant.sync="mini" v-model="drawer" hide-overlay absolute stateless)
      v-toolbar(flat class="transparent")
         v-list(class="pa-0")
            v-list-tile(avatar)
               v-list-tile-avatar
                  img(src="#")
               v-list-tile-content
                  v-list-tile-title {{ username }}
               v-list-tile-action
                  v-btn(icon @click.stop="mini = !mini")
                     v-icon chevron_left
      v-list(class="pt-0" dense)
         v-divider
         v-list-tile(v-for="item in items" :key= "item.title" @click="")
            v-list-tile-action
               v-icon {{ item.icon }}
            v-list-tile-content
               v-list-tile-title {{ item.title }}
               

</template>

<script>
export default {
   name: 'Sidebar',   
   data() {
      return {
         drawer: true,
         items: [
            {title: 'Home', icon: 'dashboard'},
            {title: 'About', icon: 'question_answer'}
         ],
         mini: true,
         right: null
      }
   },
   props: ['username']
}
</script>
