$(document).ready(function() {
    $(window).resize(function() {
        var bodywidth = $(this).width();
        var bodyheight = $(this).height();
        var contentlistmain = $("content-list-main");


        $("#header-name").width(bodywidth * 0.33);
        if (bodywidth >=1024)
        {
          $("#content-list-main").width(bodywidth * 0.33);
          $("#content-list-main").height(bodywidth * 0.33);
  $("#header-name").width(bodywidth * 0.33);

        }

       if (bodywidth < 1024)
        {
          $("#content-list-main").width(bodywidth * 0.5);
          $("#content-list-main").height(bodyheight * .7);
  $("#header-name").width(bodywidth * 0.5);


        }

    }).resize();
});
