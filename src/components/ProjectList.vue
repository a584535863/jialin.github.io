<template>
  <div class="row mt-3 justify-content-center">
    <a
      :href="item.to"
      target="_blank"
      v-for="(item, id) in projects"
      :key="id"
      class="card text-dark col-sm-3 mx-3 mt-3"
      style="background-color: rgba(255, 255, 255, 0.9)"
    >
      <img class="card-img-top" :src="item.preview" :alt="item.title" />
      <span class="card-body" style="text-align: left">
        <h4 class="card-title">title: {{ item.title }}</h4>
        <p class="card-text mt-2 align-top">Tag: {{ item.tags.join(" , ") }}</p>
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import vue from "vue";
import { root } from "../scripts/common/config";
export default vue.extend({
  data: function () {
    return {
      projects: [
        {
          title: "galaxy",
          description: "",
          tags: ["playcanvas", "webgl"],
          preview: root + "projects/galaxy/preview.jpg",
          to: root + "projects/galaxy",
        },
        {
          title: "galaxy",
          description: "",
          tags: ["playcanvas", "webgl"],
          preview: root + "projects/galaxy/preview.jpg",
          to: root + "projects/galaxy",
        },
        {
          title: "galaxy",
          description: "",
          tags: ["playcanvas", "webgl"],
          preview: root + "projects/galaxy/preview.jpg",
          to: root + "projects/galaxy",
        },
      ],
    };
  },
});
</script>

<style lang="scss" >
</style>
