export const RegistrationServices = [

 '$http', '$state',

 class RegistrationServices {
  constructor ($http, $state, registeruser) {
    this.$http = $http;
    this.$state = $state;
    this.register = registeruser;
  }

  registerUser (registerData) {
    this.data = registerData;
    const req = {
      method: 'POST',
      url: `/api/register`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `username=${registerData.username}&password=${registerData.password}&=`
     };
     return this.$http(req).success(response => {
        if(response.success === true){
          this.$state.go('registration', {errorMessage: 'User successfully created'}); // {registrationMessage: response.registrationMessage});
        }else{
          this.$state.go('registration', {errorMessage: response.errorMessage});
        }
       return response;
     });
  }
}];