$(document).ready(function() {
    $(window).resize(function() {
        var bodywidth = $(this).width();
        var bodyheight = $(this).height();
        var contentlistmain = $("content-list-main");


      

        if (bodywidth >=1600)
        {
          $("#content-list-main").width(bodywidth * 0.25);
          $("#content-list-main").height(bodywidth * 0.25);
  $("#header-name").width(bodywidth * 0.25);

        }

        if (bodywidth >=1024 && bodywidth <=1600 )
        {
          $("#content-list-main").width(bodywidth * 0.33);
          $("#content-list-main").height(bodywidth * 0.33);
  $("#header-name").width(bodywidth * 0.33);

        }

        if (bodywidth >= 780 && bodywidth < 1024)
        {
          $("#content-list-main").width(bodywidth * 0.5);
          $("#content-list-main").height(bodywidth * 0.5);
  $("#header-name").width(bodywidth * 0.5);

        }

        if (bodywidth >=600 && bodywidth < 780)
        {
          $("#content-list-main").width(bodywidth * 0.6);
          $("#content-list-main").height(bodywidth * 0.6);
        $("#header-name").width(bodywidth * 0.6);

        }


        if (bodywidth >=500 && bodywidth < 600 )
        {
          $("#content-list-main").width(bodywidth * 0.7);
          $("#content-list-main").height(bodywidth * 0.7);
  $("#header-name").width(bodywidth * 0.7);

        }

        if (bodywidth < 500 )
        {
          $("#content-list-main").width(bodywidth * 0.8);
          $("#content-list-main").height(bodywidth * 0.8);
        $("#header-name").width(bodywidth * 0.8);

        }

    }).resize();
});
