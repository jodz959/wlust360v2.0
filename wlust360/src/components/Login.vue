<template lang="pug">
   div.container
      Navbar
      div.register-form
         div.layout-title
            h2 Login
            div.errors(v-if="errors.length")
               img(src="./../assets/warning.png")
               p
                  b Please correct the following:
                  div.error-text
                     ul.error-ul
                        li(v-for="error in errors") {{ error }}
            div.error-msg(v-if="message")
               h4 {{ message }}
            form.login(@submit="checkErrors" novalidate="true" method="POST")
               input.text-input.input-box(v-model="form.email" name="email" placeholder="Email" type="email" required)
               br
               input.text-input.input-box(v-model="form.password" name="password" autocomplete="off" placeholder="Password" type="password" required)
               br
               button.btn-lgn.btn.btn-success(type="submit") Login
            div.link-div
               router-link.links(to="/signup") Sign Up
               span |
               a.links(href="#") Forgot Password

         div.credit
            | Icons made by
            a(href='https://www.freepik.com', title='Freepik') Freepik
            |  from
            a(href='https://www.flaticon.com/', title='Flaticon') www.flaticon.com
            |  is licensed by
            a(href='http://creativecommons.org/licenses/by/3.0/', title='Creative Commons BY 3.0', target='_blank') CC 3.0 BY
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar'
import url from './../config/apiUrls'
export default {
  name: 'Login',
  components: { Navbar },
  data () { 
    return {
      user: '',
      message: '',
      errors: [],
      form: {
        email: '',
        password: '',
      }
    }
  },
  created () {
    const msg = this.$route.query.st;
    if (msg === 'logout') {
      this.message = "Logout Successful"
    } 
    if (msg === 'unauthorized') {
      this.message = 'Please log in to continue.'
    }
  },
  methods: {
    /* eslint-disable semi */
    checkErrors: function (e) {
      this.errors = [];
      e.preventDefault();
      if (this.form.password.length < 8 || this.form.password.length > 20) {
        this.errors.push('Incorrect password entered')
      }
      if (this.form.password === '') {
        this.errors.push('Password is required')
      }
      if (!this.validEmail(this.form.email)) {
        this.errors.push('Enter a valid email')
      }
      if (!this.errors.length) {
        console.log('No errors')
        this.login()
      }
    },
    validEmail: function (email) {
      const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    login: function () {
      console.log('IN login function', url.login)
      axios.post(url.login, this.form)
        .then((res) => {
          if (res.data.auth) {
            console.log(res.data)
            this.$session.start()
            this.$session.set('jwt', res.data.token);
            this.email = ''
            this.password = ''
            //this.$http.headers.common['Authorization'] = 'Bearer' + res.data.token
            this.$router.push({
              name: 'Dashboard'
            })
          } else {
            console.log('Auth is false')
            this.email = ''
            this.password = ''
            this.message = ''
            this.message = res.data.message;
         }
       })
     }
  }
}
</script>
