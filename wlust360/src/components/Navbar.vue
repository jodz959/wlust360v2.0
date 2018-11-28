<template lang="pug">
   div
      div.container
         nav.navbar.navbar-expand-lg.navbar-dark.bg-primary.fixed-top
            a.navbar-brand(href='/') WLUST 360
            button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle Navigation'): span(class='navbar-toggler-icon')

            .collapse.navbar-collapse.justify-content-end(id='navbarCollapse')
               ul.navbar-nav.text-right
                  li.nav-item
                     a.btn.btn-secondary(href='#') Login/SignUp
</template>

<script>

export default {
  name: 'Navbar'
}
</script>
