class MuuAppContent extends Polymer.Element {
  static get is() {
    return "x-app-content";
  }

  static get properties() {
    return {
      title: {
        type: String,
        value: ""
      }
    };
  }

  // connectedCallback() {
  //   super.connectedCallback();

  //   this.className += "Page-header";
  // }
}
