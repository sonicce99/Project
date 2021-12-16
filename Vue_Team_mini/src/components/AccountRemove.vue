<template>
  <slot name="activator"></slot>
  <teleport to="body">
    <template v-if="modelValue">
    <div class="modal" @click="offModal"> 
      <div class="modal-box" @click.stop>
        <slot name="default"></slot>
      </div>
    </div>
    </template> 
  </teleport>
</template>

<script>

export default {
  props: {
    modelValue: { //모달창의 on/off 상태
      type: Boolean,
      default: false
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  methods: {
    offModal() {
      if(this.persistent) return
      this.$emit('update:modelValue', false)
    }
  }  
}
</script>

<style lang="scss" scoped>
 .modal{
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background-color: rgba(#000, .3);
   display: flex;
   justify-content: center;
   align-items: center;
   .modal-box {
    width: 400px;
    padding: 20px;
    background-color: #eee;
    box-shadow: 3px 3px 3px 3px #999;

   }
 }
</style>