var fs = require('fs');
var natural = require('natural'),
    classifierHeadline  = new natural.BayesClassifier(),
    classifierParagraph = new natural.BayesClassifier();
 
window.isClickbait = function(header, paragraph) {

  return (classifierHeadline.classify(header) === 'true' && classifierParagraph.classify(paragraph) === 'true');
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);

    data.nonClickbait.map(function(article) {
      classifierHeadline.addDocument(article.title, false);
      classifierParagraph.addDocument(article.paragraph, false);
    });

    data.clickbait.map(function(article, index) {
      classifierHeadline.addDocument(article.title, true);
      classifierParagraph.addDocument(article.paragraph, true);
    });

    classifierHeadline.train();
    classifierParagraph.train();
    window.startExtension();
    }
} 
xhr.open("GET", chrome.extension.getURL('/assets/json/testData.min.json'), true);
xhr.send();


module.exports = isClickbait;



/*fs.readFile('testData.json', function(err, data) {
  if(err) 
    throw new Error(err);

  data = JSON.parse(data);

  data.nonClickbait.map(function(article) {
    classifier.addDocument(article.title + " " + article.paragraph, 'not clickbait');
  });

  data.clickbait.map(function(article, index) {
    classifier.addDocument(article.title + " " + article.paragraph, 'clickbait');
  });

  classifier.train();

  var testString = "Här händer det som borde vara omöjligt.";
  console.log(testString);
  console.log(classifier.getClassifications(testString));
  console.log(classifier.classify(testString));

});*/