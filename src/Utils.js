let Utils = {
  changeColorByLuma: (hexColor) => {
    let rgb = parseInt(hexColor.slice(1), 16);

    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;
    //https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (luma < 50) {
      r = Math.floor(r * 0.95);
      g = Math.floor(g * 0.95);
      b = Math.floor(b * 0.95);
    } else {
      r = r < 243 ? Math.floor(r * 1.05) : 255;
      g = g < 243 ? Math.floor(g * 1.05) : 255;
      b = b < 243 ? Math.floor(b * 1.05) : 255;
    }
    return (
      "#" +
      ("00" + r.toString(16)).slice(-2) +
      ("00" + g.toString(16)).slice(-2) +
      ("00" + b.toString(16)).slice(-2)
    );
  },

  //-----------------------------------------------------------------
  // Hover implementation using automatic color change depending
  // on brightness using 'slightlyChangeBgColor' function
  handleHoverEnter: (e, styles, bgColor) => {
    e.currentTarget.style = `background: ${Utils.changeColorByLuma(
      bgColor
    )};` + styles;
  },

  handleHoverLeave: (e, styles) => {
    e.currentTarget.style = `background: none;` + styles;
  },
  //-----------------------------------------------------------------
};

export default Utils;