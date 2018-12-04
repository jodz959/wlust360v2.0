<template lang="pug">
   div
      NavbarAuth(v-bind:username="user.fName")
      div.container
         div(v-show="noTrips") 
            h2 Add your first trip!
         v-dialog(model="dialog" width="700")
            v-btn(slot="activator" color="red lighten-2" dark) Add a Trip
            v-card
               v-card-title(class="headline cyan lighten-2") Trip Basics
               div
                  div.errors(v-if="errors.length")
                     img(src="./../assets/warning.png")
                     p
                        b Please correct the following:
                        div.error-text
                           ul.error-ul
                              li(v-for="error in errors") {{ error }} 
                  form.login(v-on:submit.prevent="addTrip" novalidate="true" method="POST")
                     input.text-input.input-box(v-model="tripForm.title" name="title" placeholder="Title" type="text" required)
                     br
                     input.text-input.input-box(v-model="tripForm.dest" name="dest" placeholder="Destination" type="text" required)
                     br
                     label Start Date
                     br
                     v-menu.text-input.input-box(:close-on-content-click="false" v-model="menuStart" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px")
                        v-text-field(slot="activator" v-model="tripForm.start" prepend-icon="event" readonly)
                        v-date-picker(v-model="tripForm.start" color="teal lighten-2" @input="menuStart = false" actions) 
                     br
                     label End Date
                     br
                     v-menu.text-input.input-box(:close-on-content-click="false" v-model="menuEnd" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px")
                        v-text-field(slot="activator" v-model="tripForm.end" prepend-icon="event" readonly)
                        v-date-picker(v-model="tripForm.end" color="teal lighten-2" @input="menuStart = false" actions)
                     br
                     button.btn-lgn.btn.btn-success(type="submit") Add Trip
                     br
         div(v-for="trip in trips")
            Trip(v-bind:trip="trip")
</template>

<script>
import axios from 'axios'
import NavbarAuth from './NavbarAuth'
import Trip from './Trip'
import url from './../config/apiUrls'
export default {
  name: 'Dashboard',
  data() {
    return {
      user: {},
      errors: [],
      trips: null,
      menuStart: false,
      menuEnd: false,
      tripForm: { 
        title: '',
        dest: '',
        start: new Date().toISOString().substr(0, 10),
        end: new Date().toISOString().substr(0, 10)
      },
      noTrips: false
    }
  },
  components: { NavbarAuth, Trip },
  created () { 
    console.log('BEFORE FUNCTION DATA RETURNED')
    this.fetchUser()
    //this.fetchTrips()
  },
  methods: {
    fetchUser() {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      axios.get(url.me, config).then(res => {
        if(res.status === 200) {
          console.log('BEFORE FUNCTION DATA RETURNED ', url.me, res.data)
          this.$session.set('username', res.data.fName)
          //this.$router.replace({ name: 'Dashboard', params: { user: res.data.fName} })
          this.user = res.data
          this.fetchTrips()
        } else {
           console.log('STAT RETURNED', res.status)
           this.$router.push({
             name: 'Login',
             query: { st: 'unauthorized' }
           })
        }
      }).catch(err => {
         console.log(err)
         if (err.response) {
           if (err.response.status === 500) {
             this.$router.push({
               name: 'Login',
               query: { st: 'unauthorized' }
             })
           }
         }
      });

      //get all trips as well
    },
    startDates (val) {
      val >= new Date()
      
    },
    endDates (val) {
      val >= this.tripForm.startDate
    },
    fetchTrips () {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      console.log('fetching trips ', url.getTrips);
      axios.get(url.getTrips, config).then(res => {
        console.log('BEFORE TRIP  DATA RETURNED', res.data.trips)
        if (res.data.success) {
          this.trips = res.data.trips;
          if (this.trips.length > 0) {
            this.noTrips = false;
          } else {
            this.noTrips = true;
          }
          console.log('trips returned ', this.trips);    
        } else {
            console.log('not successful');
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addTrip () {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      console.log('POSTINNNG + ', url.createTrip);
      axios.post(url.createTrip, this.tripForm, config).then(res => {
       console.log('inside function' + url.createTrip);
        if (res.data.success) {
          const trip = {
            title: res.data.trip.title,
            dest: res.data.trip.dest,
            start: res.data.trip.start,
            end: res.data.trip.end
          }
          this.noTrip &= false

          if (this.trips) {
            this.trips.push(trip)
          } else {
            this.trips = [];
            this.trips.push(trips);
            this.$nextTick(() => { console.log('updated') });
          }
          //reset fields
          this.tripForm.title = ''
          this.tripForm.dest = ''
          this.tripForm.start= ''
          this.tripForm.end = ''
          console.log('trips returned' + this.trips);
        } else {
            console.log('not successful' + JSON.stringify(res.data));
        }
      }).catch(err => {
         console.log(err)
      })
    }
  }
}
</script>
