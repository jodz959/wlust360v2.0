<template lang="pug">
   div
      NavbarAuth(v-bind:username="user")
      div.trip-header
         h2 Header goes here
      v-tabs(centered ripple color="pink lighten-3" dark icons-and-text slot="activators")
         v-tabs-slider(color="teal accent-4")
         v-tab(v-for="tab of tabs" :key="tab.id") {{ tab.name }}
            v-icon {{ tab.icon }} 
         v-tab-item(:id="tab-1")
            v-card(flat)
               v-card-text tab1
               h2 Tab 1
         v-tab-item(:id="tab-2")
            v-card(flat)
               v-card-text tab2
               h2 Tab 2
         v-tab-item(:id="tab-3")
            v-card(flat)
               v-card-text tab3
               h2 Tab 3
</template>

<script>
import NavbarAuth from './NavbarAuth'
export default {
  name: 'TripSummary',
  data () {
    return {
      user: this.$session.get('username'),
      tabs : [
        { id: 0, name: 'Events and Todos', icon: 'map' },
        { id: 1, name: 'Finances', icon: 'credit_card' },
        { id: 2, name: 'Health', icon: 'local_hospital' }
      ]
    }
  },
  components: { NavbarAuth } 
}
</script>
