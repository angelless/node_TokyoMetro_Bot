var request = require("request");
var cheer = require('cheerio');

module.exports = function(start, end) {
  let url = 'https://www.tokyometro.jp/kr/ticket/search/index.php?ticSearchName01_01=' + start + '&ticSearchName01_02=' + end + "&priority=priTime&day=21&month=201803&hour=0&minute=47&searchOrder=departureTime&fareType=typeAdult&search.x=115&search.y=17";
  request(url, function(error, response, body) {

    if (error) throw error;
    var $ = cheer.load(body);
    var postElements = $("p.stName");
    //  console.log(postElements.contents().data);
    var str = "";
    postElements.contents().each(function() {
      var d = this;
      //  console.log(d.data);
      if (start == d.data.toString()) {
        str += ",";
      }
      str += d.data + " -> ";

    })
    console.log(str.split(",")[1]);
    mes = str.split(",")[1];
  })
}
