export const focusMe = [
  '$timeout',
  ($timeout) => {
    return {
      scope: {trigger: '=focusMe'},
      link: (scope, element) => {
        scope.$watch('trigger', (value) => {
          if(value === true) {
            element[0].focus();
            scope.trigger = false;
          }
        });
      }
    };
  }
]