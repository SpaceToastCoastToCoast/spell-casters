const template = require('./registration.html');
const mainSong = require('file!../../public/music/Main.ogg');

export const RegistrationCtrlName = 'RegistrationCtrl';

export const RegistrationCtrlState ={
  url:'/registration',
  template,
  controller: RegistrationCtrlName,
  controllerAs: 'registration',
  params: {
    errorMessage: null
  }
};

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
     console.log('req: ', req);
     return this.$http(req).success(response => {
        if(response.success === true){
          this.$state.go('splash', {registrationMessage: response.registrationMessage});
        }else{
          this.$state.go('registration', {errorMessage: response.errorMessage});
        }
       return response;
     });
  }
}];

export const RegistrationCtrl = [
  '$scope', '$state', '$stateParams', 'RegistrationServices', '$rootScope',

  class RegistrationCtrl {
    constructor($scope, $state, $stateParams, RegistrationServices, $rootScope) {
      this.registerData ={
        username: '',
        password: ''
      };

      if ($rootScope.currentSong._src !== mainSong) {
        $rootScope.setCurrentSong(mainSong);
      }

      $scope.userName = '';
      $scope.password = '';
      $scope.RegistrationServices = RegistrationServices;
      $scope.registrationMessage = '';

      $scope.registerUser = () => {
        this.registerData.username = $scope.userName;
        this.registerData.password = $scope.password;
        RegistrationServices.registerUser(this.registerData)
          .success(response =>{
            $rootScope.user = response.username;
            $rootScope.visible = true;
            $scope.registrationMessage = 'User successfully created';
        });
      };
      $scope.errorMessage = $stateParams.errorMessage;
    }
  }
];
