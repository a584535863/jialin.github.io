precision highp float;
varying vec4 vColor;
uniform vec4 diffuse;
uniform float opacity;
uniform sampler2D map;
void main()
{
vec3 outgoingLight = vec3(0.0);
vec4 diffuseColor = vec4(diffuse.rgb,opacity);
vec4 mapTexel = texture2D(map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y));
diffuseColor *= mapTexel;
diffuseColor.rgb *= vColor.rgb;
outgoingLight = diffuseColor.rgb;
gl_FragColor = vec4(outgoingLight,diffuseColor.a);
}