export default {
  open( opts ) {
    window.open(opts.url || '');
  },
  close() {
    window.close();
  }
}
