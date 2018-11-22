<template lang="pug">
   div.container
      NavbarAuth(v-bind:username="user.fName")
      div.container
         h2 Add a Trip
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
            input.text-input.input-box(v-model="tripForm.start" name="start" placeholder="Enter date as 2019-11-05" type="text" required)
            br
            input.text-input.input-box(v-model="tripForm.end" name="end" placeholder="Enter date as 2019-11-05" type="text" required)
            br
            button.btn-lgn.btn.btn-success(type="submit") Add Trip
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
      tripForm: { 
        title: '',
        dest: '',
        start: '',
        end: '',
      }
    }
  },
  components: { NavbarAuth, Trip },
  created() { 
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
        }
      }).catch(err => {
         console.log(err)
      });

      //get all trips as well
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
