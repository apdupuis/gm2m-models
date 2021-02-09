AFRAME.registerComponent('override-outer-glow-material', {         
          init: function () {
            let el = this.el;
            let comp = this;
            let data = this.data;
            comp.scene = el.sceneEl.object3D;  
            comp.counter = 0;   
            comp.treeModels = [];
            comp.modelLoaded = false;

            // After gltf model has loaded, modify it materials.
            el.addEventListener('model-loaded', function(ev){
              let mesh = el.getObject3D('mesh'); 
              if (!mesh){return;}
              //console.log(mesh);
              mesh.traverse(function(node){
                 if (node.isMesh){
                   let mat = node.material;
                   let baseColor = new THREE.Color(0x000000);
                   let emissiveColor = new THREE.Color(0xffffff);
                   mat.emissiveIntensity = 1;
                   mat.emissive = emissiveColor;
                   mat.color = baseColor;
                   mat.side = THREE.FrontSide;
                   mat.emissiveMap.encoding = THREE.LinearEncoding;
                   mat.blending = THREE.AdditiveBlending;
                   mat.depthWrite = false;
                   // mat.transparent = true;
                   // mat.opacity = 0.9;
                   node.material = mat;               
                 }
              });
              comp.modelLoaded = true;
            });   
          }
        });