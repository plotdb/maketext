(->
  config = css: {}, js: {}
  config.css <<< do
    base: <[
      /assets/bootstrap/4.0.0/css/bootstrap.min.css
      /assets/fontawesome/4.7.0/css/font-awesome.min.css
      /assets/ldcolorpicker/0.1.4/ldcp.css
      /assets/clusterize/0.18.1/clusterize.css
      /assets/ion-rangeslider/2.1.7/css/ion.rangeSlider.css
      /assets/ion-rangeslider/2.1.7/css/ion.rangeSlider.skinFlat.css
      /css/index.css
    ]>
  config.js <<< do
    base: <[
      /assets/jquery/1.10.2/jquery.min.js
      /assets/popper/1.12.5/index.js
      /assets/bootstrap/4.0.0/js/bootstrap.min.js
      /assets/text-to-svg/3.1.3/bundle.js
      /assets/ldcolorpicker/0.1.4/ldcp.js
      /assets/clusterize/0.18.1/clusterize.min.js
      /assets/ion-rangeslider/2.1.7/js/ion.rangeSlider.min.js
      /assets/smiltool/latest/index.js
      /effects/effects.js
      /assets/fonts/fonts.js
      /assets/tmp/palettes.js
      /js/editor/index.js
      /js/editor/palette.js
      /js/editor/font.js
      /js/editor/download.js
    ]>
  if module? => module.exports = config
)!


