window.onload = function() {

  /*********Get User ID**********/
  var userid = null;
  var userIdCreated = false;
  var userIdForm = document.getElementById('phone-number');

  userIdForm.addEventListener('submit', function(){
    userid = document.getElementsByName('phone-number')[0].value;
  });
  /******************************/

  //Create a conditional if userId is created then render the social buttons to the DOM

  module.exports.userid = userid;
}
