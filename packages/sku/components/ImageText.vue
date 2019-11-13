<template>
  <div>
      <el-upload
        action="http://test1.yishangm.com/api/file_upload?type=images"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-change="diu"
        :limit="1"
        name="upload_name"
        ref="ID"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { Dialog } from 'element-ui'

Vue.use(Dialog)
export default {
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.hideUpload = fileList.length >= this.limitCount
      const d = this.$refs.ID
      d.$children[1].$el.style.display = ''
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    diu (file, fileList) {
      const d = this.$refs.ID
      d.$children[1].$el.style.display = 'none'
    }
  }
}
</script>

<style>
  .hide .el-upload--picture-card {
    display: none;
}
</style>
