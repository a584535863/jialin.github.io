<template>
  <div class="info">
    <h2>{{ info.name }}</h2>
    <p class="skill">Skills:</p>
    <p class="skill-info">{{ info.skills.join(", ") }}</p>
    <p class="link">Github:</p>
    <a class="link-info" :href="info.github" target="_blank">
      {{ info.github }}
    </a>
    <p class="email">Email:</p>
    <a class="email-info" :href="'mailto:' + info.email">{{ info.email }}</a>
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
        skills: ["cocos", "unity", "typescipt", "c#", "javascript"],
      },
    };
  },
});
</script>

<style lang="scss" >
.info {
  display: flex;
  flex-direction: column;
}

.info > h2 {
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  width: 100%;
  margin: 0 0;
  padding: 0.8em 0 0.2em 0;
  border-bottom: 2px dashed var(--dark-color);
}

.info > .skill,
.info > .link,
.info > .email {
  padding: 1em 0 0 0;
  margin: 0;
  font-size: 1.2rem;
}

.info > .skill-info,
.info > .link-info,
.info > .email-info {
  color: var(--dark-color);
  margin: 0;
  padding: 0.3em 0 0 2em;
  font-size: 1rem;
}
</style>