window.startExtension = function() {
    chrome.storage.sync.get({
        filterBait: true,
        filterPro: true,
        silent: true
      }, function(items) {

      var clickbaitCount = 0,
          articleCount = 0,
          plusCount = 0;
      var clickbaitFiltered = [],
          articlesN = [],
          plus = [];
      var filterPlus = items.filterPro;
      var filterBait = items.filterBait;
      var silent     = items.silent;

      var articles = $('article');
      if(silent) {
        console.log = function() {}
      }

      console.log("Found %s number of articles!", articles.length);

      if(filterPlus) {
        //console.log($('.abSlimList > li'));
        $('.abSlimList > li').each(function(i) {
          var smallArticle = $(this);
          smallArticle.find('span').each(function(j) {
            var span = $(this);
            console.log(span);
            if(span.text().indexOf('PLUS') >= 0) {
              smallArticle.remove();
            }
          });
        })
      }

      articles.each(function(index) {
        var article = $(this);
        article.children().each(function(i) {
          var a = $(this);
          var filtered = false;
          var header = $(a.find('h2')[0]).text().replace(/(\r\n|\n|\r)/gm, '');
          var paragraph = "";

          $(a.find('p')).each(function(i) {
            var p = $(this).text().replace(/(\r\n|\n|\r)/gm, '');
            paragraph += p;//p ? p : '';
          });
          if(header && paragraph) {
            console.log("Header: '%s'", header);
            console.log("paragraph: '%s'", paragraph);
            if(filterPlus) {
              if(paragraph.indexOf('PLUS') >= 0) {
                plus.push([header, paragraph]);
                plusCount++;
                article.remove(); 
                filtered = true; 
              } else {
                $(article.find('span')).each(function(i) {
                  if($(this).text().indexOf('PLUS') >= 0) {
                    plus.push([header, paragraph]);
                    plusCount++;
                    article.remove();
                    filtered = true; 
                  }
                })
              }
            } 

            //console.log("filtered: %s, filterBait: %s, clickbait: %s", filtered, filterBait, window.isClickbait(header, paragraph));
            if(window.isClickbait(header, paragraph)) {
              clickbaitCount++;
              clickbaitFiltered.push([header, paragraph]);
              article.remove();
            } else {
              articlesN.push([header, paragraph]);
              articleCount++;
            }
          }
        });
      });

      console.log("%s of %s are clickbait. %s%. %s PLUS articles", clickbaitCount, articles.length, (clickbaitCount/articles.length*100), plusCount);
      console.log("Filtered articles:");
      console.log(clickbaitFiltered);
      console.log("Not filtered articles:");
      console.log(articlesN);
      console.log("PLUS articles:");
      console.log(plus);
    });
}
