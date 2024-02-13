$(document).ready(() => {

  $('.card__header').on('click', function() {
    $(this).next().slideToggle(500);
   
  })
});