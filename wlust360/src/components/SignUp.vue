<template lang="pug">
   div.container
      Navbar
      div.register-form
         div.layout-title
            h2 Sign Up
            div.errors(v-if="errors.length")
               img(src="./../assets/warning.png")
               p
                  b Please correct the following:
                  div.error-text
                     ul.error-ul
                        li(v-for="error in errors") {{ error }}
            form.login(@submit="checkErrors" novalidate="true" method="post")
               input.text-input.input-box(v-model="form.fName" name="fName" placeholder="First Name" type="text" required)
               br
               input.text-input.input-box(v-model="form.lName" name="lName" placeholder="Last Name" type="text" required)
               br
               input.text-input.input-box(v-model="form.email" name="email" placeholder="Email" type="email" required)
               br
               input.text-input.input-box(v-model="form.password" name="password" autocomplete="off" placeholder="Password" type="password" required)
               br
               input.text-input.input-box(v-model="form.c_password" autocomplete="off" placeholder="Confirm Password" type="password" required)
               br
               v-select.select-v(v-model="form.city" :options="options" label="city" name="home" placeholder="Select City and State")
               br
               button.btn-lgn.btn.btn-success(type="submit") Sign Up
            div.link-div
               router-link.links(to="/login") Login
               span |
               a.links(href="forgot-password") Forgot Password

         div.credit
            | Icons made by
            a(href='https://www.freepik.com', title='Freepik') Freepik
            |  from
            a(href='https://www.flaticon.com/', title='Flaticon') www.flaticon.com
            |  is licensed by
            a(href='http://creativecommons.org/licenses/by/3.0/', title='Creative Commons BY 3.0', target='_blank') CC 3.0 BY
</template>

<script>
import Navbar from './Navbar';
import axios from 'axios';
import url from './../config/apiUrls'
export default {
  name: 'SignUp',
  components: {
    Navbar
  },
  data () {
    return {
      user: '',
      errors: [],
      form: {
        fName: '',
        lName: '',
        email: '',
        home: '',
        password: '',
        c_password: '',
        city: ''
      },
      options: [
        {
          city: 'New York',
          growth_from_2000_to_2013: '4.8%',
          latitude: 40.7127837,
          longitude: -74.0059413,
          population: '8405837',
          rank: '1',
          state: 'New York'
        },
        {
          city: 'Los Angeles',
          growth_from_2000_to_2013: '4.8%',
          latitude: 34.0522342,
          longitude: -118.2436849,
          population: '3884307',
          rank: '2',
          state: 'California'
        },
        {
          city: 'Chicago',
          growth_from_2000_to_2013: '-6.1%',
          latitude: 41.8781136,
          longitude: -87.6297982,
          population: '2718782',
          rank: '3',
          state: 'Illinois'
        },
        {
          city: 'Houston',
          growth_from_2000_to_2013: '11.0%',
          latitude: 29.7604267,
          longitude: -95.3698028,
          population: '2195914',
          rank: '4',
          state: 'Texas'
        },
        {
          city: 'Philadelphia',
          growth_from_2000_to_2013: '2.6%',
          latitude: 39.9525839,
          longitude: -75.1652215,
          population: '1553165',
          rank: '5',
          state: 'Pennsylvania'
        },
        {
          city: 'Phoenix',
          growth_from_2000_to_2013: '14.0%',
          latitude: 33.4483771,
          longitude: -112.0740373,
          population: '1513367',
          rank: '6',
          state: 'Arizona'
        },
        {
          city: 'San Antonio',
          growth_from_2000_to_2013: '21.0%',
          latitude: 29.4241219,
          longitude: -98.49362819999999,
          population: '1409019',
          rank: '7',
          state: 'Texas'
        },
        {
          city: 'San Diego',
          growth_from_2000_to_2013: '10.5%',
          latitude: 32.715738,
          longitude: -117.1610838,
          population: '1355896',
          rank: '8',
          state: 'California'
        },
        {
          city: 'Dallas',
          growth_from_2000_to_2013: '5.6%',
          latitude: 32.7766642,
          longitude: -96.79698789999999,
          population: '1257676',
          rank: '9',
          state: 'Texas'
        },
        {
          city: 'San Jose',
          growth_from_2000_to_2013: '10.5%',
          latitude: 37.3382082,
          longitude: -121.8863286,
          population: '998537',
          rank: '10',
          state: 'California'
        }
      ]
    }
  },
  methods: {
    /* eslint-disable semi */
    checkErrors: function (e) {
      this.errors = [];
      e.preventDefault();
      if (this.form.password !== this.form.c_password) {
        this.errors.push('Passwords do not match');
      }
      if (this.form.password.length < 8 || this.form.password.length > 20) {
        this.errors.push('Passwords must be between 8 and 20 characters');
      }
      if (this.form.fName === '') {
        this.errors.push('First name is required');
      }
      if (this.form.lName === '') {
        this.errors.push('Last name is required');
      }
      if (this.form.password === '') {
        this.errors.push('Password is required');
      }
      if (this.form.c_passowrd === '') {
        this.errors.push('Password confirmation is required');
      }
      if (!this.validEmail(this.form.email)) {
        this.errors.push('Enter a valid email');
      }
      if (!this.errors.length) {
        console.log('No errors');
        this.register();
      }
    },
    validEmail: function (email) {
      const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    register: function () {
      console.log('IN register function', url.signup);
      axios.post(url.signup, this.form)
        .then(res => {
          if (res.status === 200 && 'token' in res.data) {
            console.log(res.data);
            this.$session.start();
            this.$session.set('jwt', res.data.token);
            //this.$http.headers.common['Authorization'] = 'Bearer' + res.data.token
            this.$router.push({
              name: 'Dashboard'
            });
          }
        });
    }
  }
}
</script>
