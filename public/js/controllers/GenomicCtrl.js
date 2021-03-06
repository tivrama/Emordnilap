// public/js/controllers/GenomicCtrl.js
angular.module('GenomicCtrl', []).controller('GenomicController', function($scope) {


  $scope.genomicCollection = [];
  $scope.complement = '';
  $scope.genomicLength = 0;

  //checks entry - returns true or false
  var isItPalindrome = function(word) {

    var DNA = {
      a: 't',
      c: 'g',
      g: 'c',
      t: 'a'
    };

    var RNA = {
      a: 'u',
      c: 'g',
      g: 'c',
      u: 'a'
    };

    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    var match = [];
    var tempComplement = [];

    var checkFor = DNA;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === 'u') {
        checkFor = RNA;
      }
    }

    for (var j = 0; j < word.length; j++) {
      match.unshift(checkFor[word[j]]);
      tempComplement.push(checkFor[word[j]]);
    }

    $scope.complement = tempComplement.join('');
    match = match.join('');

    return match === word;
  };


  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    $scope.genomicLength = word.length;
    return word.length;
  };


  var lookForNucleotides = function(entry) {
    var checker = false;
    var val;
    for (var i = 0; i < entry.length; i++) {
      val = entry[i].toLowerCase();
      if (val !== 'a' && val !== 't' && val !== 'u' && val !== 'c' && val !== 'g') {
        checker = true;
      }
    }
    return checker;
  };


  //call isItPalindrome to see if enty is correct.
  $scope.checkGenome = function() {
    //search for characters and return false if 
    if (lookForNucleotides($scope.userEntry)) {
      $scope.tagline = 'Remember, only A, C, T, G or U for RNA';
    }
    //submission must be greater than two letters
    else if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is too short.  Maybe try again with something longer.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.genomicCollection.unshift(
        {
          'entry': $scope.userEntry.toUpperCase(),
          'comp': $scope.complement.toUpperCase()
        }
      );

      $scope.tagline = 'Nice! That is ' + $scope.genomicLength + ' nucleotides long!  The complement is ' + $scope.complement.toUpperCase() + '.';

    //Not a palindrome, try again
    } else {
      $scope.tagline = 'No, that is not a palindrome.  The complement is ' + $scope.complement.toUpperCase() + '.';
    }
    //reset input field
    $scope.userEntry = '';
  };


});