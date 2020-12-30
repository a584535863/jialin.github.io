<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <canvas id="bg"></canvas>
    <header class="mb-auto">
      <div>
        <h3 class="float-md-start mb-0">--. .- .-. .-.. .. -.</h3>
        <nav class="nav nav-masthead justify-content-center float-md-end">
          <router-link
            v-for="(item, id) in navlists"
            :key="id"
            class="nav-link"
            active-class="active"
            exact-active-class=""
            :to="item.path"
          >
            {{ item.title }}
          </router-link>
        </nav>
      </div>
    </header>
    <main class="px-3">
      <router-view></router-view>
    </main>
    <footer class="mt-auto text-white-50">
      <p>@2020 Garlin</p>
    </footer>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { Maf } from "../scripts/common/math";
class BgRenderer {
  public canvas: HTMLCanvasElement;

  public loopDuration: number = 2;

  private _ctx: CanvasRenderingContext2D;
  private _startTime: number = 0;
  private _timeId: number = -1;
  private _drawBinder = null;
  private _resizeBinder = null;

  private _circles: Array<{
    a: number;
    b: number;
    theta: number;
    offset: number;
    thickness: number;
  }> = [];
  private _radius: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this._init();
  }

  private _init(): void {
    this._ctx = this.canvas.getContext("2d");
    this._drawBinder = this._draw.bind(this);
    this._resizeBinder = this._resize.bind(this);

    const cirlces = this._circles;
    for (let i = 0; i < 20; i++) {
      const a = Maf.randomInRange(0.1, 0.9);
      const b = Maf.randomInRange(0.1, 0.9);
      const theta = Maf.randomInRange(0, Maf.TAU);
      const offset = Maf.randomInRange(0, 1);
      const thickness = Maf.randomInRange(2, 6);
      cirlces.push({ a, b, theta, offset, thickness });
    }

    this._resize();
    this._startTime = performance.now();
    this._timeId = requestAnimationFrame(this._drawBinder);
    window.addEventListener("resize", this._resizeBinder);
  }

  private _pointInEllipse(
    a: number,
    b: number,
    theta: number,
    t: number
  ): { x: number; y: number } {
    const x =
      a * Math.cos(t * Maf.TAU) * Math.cos(theta) -
      b * Math.sin(t * Maf.TAU) * Math.sin(theta);
    const y =
      a * Math.cos(t * Maf.TAU) * Math.sin(theta) +
      b * Math.sin(t * Maf.TAU) * Math.cos(theta);
    return { x, y };
  }

  private _drawEllipse(
    x: number,
    y: number,
    a: number,
    b: number,
    theta: number,
    s: number,
    e: number
  ) {
    const ctx = this._ctx;
    const ax = 4;
    ctx.save();

    ctx.translate(-x, -y);

    const path = new Path2D();
    const p0 = this._pointInEllipse(a, b, theta, s);
    path.moveTo(p0.x, p0.y);

    for (let tt = s; tt < s + e; tt += 0.01) {
      const p = this._pointInEllipse(a, b, theta, tt);
      path.lineTo(p.x, p.y);
    }

    ctx.translate(-ax, 0);
    ctx.strokeStyle = "#ff0000";
    ctx.stroke(path);
    ctx.translate(ax, 0);
    ctx.strokeStyle = "#00ff00";
    ctx.stroke(path);
    ctx.translate(ax, 0);
    ctx.strokeStyle = "#0000ff";
    ctx.stroke(path);

    ctx.restore();
  }

  private _draw() {
    const ctx = this._ctx;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const time =
      (0.001 * (performance.now() - this._startTime)) % this.loopDuration;
    const t = time / this.loopDuration;

    ctx.save();
    ctx.translate(0.5 * this.canvas.width, 0.5 * this.canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = "lighten";

    ctx.setLineDash([8, 4]);
    ctx.lineDashOffset = 4;

    ctx.lineWidth = 10;

    this._circles.forEach((c) => {
      const tt = (t + c.offset) % 1;
      ctx.lineWidth = c.thickness * (1 + Maf.parabola(tt, 4));
      this._drawEllipse(
        0,
        0,
        c.a * this._radius,
        c.a * this._radius,
        c.theta - tt * Maf.TAU,
        0,
        0.5 + 0.5 * Math.sin(tt * Maf.TAU)
      );
    });

    ctx.restore();

    this._timeId = requestAnimationFrame(this._drawBinder);
  }

  private _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._radius = 0.45 * this.canvas.width;
  }

  public destroy() {
    cancelAnimationFrame(this._timeId);
    this._ctx = null;
    this.canvas = null;
    window.removeEventListener("resize", this._resizeBinder);
  }
}

let bgRenderer: BgRenderer;

export default vue.extend({
  data: function () {
    return {
      navlists: [
        {
          path: "/home",
          title: "主页",
        },
        {
          path: "/list",
          title: "项目",
        },
        {
          path: "/about",
          title: "关于",
        },
      ],
      bgRenderer: null,
    };
  },
  mounted() {
    const canvas = document.getElementById("bg") as HTMLCanvasElement;
    bgRenderer = new BgRenderer(canvas);
    console.log("aa");
  },
  beforeDestroy() {
    bgRenderer.destroy();
    bgRenderer = null;
  },
});
</script>

<style lang="scss">
#bg {
  display: block;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  margin: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
