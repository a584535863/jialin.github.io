<template>
  <div>
    <ul v-for="(item, id) in projects" :key="id">
      <li>
        <a :href="item.to">{{ item.title }}</a>
      </li>
    </ul>
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
          preview: root + "projects/preview.jpg",
          to: root + "projects/galaxy",
        },
      ],
    };
  },
});
</script>

