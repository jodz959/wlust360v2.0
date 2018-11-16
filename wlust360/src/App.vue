<template lang="pug">
   div(id="app")
      div.container
         nav.navbar.navbar-expand-lg.navbar-dark.bg-primary.fixed-top
            a.navbar-brand(href='/') WLUST 360
            button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle Navigation'): span(class='navbar-toggler-icon')

            .collapse.navbar-collapse.justify-content-end(id='navbarCollapse')
               ul.navbar-nav.text-right
                  li.nav-item.active
                     a.nav-link(href='#') Trips
                  li.nav-item.active
                     a.nav-link(href='#') Profile
                  li.nav-item
                     a.btn.btn-secondary(href='#') Login/SignUp

         img(src="./assets/logo.png")
         router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
