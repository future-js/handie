import "@polymer/polymer/lib/elements/dom-if";
import { Element } from "@polymer/polymer/polymer-element";

if ( window.Polymer ) {
  window.Polymer.Element = Element;
}
else {
  window.Polymer = { Element };
}
