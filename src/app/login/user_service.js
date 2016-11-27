export const UserServices = [
 '$http',
 '$state',

 class UserServices {
  constructor ($http, $state) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
  }

  getUsers (userData) {
      const req ={
       method: 'POST',
       url: `/api/login`,
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: `username=${userData.username}&password=${userData.password}&=`
      };
      return this.$http(req)
        .success(response => {
          if(response.success === true){
            this.$state.go('splash');
          } else {
            this.$state.go('login', {errorMessage: response.errorMessage});
          }
          return;
        });
    }
}];