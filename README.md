## Welcome to EmordnilaPalindromE

This is a quick, easy place to check you palindromes. 
For letter based palindromes, just paste it in (don't worry about punctuation and spaces). Entries over 20 letters will be displayed on the welcome screen.  But all valid submissions will be displayed in the gallery. 
For binary palindromes, go to the binary view - 1's and 0's only please.  
What about genomic palindromes?  You can check those too!



## Usage

Go to the 'Try It Yourself' view and enter a palindrome.  Emordnilap will varify it and then add it to the gallary. It will tell you hown many letters it is.  If over 20 letters, it will be appended to the Welcome view.

## Algorithyms on the Front End

All the algorithms for testing the palindromes is on the front end.  So you can look in the source files when on the site and see how your entries are tested.  Also in this files, is some code that may be fun to play with in your console.  Just use with caution as one of them uses a while loop that will go (a while) if you put too big a number in.

{% highlight ruby %}

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

  word = word.toLowerCase()
    .replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  var match = [];

  var checkFor = DNA;
  for (var i = 0; i < word.length; i++) {
    if (word[i] === 'u') {
      checkFor = RNA;
    }
  }

  for (var j = 0; j < word.length; j++) {
    match.unshift(checkFor[word[j]]);
  }
  match = match.join('');

  return match === word;
}; 

{% endhighlight %}


## Contributing/Bugcheck

Please feel free to make a pull request for bug fixes or optimization.  