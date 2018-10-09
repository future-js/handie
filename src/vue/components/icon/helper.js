const SVG_ID = "__MUU_SVG_SPRITE_NODE__";

/* tslint:disable:max-line-length */
// inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
// Much simplified, do make sure run this after document ready
const svgSprite = contents => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="${SVG_ID}"
    style="position:absolute;width:0;height:0"
  >
    <defs>
      ${contents}
    </defs>
  </svg>
`;

const renderSvgSprite = (icons) => {
  const symbols = Object.keys(icons).map(iconName => {
    const svgContent = icons[iconName].split('svg')[1];
    return `<symbol id=${iconName}${svgContent}symbol>`;
  }).join('');
  return svgSprite(symbols);
};

const loadSprite = (icons) => {
  if (!document) {
    return;
  }
  const existing = document.getElementById(SVG_ID);
  const mountNode = document.body;

  if (!existing) {
    mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite(icons));
  }
};

export default loadSprite;
