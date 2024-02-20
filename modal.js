$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  [name, phone, comment, to].forEach(field => {

    if(field.val() === '') {
      field.addClass('.input-error');
    }
  })
  $.ajax({
    url: 'https://webdev-api.loftschool.com/sendmail',
    method: 'post',
    data: {
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: to.val(),
    }
  });

});

$('.app-submit-btn').click(e => {
  e.preventDefault();
});

document.getElementById("open-modal-btn").addEventListener('click', function(){
  document.getElementById('my-modal').classList.add('modal--open')
})

document.getElementById("app-submit-btn").addEventListener('click', function(){
  document.getElementById('my-modal').classList.remove('modal--open')
})

document.querySelector('#my-modal .modal__container').addEventListener('click', e=> {
  e._isClickWithInModal = true;
});

document.getElementById('my-modal').addEventListener('click', e => {
  if (e._isClickWithInModal) return;
  e.currentTarget.classList.remove('modal--open');
});