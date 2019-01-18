<template lang="pug">
   div
      v-toolbar(:fixed="true" color="white")
         img.logo(src="./../assets/img/logo1.png")
         v-spacer
         v-toolbar-items
            div(class="menu-link")
               router-link(to="/dashboard")
                  v-btn(flat) TRIPS
            v-menu(transition="slide-y-transition" :open-on-hover="true" bottom offset-y)
               v-avatar(slot="activator")
                  img(src="./../assets/img/user_teal.png")
               v-list
                  v-list-tile(v-for="(item, i) in menuItems" :key="i" @click="check(item.title)")
                     v-list-tile-title {{ item.title }}
            div(class="menu-btn")
               v-btn(small color="error" v-on:click="logout") LOGOUT

      <!-- nav.navbar.navbar-expand-lg.navbar-dark.bg-primary.fixed-top
         a.navbar-brand(href='/') WLUST 360
         p Welcome {{ username }}
         button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle Navigation'): span(class='navbar-toggler-icon')

         .collapse.navbar-collapse.justify-content-end(id='navbarCollapse')
            ul.navbar-nav.text-right
               router-link(to="/dashboard")
                  li.nav-item.active
                     a.nav-link Trips
               li.nav-item.active
                  a.nav-link(href='#') Profile
               li.nav-item
                  a.btn.btn-secondary(v-on:click="logout") Logout -->
</template>

<script>
import axios from 'axios'
import url from './../config/apiUrls'

export default {
  name: 'NavbarAuth',
  props: ['username'],
  data() {
    return  {
      menuItems: [
        { title: 'Profile' },
        { title: 'Trips' },
        { title: 'Settings' },
        { title: 'Logout' }
      ]
    }
  },
  methods: {
    check: function(title) {
      console.log(title)
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

