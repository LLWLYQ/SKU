<template>
<div class="PositiveDrive">
    <p><span>类目属性</span> 错误填写宝贝属性，可能会引起宝贝下架或搜索流量减少，影响您的正常销售，请认真准确填写！</p>
    <div class="top">
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <slot :todo="todo">
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todos: {
      type: (String, NaN)
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // handel () {
    //   this.$ajax({
    //   })
    // }
  }
}
</script>
<style lang="scss" scope>
.PositiveDrive{
  width: 100%;
  height:400px;
  position: relative;
  margin-bottom: 20px;
  margin-left:110px;
    p{
      font-size:14px;
      span{
        font-weight: bold;
        font-size: 14px;
        margin-right: 10px;
        }
      }
  .top{
    width: 1000px;
    height: 360px;
    border:1px solid #e5e5e5;
    margin-top: 10px;
    margin-left:75px;
    ul{
      margin-left: 30px;
      list-style: none;
      padding: 0;
      li{
        height: 50px;
        float: left;
        width: 30%;
        margin:20px 0 0 15%;
        position: relative;
        .pujiezai{
          position: absolute;
          top:8px;
          left: -120px;
        }
      }
      .label{
        float: left;
        padding-top: 8px;
        margin-right: 10px;
      }
    }
    .elcb{
      position: absolute;
      bottom: 20px;
      left: 95px;
      font-size:14px;
    }
  }
}
</style>
<style>
.el-select__tags{
  padding-top: 37px;
}
</style>
