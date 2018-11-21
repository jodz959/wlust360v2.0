<template lang="pug">
   div.container
      NavbarAuth(v-bind:username="user.fName")
      div.container
         p Made it and it's working

</template>

<script>
import axios from 'axios'
import NavbarAuth from './NavbarAuth'
import url from './../config/apiUrls'
export default {
  name: 'Dashboard',
  data() {
    return {
      user: {}
    }
  },
  components: { NavbarAuth },
  created() { 
    console.log('BEFORE FUNCTION DATA RETURNED');
    this.fetchData();
  },
  methods: {
    fetchData() {
      const config = {
        headers: {
          'x-access-token': this.$session.get('jwt')
        }
      }
      axios.get(url.me, config).then(res => {
        if(res.status === 200) {
          console.log('BEFORE FUNCTION DATA RETURNED', res.data);
          this.$session.set('username', res.data.fName);
          this.$router.replace({ name: 'Dashboard', params: { user: res.data.fName} });
          this.user = res.data;
        } else {
           console.log('STAT RETURNED', res.status);
        }
      }).catch(err => {
         console.log(err)
      });
    },
    logout: function () {
      this.$session.destroy()
      this.$router.push('/signup');
    }
  }
}
</script>
