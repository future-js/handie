class MuuAppHeader extends Polymer.Element {
  static get is() {
    return "x-app-header";
  }

  static get properties() {
    return {
      url: {
        type: String,
        value: "/"
      },
      logo: {
        type: String,
        value: ""
      },
      logo2x: {
        type: String,
        value: ""
      },
      siteTitle: {
        type: String,
        value: ""
      }
    };
  }

  _getImageBaseUrl() {
    let baseUrl = "";

    try {
      a = b;
    }
    catch ( err ) {
      if( err.fileName ) {
        baseUrl = err.fileName; 
      }
      else if ( err.stack ) {
        baseUrl = (err.stack.match(/at[^\(]+\((.*\.js)/) || ["", ""])[1]; 
      }
      else if( err.sourceURL ) {
        baseUrl = err.sourceURL; 
      }
    }

    if ( baseUrl ) {
      const parts = baseUrl.split("\/");

      parts.reverse();

      while ( parts[0] !== "muu" ) {
        parts.shift();
      }

      parts.reverse();
      parts.push("images");

      baseUrl = parts.join("\/");
    }

    return baseUrl;
  }

  ready() {
    super.ready();

    if ( !this.logo ) {
      this.logo = `${this._getImageBaseUrl()}/logo.png`;
    }

    if ( !this.logo2x ) {
      this.logo2x = `${this._getImageBaseUrl()}/logo-2x.png`;
    }
  }
}
