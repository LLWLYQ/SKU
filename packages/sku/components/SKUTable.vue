<template>
  <div class="ease-sku-table" style="width:1000px;margin-left:180px;height:300px;position: relative;">
    <button class="TBbtn" @click="TBbtn()" v-show="lists == '' ? false:true ">批量填充</button>
    <span class="sp1" v-show="lists == '' ? false:true ">价格：</span><input type="text" style="width:100px;height:15px;"  class="inp1" v-model="Price" v-show="lists == '' ? false:true ">
    <span class="sp2" v-show="lists == '' ? false:true ">库存：</span><input type="text" style="width:100px;height:15px;"  class="inp2" v-model="Stock" v-show="lists == '' ? false:true ">
    <span class="sp3" v-show="lists == '' ? false:true ">成本价：</span><input type="text" style="width:100px;height:15px;"  class="inp3" v-model="Marked_Price" v-show="lists == '' ? false:true ">
    <el-table
      border
      size="mini"
      :data="lists"
      v-if="lists.length"
      >
      <template v-for="(label, index) in columns">
        <!-- 为什么要判断label: 动态添加规格名的时候规格名不为undefiend时未动态显示, 没有看table-column实现暂时这么解决  -->
        <el-table-column
          v-if="label"
          :label="label"
          :key="index">
          <template slot-scope="scope">
            {{scope.row.skus[index] && scope.row.skus[index].v}}
          </template>
        </el-table-column>
      </template>

      <el-table-column
        prop="price"
        label="价格"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0"  v-model="scope.row.price" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存"
        width="160">
        <template slot-scope="scope">
          <div><span><dl>
            <dt></dt>
          </dl></span></div>
          <el-input :precision="2" :min="0" v-model="scope.row.stock" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="marked_price"
        label="成本价"
        width="160">
        <template slot-scope="scope">
          <el-input :precision="2" :min="0"  v-model="scope.row.marked_price" size="mini"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn, InputNumber } from 'element-ui'
import { flatten } from '../utils'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(InputNumber)

export default {
  name: 'sku-table',

  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 需要附加的字段
    flatten: {
      type: Array,
      default () {
        return []
      }
    },
    // 自定义sku的id key
    optionValue: {
      type: String,
      default: 'id'
    },
    // 自定义sku的text key
    optionText: {
      type: String,
      default: 'text'
    }
  },

  data () {
    return {
      rowspan: [],
      lists: [],
      price: '',
      stock: '',
      marked_price: '',
      Price: '',
      Stock: '',
      Marked_Price: '',
      diu: []
    }
  },
  computed: {
    filter () {
      return this.data.filter(item => item.text && item.leaf.length)
    },
    columns () {
      return this.filter.map(item => item[this.optionText])
    }
  },
  watch: {
    filter: {
      deep: true,
      immediate: true,
      handler () {
        this.lists = flatten(this.filter, this.flatten)
        this.computeRowspan()
      }
    },

    lists: {
      deep: true,
      immediate: true,
      handler (data) {
        this.$emit('on-change-data', data)
      }
    }
  },
  methods: {
    TBbtn () {
      this.lists.map(item => {
        this.diu = item
        // item.map(item => {
        //   console.log(item)
        // })
        this.diu.price = this.Price
        this.diu.stock = this.Stock
        this.diu.marked_price = this.Marked_Price
      })
      // for (var item = 0; item < this.diu.length; item++) {
      //   var Hey = item
      // }
      // console.log(Hey)
    },
    computeRowspan () {
      this.rowspan = []
      const rowspan = (index) => {
        let span = []
        let dot = 0

        this.lists.map((item, idx) => {
          if (idx === 0) {
            span.push(1)
          } else {
            if (item.skus[index].v === this.lists[idx - 1].skus[index].v) {
              span[dot] += 1
              span.push(0)
            } else {
              dot = idx
              span.push(1)
            }
          }
        })

        this.rowspan.push(span)
      }
      this.filter.map((item, index) => {
        rowspan(index)
      })
    },

    handleSpanMethod ({ row, column, rowIndex, columnIndex }) {
      for (let i = 0; i < this.filter.length; i++) {
        if (columnIndex === i) {
          if (this.rowspan[i] && this.rowspan[i][rowIndex]) {
            return {
              rowspan: this.rowspan[i][rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  },
  created () {
    // this.TBbtn()
  }
}
</script>
<style lang="scss" scope>
  .TBbtn{
    height: 30px;
    width: 100px;
    color:#fff;
    background-color:#0085d7;
    border:none;
    border-radius: 5%;
    float: right;
    margin-bottom: 10px;
    margin-right: 20px;
    cursor: pointer;
  }
  .inp1{
    position: absolute;
    left: 400px;
    top:5px;
    z-index: 1111111;
  }
  .sp1{
    position: absolute;
    left: 350px;
    top:5px;
    z-index: 1111111;
    font-size: 14px;
  }
  .inp2{
    position: absolute;
    left: 560px;
    top:5px;
    z-index: 1111111;
  }
   .sp2{
    position: absolute;
    left: 510px;
    top:5px;
    z-index: 1111111;
    font-size: 14px;
  }
  .inp3{
    position: absolute;
    left: 740px;
    top:5px;
    z-index: 1111111;
  }
  .sp3{
    position: absolute;
    left: 680px;
    top:5px;
    z-index: 1111111;
    font-size: 14px;
  }
  .TBbtn:hover{
      background-color:blue;
    }
  .el-table__row{
    height: 60px;
  }
  .el-input{
    height: 32px;
    // .el-input_inner{
    //   height: 100px;
    // }
  }
</style>
<style >
  .el-table {
    overflow: auto;
    overflow-y: scroll;
    height: 285px;
  }
</style>
