$(function(){ //début

  $("#menu").click(function(){
  $("#panneau1").toggleClass('animation');
  $("#panneau2").toggleClass('animation');
  $("#panneau3").toggleClass('animation');
  $("#menu-texte").toggleClass('animation');
  $("#close").toggleClass('animation');

  $(this).toggleClass('fade');

  });


});
