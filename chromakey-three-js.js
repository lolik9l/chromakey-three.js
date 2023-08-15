/* 
  Usage:

  import ChromaKeyMaterial from './chromakey-three-js';

  // 0xd432 is the green screen color, insert yours, if different, below
  const keyColor = 0xd432;
  const myGreenScreenMaterial = new ChromaKeyMaterial("video", keyColor);
  const myGeometry = new THREE.PlaneGeometry(32, 18);
  const myGreenScreenVideoObject = new THREE.Mesh(myGeometry, myGreenScreenMaterial);

  scene.add( myGreenScreenVideoObject );
*/

import * as THREE from "three"; // Or window.THREE

console.log(THREE, "THREE");

class ChromaKeyMaterial extends THREE.ShaderMaterial {
  constructor(idVideo, keyColor) {
    super();

    const video = document.getElementById(idVideo);
    const self = this;

    if (video && THREE) {
      this.video = video;
      this.keyColorObject = new THREE.Color(keyColor);

      this.video.load();

      this.videoTexture = new THREE.VideoTexture(video);
      this.videoTexture.minFilter = THREE.LinearFilter;
      // this.videoTexture.magFilter = THREE.LinearFilter;

      // TODO: add a wait for the video to load

      this.setValues({
        uniforms: {
          textureSampler: {
            type: "t",
            value: self.videoTexture,
          },
          color: {
            type: "c",
            value: self.keyColorObject,
          },
        },
        vertexShader:
          "varying vec2 vUv;\n" +
          "void main(void)\n" +
          "{\n" +
          "  vUv = uv;\n" +
          "  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
          "  gl_Position = projectionMatrix * mvPosition;\n" +
          "}",
        fragmentShader:
          "uniform sampler2D textureSampler;\n" +
          "uniform vec3 color;\n" +
          "varying vec2 vUv;\n" +
          "void main(void)\n" +
          "{\n" +
          "  vec3 tColor = texture2D( textureSampler, vUv ).rgb;\n" +
          "  float a = (length(tColor - color) - 0.5) * 7.0;\n" +
          "  gl_FragColor = vec4(tColor, a);\n" +
          "}",
        transparent: true,
      });

      return this;
    } else {
      console.error(
        "video is not set or the THREE.js library is not available"
      );
    }
  }
}

export default ChromaKeyMaterial;
