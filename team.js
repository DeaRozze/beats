const openItem = (item) => {
  const container = item.closest('.team__item');
  const contentBlock = container.find('.team__content');
  const textBlock = contentBlock.find('.team__content-block');
  const reqHeight = textBlock.height();

  container.addClass('team__subtitle--active');
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find('.team__item');

  itemContainer.removeClass('team__subtitle--active');
  items.height(0);
}

$('.team__subtitle').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest('.team__item');

  if (elemContainer.hasClass('team__subtitle--active')) {
    closeEveryItem(container);
  } else {
  closeEveryItem(container);
  openItem($this);
  }
});