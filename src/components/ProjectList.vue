<template>
  <div></div>
</template>

<script lang="ts">
import vue from "vue";
import { root } from "../scripts/common/config";
export default vue.extend({
  data: {
    projects: [
      {
        title: "galaxy",
        description: "",
        tags: ["playcanvas", "webgl"],
        preview: root + "projects/preview.jpg",
        to: root + "projects/galaxy",
      },
    ],
  },
});
</script>

