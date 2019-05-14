export default {
  open( opts: any ): void {
    window.open(opts.url || '');
  },
  close(): void {
    window.close();
  }
}
