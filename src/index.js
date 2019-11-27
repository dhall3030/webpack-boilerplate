import "./scss/main.scss";
console.log("hello, world");

$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});