attribute vec3 aPosition;
varying vec3 rayDir;
uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;
void main()
{
    gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition,1.0);
    rayDir = normalize(mat3(matrix_model)*aPosition);
}
