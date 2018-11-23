/* eslint-disable semi */
const url = {};
/*
   url.signup = 'http://127.0.0.1:3000/signup';
   url.login = 'http://127.0.0.1:3000/login';
   url.me = 'http://127.0.0.1:3000/me';
   url.createTrip = 'http://127.0.0.1:3000/api/trip/create-trip';
   url.getTrip = 'http://127.0.0.1:3000/api/trip/my-trips';

   url.signup = 'https://wlust-360.herokuapp.com/signup';
   url.login = 'https://wlust-360.herokuapp.com/login';
   url.me = 'https://wlust-360.herokuapp.com/me';
   url.createTrip = 'https://wlust-360.herokuapp.com/api/trip/create-trip';
   url.getTrip = 'https://wlust-360.herokuapp.com/api/trip/my-trips';
*/
url.signup = 'auth/signup';
url.login = 'auth/login';
url.logout = 'auth/logout';
url.me = 'auth/me';
url.createTrip = 'api/trip/create-trip';
url.getTrips = 'api/trip/get-trips';

module.exports = url;
