var fs = require('fs');
var natural = require('natural'),
    classifier = new natural.BayesClassifier();
var data;

window.isClickbait = function(header) {

  return (classifier.classify(header) === 'true');
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
    data = JSON.parse(xhr.responseText);

    data.nonClickbait.map(function(article) {
      classifier.addDocument(article.title + " " + article.paragraph, false);
    });

    data.clickbait.map(function(article, index) {
      classifier.addDocument(article.title + " " + article.paragraph, true);
    });

    classifier.train();
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