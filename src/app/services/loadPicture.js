const picture = require('../../public/img/spellcasters_titletext.png');

export const LoadPicture = [

  '$scope','event',
  class LoadPicture {
    constructor ($scope, event) {
      $scope.firstPic = picture;
    }
    // pictureSelector (event) {

    //   switch (event) {
    //     case 'done':
    //         picture1 =
    //       break;
    //     case 'game-over':
    //       break;
    //     default:
    //       console.log('default');
    //   }
    // }
  }
];