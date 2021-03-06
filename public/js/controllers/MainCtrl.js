// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, Palindrome) {

  // This is not in current use
  $scope.tagline = 'A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward. Allowances may be made for adjustments to capital letters, punctuation, and word dividers. - Wikipedia';


  $scope.servercollection = [];

  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  };

  var getPalindromes = function () {
    Palindrome.get(function() {
    }).then(function(responce) {
      var end = responce.data.length - 1;
      // var trueCharacterLength;
      for (var i = end; $scope.servercollection.length < 10; i--) {
        if (getPalinLength(responce.data[i].name) > 20) {
          $scope.servercollection.push(
            {'entry': responce.data[i].name}
          );
        }
      }
    });
  };

  getPalindromes();

});