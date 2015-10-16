window.startExtension = function() {
  var articles = $('article');
  console.log($('article'));
  console.log("Found %s number of articles!", articles.length);
  var clickbaitCount = 0,
      articleCount = 0;
  var clickbaitFiltered = [],
      articlesN = [];

  var filterPlus = true;
  var filterBait = true;

  articles.each(function(index) {
    var article = $(this);

    article.children().each(function(i) {
      var a = $(this);
      //abStreamSmall might be for PLUS articles
      if(!a.hasClass('abTeaserImageLink-js') && !a.hasClass('abStreamerSmall') 
                                             && !a.hasClass('abItemHLine')) {
        var text = a.text().replace(/(\r\n|\n|\r)/gm, '');
        if(text.indexOf('<img src') < 0) {
          console.log("Valid article:");
          console.log(a.text());
          if(filterBait && window.isClickbait(text)) {
            clickbaitCount++;
            clickbaitFiltered.push(text);
            //article.remove();
          } else {
            articlesN.push(text);
            articleCount++;
          }
        }
      }
    });
  });

  console.log("%s of %s are clickbait. %s%", clickbaitCount, articles.length, (clickbaitCount/articles.length*100));
  console.log("Filtered articles:");
  console.log(clickbaitFiltered);
  console.log("Not filtered articles:");
  console.log(articlesN);
}