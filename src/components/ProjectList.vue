<template>
  <div class="project-view">
    <a :href="item.to" target="_blank" v-for="(item, id) in projects" :key="id">
      <img :src="item.preview" :alt="item.title" />
      <span>
        <h4>title: {{ item.title }}</h4>
        <p>Tag: {{ item.tags.join(" , ") }}</p>
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
$border: 2px solid var(--dark-color);

.project-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.project-view > a {
  width: 100%;
  padding: 1em;
  margin-top: 1em;
  border: $border;
  color: var(--dark-color);
}

.project-view > a:hover {
  text-decoration: none;
}

.project-view > a > img {
  width: 100%;
}

.project-view > a > span {
  color: var(--dark-color);
}

.project-view > a > span > h4 {
  margin: 0;
  font-size: 1rem;
}
.project-view > a > span > p {
  margin: 0;
  padding-top: 0.5em;
  font-size: 0.8rem;
}

@media (min-width: 30em) {
  .project-view {
    justify-content: flex-start;
  }

  .project-view > a {
    width: 48%;
  }

  .project-view > a:nth-child(odd) {
    margin-left: 0;
  }

  .project-view > a:nth-child(even) {
    margin-left: auto;
  }
}

@media (min-width: 60em) {
  .project-view > a {
    width: 32%;
  }

  .project-view > a:nth-child(3n) {
    margin-left: 0;
    margin-right: 0;
  }

  .project-view > a:nth-child(3n-2) {
    margin-left: 0;
    margin-right: 0;
  }

  .project-view > a:nth-child(3n-1) {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
