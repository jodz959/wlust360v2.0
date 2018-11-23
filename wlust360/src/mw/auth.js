import router from './../router/index'

export default {
  user: {
    auth: false
  },

  setAuth(auth) {
    this.user.auth = auth;
  },
 
  checkAuth(token) {
 //  if (context.session) {
   //   const token = context.session.get('jwt');
      console.log('here is the token ', token);
      if (token) {
        this.setAuth(true);
      } else {
        this.setAuth(false);
      }
  ///  } else {
     // console.log('cannot access session');
     // this.setAuth(false);
   // }
    return this.user.auth;
  }
}
