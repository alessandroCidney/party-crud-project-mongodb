<template>
  <p
    v-if="msg"
    class="msg"
    :class="msgClass"
  >
    {{ msg }}
  </p>
</template>

<script lang="ts">
export default {
  name: "Message",

  props: ['msg', 'msgClass']
}
</script>

<style scoped>
.msg {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
</style>
