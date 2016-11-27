import app from './app';
//var testsContext = require.context('.', true, /_spec$/)


describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('AppCtrl', {});
      });
    });

    it('should contain the starter url', () => {
      expect(ctrl.url).toBe('https://github.com/preboot/angular-webpack');
    });

    //
    it('should have a LoginCtrl controller', function() {
      expect(App.LoginCtrl).toBeDefined();
    });

    describe('LoginCtrl', () => {
      let ctrl;
      let scope = {};

      beforeEach(() => {
        angular.mock.module(app);

        angular.mock.inject(($controller) => {
          ctrl = $controller('LoginCtrl', {$scope:scope});
        });
      });

      it('shold initialize the userName and password in the scope', ()=> {
        expect(scope.userName).toBeDefined();
        expect(scope.password).toBeDefined();
      });

    });

  });







  // it('should have a working UserServices service', inject(['UserServices',
  //   function(UserServices) {
  //     expect(UserServices.getUsers).not.to.equal(null);
  // }]));

});