(function() {
const mesureWidth = item => {
  let reqItemWidth = 0;
  const screenWidth = $(window).width();
  const container = item.closest('.color__menu');
  const titlesBlocks = container.find('.color__title');
  const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

  const textContainer = item.find('.color__info');
  const paddingLeft = parseInt(textContainer.css('padding-left'));
  const paddingright = parseInt(textContainer.css('padding-right'));
 
  const isMobile = window.matchMedia('(max-width: 768ps)').matches;

  if(isMobile) {
  reqItemWidth = screenWidth - titlesWidth;
  } else {
    reqItemWidth = 500;
  }

  return {
    container: reqItemWidth,
    textContainer: reqItemWidth - paddingright - paddingLeft
  }
};
const closeEveryItemInContainer = container => {
  const items = container.find('.color__item');
  const content = container.find('.color__content');
  
  items.removeClass('color__item--active');
  content.width(0);
}
const openItem = (item) => {
  const hiddenContent = item.find('.color__content');
  const reqWidth = mesureWidth(item);
  const textBlock = item.find('.color__info');

  item.addClass('color__item--active');
  hiddenContent.width(reqWidth.container);
  textBlock.width(reqWidth.textContainer);
}

$('.color__title').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const item = $this.closest('.color__item');
  const itemOpened = item.hasClass('color__item--active');
  const container = $this.closest('.color__menu');

  if (itemOpened) {
    closeEveryItemInContainer(container)
  } else {
    closeEveryItemInContainer(container)
    openItem(item);
  }
});
})();