# Chromakey THREE.js
#### Remove chromakey in the video using three.js.

## Installation
1. Install an up-to-date version of Three.js, for example:
```
<script async src="https://unpkg.com/es-module-shims@1.6.3/dist/es-module-shims.js"></script>

<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@v0.149.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@v0.149.0/examples/jsm/"
  }
}
</script>
```
2. Copy the code in the file (chromakey-three-js.js) into your project

## Usage
Don't forget to create a three.js scene if you don't already have one.

Use case:
```
// video - is the id video in your HTML
// 0xd432 - is the color you want to remove
const myGreenScreenMaterial = new ChromaKeyMaterial("video", 0xd432);

// for example, we can place the video on a plane
const myGeometry = new THREE.PlaneGeometry(32, 18);
const myGreenScreenVideoObject = new THREE.Mesh(myGeometry, myGreenScreenMaterial);

// don't forget to add to your animate function:
scene.add(myGreenScreenVideoObject);
```
The code was taken from [here](https://github.com/hawksley/Threex.chromakey) and improved for current realities (2023's)

If there are any bugs or bugs write, we will fix :)
