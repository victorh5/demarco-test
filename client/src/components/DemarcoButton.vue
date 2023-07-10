<template>
  <div>
    <button
      :type="type"
      @click="handleClick"
      :class="{'login-button': this.loginButton}"
    >
      <slot/>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    loginButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('callback')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
}
.login-button {
  width: 100%;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 12px;
}
</style>