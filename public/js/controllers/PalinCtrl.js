
// public/js/controllers/NerdCtrl.js
angular.module('PalinCtrl', []).controller('PalinController', function($scope, Palindrome, $http) {


  $scope.palincollection = [];


  var isItPalindrome = function(word) {
    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    for (var i = 0; i < word.length; i++) {
      if (word[i] === word[i + 1] && word[i] === word[i + 2]) {
        return false;
      }
    }
    var drow = word.split('').reverse().join('');
    return word === drow;
  };


  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  };


  var asyncLoop = function(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
      next: function() {
        if (done) {
          return;
        }
        if (index < iterations) {
          index++;
          func(loop);
        } else {
          done = true;
          callback();
        }
      },
      iteration: function() {
        return index - 1;
      },
      break: function() {
        done = true;
        callback();
      }
    };
    loop.next();
    return loop;
  };


  $scope.check = function() {
    var list = $scope.userEntry.replace(/[`~!@#$%^&*0-9()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
    list = list.split(' ');
    var checker = true;
    var word = 0;
    asyncLoop(list.length, function(loop) {
      console.log('Word sent to API: ', list[word]);
      Palindrome.checkWords({word: list[word]}).then(function(result) {
        console.log(result.data);
        word++;
        if (!result.data.examples) {
          checker = false;
          loop.break();
        }
        // log the iteration
        console.log(loop.iteration());
        // Okay, for cycle could continue
        loop.next();
      })},
      function() {
        //call the rest of the Palindrom Checker function
        console.log('All words are real words: ', checker);
        if (checker) { 
          finalCheck();
        } else {
          notRealWords();
        }
      }
    );
  };


  var addPalindrome = function () {
    Palindrome.create({'entry': $scope.userEntry})
      .catch(function (err) {
        console.log('Add palindrome API from client not working: ', err);
      });
  };


  var finalCheck = function() {
    //submission must be greater than two letters
    if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is too short.  Maybe try again.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.palincollection.unshift(
        {'entry': $scope.userEntry}
        );
      $scope.tagline = 'Nice job! That is ' + getPalinLength($scope.userEntry) + ' letters (not including spaces or punctuation)';

      if (getPalinLength($scope.userEntry) > 20) {
        $scope.prize = 'That is over 20 letters!  Your palendrome has been appended to to the main page!';
      }

      //send submission to server
      addPalindrome();

    //Not a palindrome, try again
    } else {
      $scope.tagline = 'oops, not quite.  Try again.';
    }
    //reset input field
    $scope.userEntry = '';
  };


  var notRealWords = function () {
    $scope.tagline = 'mmm, you have to use real words...';
  };

});