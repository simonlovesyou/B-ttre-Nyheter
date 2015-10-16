window.startExtension = function() {
  var articles = document.querySelectorAll('article > a > h2');
  console.log("Found %s number of articles!", articles.length);
  var clickbaitCount = 0,
      articleCount = 0;
  var clickbaitFiltered = [],
      articlesN = [];

  var filterPlus = true;
  var filterBait = true;

  [].forEach.call(document.querySelectorAll('article > a'), function(v,i,a) {
      if(v.className.indexOf('abTeaserImageLink-js') < 0 && v.className.indexOf('abStreamerSmall') < 0 && v.parentNode.className.indexOf('abItemHLine') < 0) {
        console.log(v.textContent);
        console.log(typeof window.isClickbait(v.textContent));

        if(filterBait && window.isClickbait(v.textContent)) {
          if(v.parentNode) {
            clickbaitCount++;
            clickbaitFiltered.push(v.textContent);
            console.log(v.parentNode);
            v.parentNode.parentNode.removeChild(v.parentNode);
          }
        } else {
          articlesN.push(v.textContent);
          articleCount++;
        }
      } else {
        console.log(v.getElementsByClassName());
      }


      /*console.log(window.isClickbait);
      console.log(v.textContent);
      console.log(window.isClickbait(v.textContent));*/
  });
  console.log("%s of %s are clickbait. %s%", clickbaitCount, articles.length, (clickbaitCount/articles.length*100));
  console.log("Filtered articles:");
  console.log(clickbaitFiltered);
  console.log("Not filtered articles:");
  console.log(articlesN);
}