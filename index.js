var mimir = require('mimir'),
    bow = mimir.bow,
    dict = mimir.dict;
var svm = require('node-svm'),
    clf = new svm.CSVC();
var fs = require('fs');
var natural = require('natural'),
    classifier = new natural.BayesClassifier();

fs.readFile('testData.json', function(err, data) {
  if(err) 
    throw new Error(err);

  var baitData = [],
      nonBaitData = [];

  data = JSON.parse(data);

  data.nonClickbait.map(function(article) {
    nonBaitData.push(article.title + " " + article.paragraph)
    classifier.addDocument(article.title + " " + article.paragraph, 'not clickbait');
  });


  data.clickbait.map(function(article, index) {
    baitData.push(article.title + " " + article.paragraph);
    classifier.addDocument(article.title + " " + article.paragraph, 'clickbait');
  });

  
  classifier.train();


  var testString = "Här händer det som borde vara omöjligt.";
  console.log(testString);
  console.log(classifier.getClassifications(testString));
  console.log(classifier.classify(testString));




})