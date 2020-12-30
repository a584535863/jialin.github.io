precision highp float;
uniform vec4 _Color;
uniform vec4 _Scroll;
uniform vec4 _Center;
uniform float _CamScroll;
uniform vec4 _Rotation;
uniform float _Formuparam;
uniform float _StepSize;
uniform float _Tile;
uniform float _Brightness;
uniform float _Darkmatter;
uniform float _Distfading;
uniform float _Saturation;
uniform float _Time;
uniform vec3 view_position;
varying vec3 rayDir;
const int _Volsteps = 20;
const int _Iterations = 15;
void main()
{
   vec3 col = vec3(.0,.0,.0);
   vec3 dir = rayDir;
   float time = _Center.w + _Time;
   float brightness = _Brightness/1000.0;
   float stepSize = _StepSize /1000.0;
   vec3 tile = abs(vec3(_Tile,_Tile,_Tile)/1000.0);
   float formparam = _Formuparam / 1000.0;
   float darkmatter = _Darkmatter / 100.0;
   float distFade = _Distfading / 100.0;
   vec3 form = _Center.xyz;
   form += _Scroll.xyz * _Scroll.w * time;
   form += view_position * _CamScroll * 0.0001;
   vec3 rot = _Rotation.xyz * _Rotation.w * time * .1;
   if(length(rot) > 0.0 )
   {
       mat2 rx = mat2(cos(rot.x),sin(rot.x),-sin(rot.x),cos(rot.x));
       mat2 ry = mat2(cos(rot.y),sin(rot.y),-sin(rot.y),cos(rot.y));
       mat2 rz = mat2(cos(rot.z),sin(rot.z),-sin(rot.z),cos(rot.z));
       dir.xy = rz * dir.xy;
       dir.xz = ry * dir.xz;
       dir.yz = rx * dir.yz;
       form.xy = rz * form.xy;
       form.xz = ry * form.xz;
       form.yz = rx * form.yz;
   }
   float  s = 0.1, fade = 1.0;
   vec3 v = vec3(.0,.0,.0);
   for(int r = 0;r<_Volsteps;r++)
   {
       vec3 p = abs(form + s*dir*0.5);
       p = abs(vec3(tile -  mod(p,tile*2.0)));
       float pa,a = pa = 0.0;
       for(int i = 0;i<_Iterations;i++)
       {
           p = abs(p) / dot(p,p) - formparam;
           a += abs(length(p) - pa);
           pa = length(p);
       }
       float dm = max(0.0,darkmatter-a*a*0.001);
       if(r > 6) { fade *= 1.0 - dm;}
       a *= a*a;
       v.xyz += fade;
       v += vec3(s,s*s,s*s*s*s)*a*brightness*fade;
       fade *= distFade;
       s += stepSize;
   }
   float len = length(v);
   v = mix(vec3(len,len,len),v,_Saturation / 100.0);
   v.xyz *= _Color.xyz * 0.01;
   gl_FragColor = vec4(v,1.0);
}