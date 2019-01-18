<template lang="pug"i>
   v-dialog(model="dialog" width="700")
      v-btn(slot="activator" outline color="green") 
         v-icon(color="green") add
         | Add a Trip
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

</template>

<script>
export default {
  name: 'AddTripButton',
  data() {
    return {
      menuStart: false,
      menuEnd: false,
      errors: [],
      tripForm: {
        title: '',
        dest: '',
        start: new Date().toISOString().substr(0, 10),
        end: new Date().toISOString().substr(0, 10)
      },
    }
  },
  methods: {
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
