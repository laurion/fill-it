(function() {
  console.log("hello from a require'd coffee file (via assets/js/_helper.coffee)");

}).call(this);

(function() {
  require.config({
    paths: {
      jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min'
    }
  });

  require(['jquery'], function($) {
    var col, content, h, i, j, user, w;
    console.log('jquery loaded (via assets/js/main.coffee)');
    content = '';
    w = 20;
    h = 20;
    user = 1;
    if (user === 1) {
      col = "#FF0";
    }
    if (user === 2) {
      col = "#F00";
    }
    i = 0;
    while (i < h) {
      content += "<tr>";
      j = 0;
      while (j < w) {
        content += "<td>" + i + "," + j + " </td>";
        j++;
      }
      content += "</tr>";
      i++;
    }
    $("#tb").append(content);
    return $("td").click(function() {
      return $(this).css("background", col);
    });
  });

}).call(this);
