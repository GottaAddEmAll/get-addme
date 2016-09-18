

function renderSocialElements() {
  $('#social').html('');
  $('#social').addClass('social-render');

  var socialElements = [
                        '<a href="https://api.instagram.com/oauth/authorize/?client_id=fc50049ba7df49b7b96535f892642366&redirect_uri=http://getaddme.herokuapp.com/oauth/ig&response_type=code&scope=relationships"><button class="fa fa-instagram"></button></a>',
                        '<a href="https://www.facebook.com/dialog/oauth?client_id=134558940334255&redirect_uri=http://getaddme.herokuapp.com/oauth/fb"><button class="fa fa-facebook"></button></a>',
                        '<a href="https://github.com/login/oauth/authorize/?client_id=89221658f77bf282f490&redirect_uri=http://getaddme.herokuapp.com/oauth/gh&scope=user"><button class="fa fa-github"></button></a>',
                        ];
  var elementAdded = socialElements[0];

  for (var i = 1; i <= socialElements.length; i++){
    $('#social').html(elementAdded);
    elementAdded += socialElements[i];
  }
};

$(function(){

  $('#submit-phone').on('click', function(){
    renderSocialElements();
  });

});
