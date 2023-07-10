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
.demarco-input {
  display: grid;
  gap: 8px;
  input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #000;
  }
}
</style>