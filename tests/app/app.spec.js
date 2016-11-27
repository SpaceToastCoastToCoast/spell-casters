import app from '../../src/app/app';

describe('app', () => {

  // describe('AppCtrl', () => {
  //   let ctrl;

  //   beforeEach(() => {
  //     angular.mock.module(app);

  //     angular.mock.inject(($controller) => {
  //       ctrl = $controller('AppCtrl', {});
  //     });
  //   });

  //   it('should contain the starter url', () => {
  //     expect(ctrl.url).toBe('https://github.com/preboot/angular-webpack');
  //   });

  // });

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