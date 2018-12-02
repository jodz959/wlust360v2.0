<template lang="pug">
   div
      NavbarAuth(v-bind:username="user")
      div.trip-header
         div.header-content
            h2.header-text {{ currentTrip.title }}
      v-tabs(centered ripple color="pink lighten-3" dark icons-and-text slot="activators")
         v-tabs-slider(color="teal accent-4")
         v-tab(v-for="tab of tabs" :key="tab.id") {{ tab.name }}
            v-icon {{ tab.icon }} 
         v-tab-item(:id="tab-1")
            v-card(flat)
               v-dialog(model="dialog" width="600")
                  v-btn(slot="activator" color="red lighten-2" dark) Make a Plan
                  v-card
                     v-card-title(class="headline cyan lighten-2") New Adventure
                     div
                        form.login(novalidate="true" method="POST")
                           input.text-input.input-box(v-model="planForm.title" name="title" placeholder="Title" type="text")
                           br
                           label Date
                           br
                           v-menu.text-input.input-box(:close-on-content-click="false" v-model="planStart" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px")
                              v-text-field(slot="activator" v-model="planForm.date" prepend-icon="event" readonly)
                              v-date-picker(v-model="planForm.date" color="teal lighten-2" @input="planStart = false" actions)
                           br
                           input.text-input.input-box(v-model="planForm.notes" name="notes" placeholder="Notes" type="text")
                           br
                           button.btn-lgn.btn.btn-success(@click.prevent="addPlan()" type="submit") Add
               v-card-text 
                  h2(v-show="noPlans") No plans yet
                  v-timeline(align-top)
                     v-timeline-item(v-for="(plan, i) in plans" :color="plan.color" :icon="plan.icon" :key="i" fill-dot)
                        v-card(:color="plan.color")
                           v-card-title(class="title")
                              span {{ plan.date | moment("dddd, MMMM Do YYYY") }} 
                           v-card-text(class="white text--primary")
                              h2 {{ plan.title }}
                              p {{ plan.notes }}      
         v-tab-item(:id="tab-2")
            v-card(flat)
               v-dialog(model="dialog" width="600")
                  v-btn(slot="activator" color="red lighten-2" dark) Add an IOU
                  v-card
                     v-card-title(class="headline cyan lighten-2") Save IOUs
                     div
                        form.login(v-on:submit.prevent="addIOU" novalidate="true" method="POST")
                           input.text-input.input-box(v-model="iouForm.title" name="title" placeholder="Title" type="text")
                           br
                           input.text-input.input-box(v-model="iouForm.title" name="total" placeholder="0.0" type="number")
                           br
                           label Date
                           br
                           v-menu.text-input.input-box(:close-on-content-click="false" v-model="iouStart" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px")
                              v-text-field(slot="activator" v-model="iouForm.date" prepend-icon="event" readonly)
                              v-date-picker(v-model="iouForm.date" color="teal lighten-2" @input="planStart = false" actions)
                           br
                           textarea.text-input.input-box(v-model="iouForm.notes" cols="60" rows="6" name="notes" placeholder="Notes ..")
                           br
                           button.btn-lgn.btn.btn-success(@click="addIOU()" type="submit") Add
               v-card-text
                  h2(v-show="noIOUs") No IOUs added yet
                  div.row.card-container
                     div.col-4(v-for="iou in ious")
                        IOUCard(v-bind:iou="iou")
         v-tab-item(:id="tab-3")
            v-card(flat)
               v-card-text
                  h2(v-show="noCountry") No info could be found about this destination
                  div.row.card-container
                     div.col-4(v-for="local in locals")
                        LocalCard(v-bind:local="local")

</template>

<script>
import axios from 'axios'
import NavbarAuth from './NavbarAuth'
import LocalCard from './LocalCard'
import IOUCard from './IOUCard'
import url from './../config/apiUrls'
export default {
  name: 'TripSummary',
  data () {
    return {
      user: this.$session.get('username'),
      currentTrip: {
        title: '',
        lang: '' 
      },
      country: null,
      tabs : [
        { id: 0, name: 'Events and Todos', icon: 'map' },
        { id: 1, name: 'Finances', icon: 'credit_card' },
        { id: 2, name: 'Local Info', icon: 'local_hospital' }
      ],
      plans: [],
      ious: null,
      locals: [],
      nextCounter: 0,
      tlCards: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star'
        },
        {
          color: 'purple lighten-1',
          icon: 'mdi-book-variant'
        },
        {
          color: 'cyan lighten-1',
          icon: 'mdi-airballoon'
        },
        {
          color: 'orange',
          icon: 'mdi-buffer'
        }
      ],
      planForm: {
         title: '',
         date: '',
         notes: ''
      },
      planDialog: false,
      planStart: false,
      iouForm: {
         title: '',
         total: '',
         date: '',
         notes: ''
      },
      iouDialog: false,
      iouStart: false,
      noCountry: false,
      noPlans: false,
      noIOUs: false
    }
  },
  components: { NavbarAuth, LocalCard, IOUCard },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      console.log('Fetching data');
      //add a color and icon to each plan for timeline display
      const pUrl = url.getPlans + '/' + this.$route.params.trip
      axios.get(pUrl, config).then(res => {   

        if (!res.data.trip.plans || res.data.trip.plans.length === 0) {
          this.noPlans = true;
          this.$nextTick()
        } 
        let counter = 0;
        console.log('plans ', res.data.trip.plans)
        res.data.trip.plans.forEach((plan) => {
         console.log('plan in fetch data ', plan)
          plan.color = this.tlCards[counter].color
          plan.icon = this.tlCards[counter].icon
          counter++;

          if (counter === this.tlCards.length - 1) {
            counter = 0;
          } 
          this.nextCounter = counter;  
          this.plans.push(plan)
        })
      }).catch(err => {
         console.log('err in axios', err);
         if (err.response) {
           if (err.response.status === 500) {
             this.$router.push({
               name: 'Login',
               query: { st: 'unauthorized' }
             })             
           }
         }
      })

      const iUrl = url.getIOUs + '/' + this.$route.params.trip
      axios.get(iUrl, config).then(res => {
         
        if (!res.data.trip.ious || res.data.trip.ious.length === 0) {
          this.noIOUs = true;
          this.$nextTick()
        }

         this.ious = res.data.trip.ious
         console.log('ious ', this.ious);
         if (!res.data.trip.hasOwnProperty('country')) {
            this.noCountry = true;
            this.$nextTick()
         }
            console.log('ious ', this.ious);
            this.currentTrip.title = res.data.trip.title
            this.currentTrip.lang = res.data.trip.country.lang
            this.country = {
               name: res.data.trip.country.name,
               fire: res.data.trip.country.fire,
               hospital: res.data.trip.country.hospital,
               police: res.data.trip.country.police
            }
            this.getLocals()
        }).catch(err => {
         console.log('err in ious', err);
         if (err.response) {
           if (err.response.status === 500) {
             this.$router.push({
               name: 'Login',
               query: { st: 'unauthorized' }
             })             
           }
         }
      })
    },
    getLocals() {

      console.log('Current Trip Name ', this.currentTrip.title);
      const fire = {
        title: 'Local Fire Department',
        imgSrc: 'img/fire.png',
        number: this.country.fire || 'None found',
        color: 'danger'
      }
      const police = {
        title: 'Local Police Department',
        imgSrc: 'img/police.png',
        number: this.country.police || 'None found',
        color: 'warning'
      }
      const hospital = {
        title: 'Local Hospital',
        imgSrc: 'img/hospital.png',
        number: this.country.hospital || 'None found',
        color: 'info'
      }

      this.locals.push(fire, police, hospital)      
  },
  addPlan() {
    console.log('In the Add Plan');
    const config = {
      headers: {
        'x-access-token': this.$session.get('jwt')
      }
    }
    const pUrl = url.createPlan + '/' + this.$route.params.trip
    console.log('uri plan ', pUrl);
    axios.post(pUrl, this.planForm, config).then(res => {
      if (res.data.success) {
        const plan = {
          title: res.data.plan.title,
          date: res.data.plan.date,
          notes: res.data.plan.notes,
          color: this.tlCards[this.nextCounter].color,
          icon: this.tlCards[this.nextCounter].icon
        }
        this.noPlans &= false;
        this.plans.unshift(plan)
        this.$nextTick(() => { console.log('updated') });
        this.planForm.title = ''
        this.planForm.date = ''
        this.planForm.notes = ''
      }
    this.planDialog = false;

    }).catch(err => {
      console.log('Error in addPlan ', err)
      this.planDialog = false;
    })

   this.planDialog = false;
  },
  addIOU() {
   console.log('In iou');
    this.iouDialog = false;
    const config = {
      headers: {
        'x-access-token': this.$session.get('jwt')
      }
    }
    const iUrl = url.createIOU + '/' + this.$route.params.trip
    console.log('url', iUrl);
    axios.post(iUrl, this.iouForm, config).then(res => {
      if (res.data.success) {
        const iou = {
          title: res.data.iou.title,
          date: res.data.iou.date,
          total: res.data.iou.total,
          notes: res.data.iou.notes
        }

         this.noIOUs &= false;
        if (this.ious) {
          this.ious.push(iou)
        } else {
          this.ious = []
          this.ious.unshift(iou)
          this.$nextTick(() => { console.log('updated') });
        }

        this.iouForm.title = ''
        this.iouForm.date = ''
        this.iouForm.total = ''
        this.iouForm.notes = ''
        this.iouDialog = false;
       }
      }).catch(err => {
       console.log('Error in addIOU ', err);
       this.iouDialog = false;
      })
      
      this.iouDialog = false;
    }
  }
}
</script>
