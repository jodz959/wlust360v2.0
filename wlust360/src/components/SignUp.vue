<template lang="pug">
   div.register-form
      div.layout-title
      div
         form.login(@submit="onSubmit")
            input.text-input(v-model="fname" placeholder="First Name")
            br
            input.text-input(v-model="lname" placeholder="Last Name")
            br
            input.text-input(v-model="email" placeholder="Email")
            br
            input.text-input(v-model="city" placeholder="City")
            br
            input.text-input(v-model="password" autocomplete="off" placeholder="Password")
            br
            select(v-model="selected")
               option(v-for="option in options" v-bind:value="option") {{ option }}
            button.btn-lgn.btn.btn-success(type="submit") Sign Up
         a(href="/login") Login
         span|
         a(href="forgot-password") Forgot Password
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      selected: 'A',
      options: [ 'A', 'B', 'C' ]
    }
  }
}
</script>
