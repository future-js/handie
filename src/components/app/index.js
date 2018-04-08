class MuuApp extends Polymer.Element {
  static get is() {
    return "x-app";
  }

  static get properties() {
    return {};
  }

  ready() {
    super.ready();

    const style = "height: 100%;";
    
    document.body.style.cssText += style;
    document.documentElement.style.cssText += style;
  }
}
