$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  [name, phone, comment, to].forEach(field => {
    field.removeClass('input-error');
    if (field.val().trim() === '') {
      field.addClass('form__input--error');
    }
  });

  const errorFields = form.find('input-error');

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

//     request.done((data) => {
//       document.getElementById('my-modal').classList.add('modal--open');
//   });
//   request.fail((data) => {
//     document.getElementById('my-modal').classList.remove('modal--open')
// });

//   }
// })
  


    //   success: (data) => {
        
    //       document.getElementById('my-modal').classList.add('modal--open')
        
    //   },
    //   error: ошибка  => {
        
    //     document.getElementById('my-modal').classList.remove('modal--open')
      
      
    // }
    // });
  




// $('.app-submit-btn').click(e => {
//   e.preventDefault();
// });

// document.getElementById("open-modal-btn").addEventListener('click', function () {
//   document.getElementById('my-modal').classList.add('modal--open')
// })

// document.getElementById("app-submit-btn").addEventListener('click', function () {
//   document.getElementById('my-modal').classList.remove('modal--open')
// })

// document.querySelector('#my-modal .modal__container').addEventListener('click', e => {
//   e._isClickWithInModal = true;
// });

// document.getElementById('my-modal').addEventListener('click', e => {
//   if (e._isClickWithInModal) return;
//   e.currentTarget.classList.remove('modal--open');
// });