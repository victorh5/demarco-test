<template>
  <div class="demarco-input">
    <label :for="id">{{ this.label }}</label>
    <input
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', type === 'number' ? Number($event.target.value) : $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_input.scss';
</style>