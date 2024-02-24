const mesureWidth = () => {
  return 500;
}

const openItem = item => {
  const hiddenContent = item.find('.color__content');
  const reqWidth = mesureWidth();

  hiddenContent.width(reqWidth);

}
(function() {
$('.color__title').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.color__item');

  openItem(item);
  
});
})();