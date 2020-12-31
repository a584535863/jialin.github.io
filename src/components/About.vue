<template>
  <div
    class="px-3 mt-3"
    style="color: rgba(255, 255, 255, 0.8); text-align: left"
  >
    <p class="h1 md-3">{{ info.name }}</p>
    <p class="h4">skills: {{ info.skills.join(" , ") }}</p>
    <p class="h4">
      github:<a :href="info.github" target="_blank">
        {{ info.github }}
      </a>
    </p>
    <p class="h4">
      email:
      <a :href="'mailto:' + info.email">{{ info.email }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import vue from "vue";

export default vue.extend({
  data: function () {
    return {
      info: {
        name: "Garlin",
        github: "https://github.com/M9L6",
        email: "garlin92@qq.com",
        skills: ["cocos", "unity", "typescipt", "c#"],
      },
    };
  },
});
</script>

<style lang="scss" scoped>
a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: underline;
}

a:hover {
  color: rgba(255, 255, 255, 1);
}
</style>