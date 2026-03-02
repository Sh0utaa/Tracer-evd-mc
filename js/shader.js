// var vertexShader = `
// varying vec4 pos;
//   void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
//     pos=vec4(position,1.0);
// }
// `;
// var fragmentShader = `
//     //#extension GL_OES_standard_derivatives : enable
//   uniform vec3 color1;
//   uniform vec3 color2;
//   uniform vec3 edge_color;
//   varying vec4 pos;
//   uniform float depth;
//   uniform float height;
//   uniform float width1;
//   uniform float width2;
//   uniform float opacity;

//   void main() {
//     float n=(2.*height-(pos.y+height))/(2.*height);
//     float pct = float(abs(abs(pos.z-depth)-abs(depth))<0.01)+float(abs(abs(pos.y)-abs(height))<0.01)+float((width2-width1)*n+width1-abs(pos.x)<0.01);
//     pct=float(pct>=2.);
//     // if (pos.y/height<0.5) vec3 color=color1;
//     // else color=color2;
//     vec3 color;
//     if (pos.x/(width2-width1)<0.5) color=color1;
//     else color=color2;
//     gl_FragColor = vec4(mix(color.rgb,edge_color.rgb,pct),opacity);
//   }
// `;

// Define the vertex shader
var vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// Define the fragment shader
var fragmentShader = `
    uniform vec3 color;
    uniform float opacity;
    void main() {
        gl_FragColor = vec4(color, opacity);
    }
`;
