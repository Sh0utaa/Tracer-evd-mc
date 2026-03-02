class LAr extends Event {
  selected_color = new THREE.Color(0x10e60b);
  original_color = new THREE.Color(0x3fe33b);
  isChecked = false;
  #minEnergy = 0.2;

  constructor(XML, tagName = "LAr", index = 0) {
    super(tagName, index);
    const lar_obj = new THREE.Object3D();
    lar_obj.name = "LAR";
    scene.getObjectByName("EGO").add(lar_obj);

    this.readCommonParams(XML, tagName, index);

    this.energy = this.convertToNums(this.readTagText(this.tag, "energy", 0));
    this.eta = this.convertToNums(this.readTagText(this.tag, "eta", 0));
    this.phi = this.convertToNums(this.readTagText(this.tag, "phi", 0));
    this.ID = this.convertToNums(this.readTagText(this.tag, "id", 0));
    this.theta = this.eta.map((eta) => 2 * Math.atan(Math.pow(Math.E, -eta)));
    this.drawLAR();
  }
  drawLAR() {
    this.clearLAR();
    const scope = this;
    this.eta.forEach((_, i) => {
      if (this.#minEnergy && scope.energy[i] <= this.#minEnergy) return;
      const sizey = 0.05 * scope.energy[i];
      // const cube = scope.createCube(i, sizey, sizey, sizey);
      const sizexz = 0.03;
      const cube = scope.createCube(i, sizexz, sizey, sizexz);
      scene.getObjectByName("LAR").add(cube);
    });
  }
  clearLAR() {
    scene.getObjectByName("LAR").clear();
  }
  createCube(index, sizeX = 1, sizeY = 1, sizeZ = 1) {
    const geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);

    const material = this.getShaderMaterial();
    const cube = new THREE.Mesh(geometry, material);
    const radius = 1.5;
    const height = 3.5;
    const angleLim = Math.atan(radius / height);

    const R1 = Math.abs(radius / Math.sin(this.theta[index])) + sizeY / 2;
    const R2 = Math.abs(height / Math.cos(this.theta[index])) + sizeY / 2;

    const x = Math.sin(this.theta[index]) * Math.cos(this.phi[index]);
    const y = Math.sin(this.theta[index]) * Math.sin(this.phi[index]);
    const z = Math.cos(this.theta[index]);

    if (
      this.theta[index] < angleLim ||
      Math.PI - this.theta[index] < angleLim
    ) {
      // console.log(this.theta[index], R2);
      cube.position.set(R2 * x, R2 * y, R2 * z);
    } else {
      cube.position.set(R1 * x, R1 * y, R1 * z);
    }
    cube.index = index;

    const startVector = new THREE.Vector3(0, 1, 0); // starting orientation
    const vector = new THREE.Vector3(x, y, z);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      startVector,
      vector
    );
    geometry.applyQuaternion(quaternion);

    // cube.rotation.x = this.phi[index];
    // cube.rotation.z = this.theta[index] - Math.PI / 2;
    cube.angleLim = angleLim;
    cube.R1 = R1;
    cube.R2 = R2;
    return cube;
  }
  resetColors() {
    this.isChecked = false;
    $(".track-jet-info, .LAR-info-table").removeClass("d-flex");
    scene.getObjectByName("LAR").children.forEach(
      function (obj) {
        obj.material = this.getShaderMaterial();
      }.bind(this)
    );
  }
  updateInfoWindow(chosenObj) {
    $("#LAR-Et-val").html(this.energy[chosenObj.index]);
    $("#LAR-phi-val").html(this.phi[chosenObj.index]);
    $("#LAR-eta-val").html(this.eta[chosenObj.index]);
    console.log(
      `angleLim: ${chosenObj.angleLim}, theta: ${
        this.theta[chosenObj.index]
      }  R1: ${chosenObj.R1}, R2: ${chosenObj.R2}`
    );
  }
  getShaderMaterial(
    color = this.original_color,
    opacity = this.isChecked ? 0.25 : 1
  ) {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(color) },
        opacity: {
          value: opacity,
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    });
  }
}
