// Credits : Irakli Kverenchkhiladze.

//////////////////////////////////////////////////////////////////////////////////
///   Nuclear Engineering Center at Georgian Technical University
///   TRACER Framework
///////////////////////////////////////////////////////   Creation History
///   Name:     particleAnimation.js
///   Subsystems: CORE
///   Path: tracer-tmp\subsystem\core\js\tracer.js
///   Description: es aris biblioteka romelic gvexmareba gavamartivot threejs is scenis shekmna
// selekcia geometriebis an loading,  geometriebis shekmna da ase shemdeg
/// Functions:  
// launch();
// loadParticles();
// stop()

///   Author: <ირაკლი კვერენჩხილაძე>                    
///   Date: <მაისი 2021>
///////////////////////////////////////////////////////   Change History
///   Name: <პროგრამისტის სახელი>          
///   Date:  <მოდიფიკაციის თარიღი>      
///   Description: <მოდიფიკაციის აღწერა>

class particleSystem {

    launch() {
        let scope = this;
        let clock = new THREE.Clock(); // saatis agwera 

        scope.renderer.autoClear = false; // ar wmindavs wina frame-is renderings 

        let speed = 0.12; // sichkare particlebis 
        let i = 0; // indikatori tu rodis unda daiwyos eventebis daxatva

        function animate() {

            i++;
            scope.animateParticles = window.requestAnimationFrame(animate);

            // gawmendva winaframeis 
            scope.renderer.clear();

            // renderireba mtavari scenis 
            scope.renderer.render(scope.scene, core.camera);
            // gawmendva wina frameis 
            scope.renderer.clearDepth();
            // renderireba postprocessingis 
            scope.composer.render(clock.getDelta());

            // poziciis shecvla particlebis 
            scope.particle1.position.z -= speed;
            scope.particle2.position.z += speed;

            // tu particlebis 0,0,0 wertilshia mashin daiwyos nawilakebis gabneva 
            if (scope.particle1.position.z < 0) {
                speed = 0;
                scope.parts[0].update();
                scope.particleScene.remove(scope.particle1);
                scope.particleScene.remove(scope.particle2);

                drawEvent(); // eventebis xatva 

                if (i > 300) {
                    // kudisebri efektis micema 
                    scope.afterimagePass.uniforms.damp.value = 0.45;
                    if (i > 350) {

                        scope.parts[0].object.material.opacity -= 0.003;

                        if (i > 800) {

                            scope.stop();

                        }

                    }

                }

            }

        }

        animate();
    }
    // acherebs particlebis animacias da anulebs yvela cvlads rac gamoyenebuli iyo particle animaciistvis garda postprocessingisa
    stop() {
        if (this.parts[0] != undefined) {
            this.particleScene.remove(this.parts[0].object);
        }

        this.particleScene.remove(this.particle1);
        this.particleScene.remove(this.particle2);

        this.parts = [];
        this.dirs = [];

        cancelAnimationFrame(this.animateParticles);
        this.animateParticles = undefined;
    }

    loadParticles() {

        let scope = this;

        // geometriis shekmna core-s funkcionalidan 
        this.particle1 = core.createSphereGeometry(0.05, 16, 32, 0xffffff);
        this.particle1.position.set(0, 0, 12.9);

        this.particle2 = core.createSphereGeometry(0.05, 16, 32, 0xffffff);
        this.particle2.position.set(0, 0, -12.9);

        // damateba postprocessing scenashi geometriebis 
        this.particleScene.add(this.particle1);
        this.particleScene.add(this.particle2);

        // dajaxebis shemdeg warmokmnili nawilebis sichkare raodenoba zoma
        let movementSpeed = 0.1;
        let totalObjects = 600;
        let objectSize = 0.025;

        function ExplodeAnimation() {

            let geometry = new THREE.BufferGeometry();
            let vert = [];

            for (var i = 0; i < totalObjects; i++) {

                vert.push(0);
                vert.push(0);
                vert.push(0);

                scope.dirs.push({ x: (Math.random() * movementSpeed) - (movementSpeed / 2), y: (Math.random() * movementSpeed) - (movementSpeed / 2), z: (Math.random() * movementSpeed) - (movementSpeed / 2) });
            }

            let iterable = function* () { yield* vert; }();
            let vertices = new Float32Array(iterable);

            geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

            let material = new THREE.PointsMaterial({ size: objectSize, transparent: true, color: 0xffffff });
            let particles = new THREE.Points(geometry, material);

            this.object = particles;
            this.object.material.opacity = 1;
            this.status = true;
            this.mustStop = false;

            this.xDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
            this.yDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
            this.zDir = (Math.random() * movementSpeed) - (movementSpeed / 2);

            this.i = 0;

            scope.particleScene.add(this.object);

            this.update = function () {
                if (this.status == true) {
                    let pCount = totalObjects;

                    while (pCount--) {

                        this.object.geometry.attributes.position.array[pCount * 3] += scope.dirs[pCount].x;
                        this.object.geometry.attributes.position.array[pCount * 3 - 1] += scope.dirs[pCount].y;
                        this.object.geometry.attributes.position.array[pCount * 3 - 2] += scope.dirs[pCount].z;
                        this.object.geometry.attributes.position.needsUpdate = true;

                    }

                    this.object.geometry.attributes.position.needsUpdate = true;
                }

            }

        }

        this.parts.push(new ExplodeAnimation(0, 0));
    }

    constructor(rend, scen) {
        // core renderer,scene,camera
        this.renderer = rend;
        this.scene = scen;

        // for animation
        this.animateParticles = undefined;

        // check ExplodeAnimation ..
        this.dirs = [];
        this.parts = [];

        // for animation 
        this.particlesBurst = true;
        this.bloom = false;
        this.explode = false;
        this.once = true;
        this.startDrawingCells = true;

        this.particleScene = new THREE.Scene();

        this.width = document.getElementById("mainScene").offsetWidth;
        this.height = document.getElementById("mainScene").offsetHeight;
        this.parameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat, stencilBuffer: true };

        this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, this.parameters);

        // EFFECTS afterimage, bloompass, composser
        this.afterimagePass = new THREE.AfterimagePass();
        this.afterimagePass.uniforms.damp.value = 0.30;


        this.bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.4, 0.85);
        this.bloomPass.threshold = 0;
        this.bloomPass.strength = 25;
        this.bloomPass.radius = 2;

        this.rendPass = new THREE.RenderPass(this.particleScene, core.camera);

        this.fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
        this.fxaaPass.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight);
        this.fxaaPass.material.transparent = true; // FIX

        this.particleScene.add(new THREE.AmbientLight(0x222222));
        this.particleScene.add(new THREE.DirectionalLight(0xffffff));

        this.composer = new THREE.EffectComposer(this.renderer, this.renderTarget);
        this.composer.addPass(this.rendPass);
        this.composer.addPass(this.afterimagePass);
        this.composer.addPass(this.bloomPass);
        this.composer.addPass(this.fxaaPass);

        this.fxaaPass.renderToScreen = true;

    }

}
