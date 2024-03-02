(function(){
$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  [name, phone, comment, to].forEach(field => {
    field.removeClass('form__input--error');
    
    if (field.val().trim() === '') {
      field.addClass('form__input--error');
    }
  });

  const errorFields = form.find('form__input--error');

  if (errorFields.length === 0) {

    const json_data = JSON.stringify({
      name: name.val(),
      phone: phone.val(),
      comment: comment.val(),
      to: 'vl4dkudi@gmail.com'
    })

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(json_data);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        document.getElementById('my-modal').classList.add('modal--open');
      } else {
        document.getElementById('my-modal').classList.remove('modal--open');
        form.reset();
      }
    })
  }
  })
})()
