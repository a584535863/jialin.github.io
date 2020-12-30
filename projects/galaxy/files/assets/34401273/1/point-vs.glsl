attribute vec3 aPosition;
attribute vec4 aColor;
varying vec4 vColor;
uniform float size;
uniform float scale;
uniform mat4 matrix_view;
uniform mat4 matrix_model;
uniform mat4 matrix_projection;
void main()
{
vColor = aColor;
vec4 mvPosition = matrix_view * matrix_model * vec4(aPosition,1.0);
gl_PointSize = size * (scale / - mvPosition.z);
gl_Position = matrix_projection * mvPosition;
}
