class Segment extends Event {
  ORIGINAL_COLOR = new THREE.Color(0x3483eb);
  constructor(XML, tagName = "Segment", index = 0) {
    try {
      super(tagName, index);
      const segmentObj = new THREE.Object3D();
      segmentObj.name = "SEGMENT";
      scene.getObjectByName("EGO").add(segmentObj);

      this.readCommonParams(XML, tagName, index);

      this.phi = this.convertToNums(this.readTagText(this.tag, "phi", 0));
      this.theta = this.convertToNums(this.readTagText(this.tag, "theta", 0));
      this.X = this.convertToNums(this.readTagText(this.tag, "x", 0));
      this.Y = this.convertToNums(this.readTagText(this.tag, "y", 0));
      this.Z = this.convertToNums(this.readTagText(this.tag, "z", 0));
      this.drawSegment();
    } catch (err) {
      console.log("There are no Muon segments in current event");
      if (scene.getObjectByName("SEGMENT")) this.clearSegment();
    }
  }
  drawSegment() {
    this.clearSegment();
    for (let i = 0; i < this.numberOfEventParams; i++) {
      scene.getObjectByName("SEGMENT").add(this.createSegment(i));
    }
  }
  clearSegment() {
    scene.getObjectByName("SEGMENT").clear();
  }
  createSegment = (index) => {
    const lengthCoefficient = 0.05;
    const center = [
      this.X[index] / 100,
      this.Y[index] / 100,
      this.Z[index] / 100,
    ];

    const startingPoint = center.map((c) => c - c * lengthCoefficient);
    const endingPoint = center.map((c) => c + c * lengthCoefficient);

    const points = [];
    points.push(new THREE.Vector3(...startingPoint));
    points.push(new THREE.Vector3(...center));
    points.push(new THREE.Vector3(...endingPoint));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
      color: this.ORIGINAL_COLOR,
    });
    const segmentLine = new THREE.Line(geometry, material);

    return segmentLine;
  };
  //   resetColors() {
  //     this.isChecked = false;
  //     $(".track-jet-info, .LAR-info-table").removeClass("d-flex");
  //     scene.getObjectByName("LAR").children.forEach(
  //       function (obj) {
  //         obj.material = this.getShaderMaterial();
  //       }.bind(this)
  //     );
  //   }
  //   updateInfoWindow(chosenObj) {
  //     $("#LAR-Et-val").html(this.energy[chosenObj.index]);
  //     $("#LAR-phi-val").html(this.phi[chosenObj.index]);
  //     $("#LAR-eta-val").html(this.eta[chosenObj.index]);
  //     console.log(
  //       `angleLim: ${chosenObj.angleLim}, theta: ${
  //         this.theta[chosenObj.index]
  //       }  R1: ${chosenObj.R1}, R2: ${chosenObj.R2}`
  //     );
  //   }
}
