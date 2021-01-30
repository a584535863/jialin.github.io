<template>
  <div class="container">
    <header>
      <h1>--. .- .-. .-.. .. -.</h1>
      <span ref="lightBtn" class="icon light" @click="setStyle(false)"></span>
    </header>
    <nav>
      <ul class="nav-menu">
        <li v-for="(item, id) in navlists" :key="id">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>@Garlin 2021</p>
    </footer>

    <canvas class="bg"></canvas>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { BgRenderer } from "../scripts/common/bgRenderer";
import { config } from "../scripts/common/config";
import { Storage } from "../scripts/common/storage";
let bgRenderer: BgRenderer;

export default vue.extend({
  data: function () {
    return {
      navlists: [
        {
          path: "/home",
          title: "Home",
        },
        {
          path: "/list",
          title: "Project",
        },
        {
          path: "/about",
          title: "About",
        },
      ],
    };
  },
  methods: {
    setStyle(init: boolean) {
      if (!init) {
        config.isLight = !config.isLight;
        Storage.set("isLight", config.isLight ? "open" : "close");
      }
      if (config.isLight) {
        (this.$refs.lightBtn as HTMLElement).classList.add("light");
      } else {
        (this.$refs.lightBtn as HTMLElement).classList.remove("light");
      }
      const root = document.documentElement;
      root.style.setProperty(
        "--light-color",
        config.isLight ? config.lightColor : config.darkColor
      );
      root.style.setProperty(
        "--dark-color",
        config.isLight ? config.darkColor : config.lightColor
      );
    },
  },
  mounted() {
    this.setStyle(true);
    bgRenderer = new BgRenderer(document.querySelector(".bg"));
  },
  beforeDestroy() {
    bgRenderer.destroy();
    bgRenderer = null;
  },
});
</script>

<style lang="scss">
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

$border: 2px solid var(--dark-color);
.container {
  max-width: 1080px;
  margin: 0 auto;
  z-index: 0;
}

header {
  display: flex;
  justify-content: space-between;
  margin-top: 0;
}

header > h1 {
  font-size: 2rem;
  margin: 0 0.1em;
  padding: 0.5em;
}

header > .icon {
  font-size: 1rem;
  width: 1.5em;
  height: 1.5em;
  background-size: 1.5em;
  margin-top: 1.4em;
  padding: 0.75em;
  border-radius: 0.5em;
  border: 2px solid var(--dark-color);
}

header > .icon {
  background-image: url("../assets/image/icon/sun.svg");
}

header > .icon.light {
  background-image: url("../assets/image/icon/moon.svg");
}

main {
  min-height: calc(100vh - 7.3em - 4px);
  padding: 0;
  margin: 0;
}

.nav-menu {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.nav-menu > li {
  flex: 1;
  padding: 0.2em;
  border-top: $border;
  border-bottom: $border;
}

.nav-menu > li:first-child {
  border-left: $border;
}

.nav-menu > li:last-child {
  border-right: $border;
}

.nav-menu > li + li {
  border-left: $border;
}

.nav-menu > li > a {
  display: block;
  padding: 0.1em;
  text-align: center;
  color: var(--dark-color);
}

footer {
  position: relative;
  width: 100%;
}

footer > p {
  font-size: 0.5rem;
  padding: 1em 0;
  margin: 0;
  text-align: center;
}
</style>
