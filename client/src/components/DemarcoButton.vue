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
@import '@/assets/scss/components/_button.scss';
</style>