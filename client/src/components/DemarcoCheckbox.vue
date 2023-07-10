<template>
  <div class="demarco-checkbox">
    <div class="checkbox-label">
      <label>{{ this.label }}</label>
    </div>
    <input
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    "value": { type: String },
    "modelValue": { default: "" },
    "label": { type: String, required: true},
    "trueValue": { default: true },
    "falseValue": { default: false }
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value)
      }
      return this.modelValue === this.trueValue
    }
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue]
        if (isChecked) {
          newValue.push(this.value)
        } else {
          newValue.splice(newValue.indexOf(this.value), 1)
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked ? this.trueValue : this.falseValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.demarco-checkbox {
  .checkbox-label {
    margin-bottom: 8px;
  }
  input {
    width: 20px;
    height: 20px;
  }
}
</style>