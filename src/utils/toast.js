class showNotice  {
  type = 'none';
  title = '---';
  duration = 1000;
  success(title = '...', duration = 1000) {
    this.init('success', title, duration);
    this.notice();
  }
  error(title = '...', duration = 1000) {
    this.init('error', title, duration);
    this.notice();
  }
  fail(title = '...', duration = 1000) {
    this.init('fail', title, duration);
    this.notice();
  }

  showLoading(title = '...', duration = 1000) {
    this.init('loading', title, duration);
    this.notice();
  }
  hideLoading() {
    uni.hideLoading();
  }

  init(type = 'none', title = '...', duration = 1000) {
    this.type = type;
    this.title = title;
    this.duration = duration;
  }
  notice() {
    if (this.type == 'loading') { 
      uni.showLoading({
        title: this.title,
      })
      return;
    }
    uni.showToast({
      icon: this.type,
      title: this.title,
      duration: this.duration,
      mask: true
    });
  }
}
let Notice = new showNotice;
export { Notice };