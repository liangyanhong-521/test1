<template>
  <div>
    <TinymceEditor
      ref="editor"
      :disabled="disabled"
      :value="postForm.content"
      @onClick="onClick"
    />
    <button @click="clear">清空内容</button>
    <button @click="disabled = true">禁用</button>
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce/' // 富文本编辑器
export default {
  name: 'Index2',
  components: {
    TinymceEditor
  }, // 注册子组件
  data() {
    return {
      postForm: {
        content: ''
      },
      disabled: false
    }
  },
  methods: {
    // start-富文本编辑器
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
      console.log(e)
      console.log(editor)
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    }
  }
}
</script>

<style scoped>

</style>
