const findBlockByAlias = alias => {
  return $('.comments__display-inner').filter((ndx, item) => {
    return $(item).attr('data-linked-with') == alias;
  });
}
$('.interactive-avatar__link').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-open')
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest('.interactive-avatar');

  itemToShow.addClass('comments__display-inner--active').siblings().removeClass('comments__display-inner--active');
  curItem.addClass('interactive-avatar--active').siblings().removeClass('interactive-avatar--active');
});