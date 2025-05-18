import { Helmet } from 'react-helmet';
export function WaterPool() {

  return <div id='waterpool'>
    <img style={{display: 'none'}} id="tiles" src="tiles.jpg" />
    <img style={{display: 'none'}} id="xneg" src="xneg.jpg" />
    <img style={{display: 'none'}} id="xpos" src="xpos.jpg" />
    <img style={{display: 'none'}} id="ypos" src="ypos.jpg" />
    <img style={{display: 'none'}} id="zneg" src="zneg.jpg" />
    <img style={{display: 'none'}} id="zpos" src="zpos.jpg" />

    <Helmet>
      <script src="OES_texture_float_linear-polyfill.js"></script>
      <script src="lightgl.js"></script>
      <script src="cubemap.js"></script>
      <script src="renderer.js"></script>
      <script src="water.js"></script>
      <script src="main.js"></script>
    </Helmet>
  </div>
}