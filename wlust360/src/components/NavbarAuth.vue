<template lang="pug">
   div
      v-toolbar(:fixed="true" color="white")
         img.logo(src="./../assets/img/logo1.png")
         router-link(to="/dashboard")
            v-btn(flat) MY TRIPS
         AddTripButton
         v-spacer
         v-toolbar-items
            v-menu(transition="slide-y-transition" :open-on-hover="true" bottom :offset-y="true" min-width=200)
               v-avatar(slot="activator")
                  img(src="./../assets/img/user_teal.png")
               v-list
                  v-list-tile(v-for="(item, i) in menuItems" :key="i" @click="check(item.title)")
                     v-list-tile-title {{ item.title }}
</template>

<script>
import axios from 'axios'
import AddTripButton from './AddTripButton'
import url from './../config/apiUrls'

export default {
  name: 'NavbarAuth',
  props: ['username'],
  data() {
    return  {
      menuItems: [
        { title: 'Profile' },
        { title: 'Favroite Trips' },
        { title: 'Settings' },
        { title: 'Help' },
        { title: 'Logout' }
      ]
    }
  },
  components: { AddTripButton },
  methods: {
    check: function(title) {
      const result = this.menuItems.find(item => item.title === title);
      if (result !== undefined) {  //in the list of items
        let fn = title.split(' ');
        fn = fn.join('').toLowerCase();
        this[fn]();
        console.log(title)
      }
    },
    logout: function () {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      axios.get(url.logout, config).then(res => {
        if (!res.data.auth) { // user logged out from server-side
          console.log('loggingg out')
          this.$session.clear()
          this.$session.destroy()
          this.$router.push({ name: 'Login', query: { st: 'logout' } })
        } else {
          //error occured on server-side, logout from client side
          console.log('error occured - logout failed')
          this.$session.destroy()
          this.$router.push({ name: 'Login', query: { st: 'logout' } })
        }
      })
    }
  }
}
</script>

