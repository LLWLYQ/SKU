<template>
  <div id="app">
    <div class="container">
      <h3 style="padding:0 0 15px 20px;border-bottom:1px solid #e5e5e5e5;">基础信息</h3>
      <span style="font-weight: bold;font-size: 14px;float:left;padding-top:8px;margin-left:110px;">宝贝标题</span><el-input v-model="input" placeholder="请输入内容" style="width:71%;margin-left:15px;"></el-input>
      <!-- 分享描述：<el-input v-model="input" placeholder="请输入内容"></el-input> -->
      <positive-drive @category="categoryEmit()" :todos="todos">
        <template slot-scope="slotProps" >
          <div class="Input">
            <span class="pujiezai">{{slotProps.todo.name}}:</span>
            <el-input v-model="slotProps.todo.value" placeholder="请输入内容"  v-if="slotProps.todo.data_type === 'input'" style="width:218px;"></el-input>
          </div>
          <div class="Select">
            <el-select v-model="slotProps.todo.value" filterable placeholder="请选择" v-if="slotProps.todo.data_type === 'select'" >
              <el-option
                v-for="item in slotProps.todo.attr_value"
                :key="item.value"
                :label="item.value"
                :value="item.value_id">
              </el-option>
            </el-select>
          </div>
          <div class="Radio" v-if="slotProps.todo.data_type === 'radio'">
             <el-radio v-model="slotProps.todo.value"  v-for="item in slotProps.todo.attr_value" :key="item.value" :label="item.value"></el-radio>
          </div>
          <div class="checkbox" v-if="slotProps.todo.data_type === 'checkbox'">
            <el-checkbox v-model="checkboxValue"  v-for="item in slotProps.todo.attr_value" :key="item.value" :label="item.value"></el-checkbox>
          </div>
          <div class="datetime" >
             <div class="block" >
              <el-date-picker
                v-if="slotProps.todo.data_type === 'datetime'"
                v-model="slotProps.todo.value"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
          <div class="multipleselect" v-if="slotProps.todo.data_type === 'multipleselect'">
            <el-select v-model="slotProps.todo.value" multiple placeholder="请选择">
              <el-option
                v-for="item in slotProps.todo.attr_value"
                :key="item.value"
                :label="item.valu_id"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </template>
      </positive-drive>
      <h3 style="padding:20px 0 15px 20px;border-bottom:1px solid #e5e5e5e5;border-top:1px solid #e5e5e5e5;">销售信息</h3>
      <vue-sku
        v-model="value"
        action="http://localhost:8081/index.php"
        :sku-tree="skuTree"
        :on-fetch-group="fetchSkuTree"
        :on-fetch-sku="fetchSku"
        :on-create-group="createGroup"
        :on-create-sku="createSku"
        @on-change="change"/>
      <br>
      <sku-table :data="value" :flatten="flatten" @on-change-data="handleChangeData" />
      <br>
      <!-- <small>规格组合
        <pre>{{value}}</pre>
      </small>
      <small>表格组合
        <pre>{{data}}</pre>
      </small> -->
      <div>
        <h3 style="padding:20px 0 15px 20px;border-bottom:1px solid #e5e5e5e5;border-top:1px solid #e5e5e5e5;">图文信息</h3>
        <span style="font-weight:bold;font-size:14px;float:left;margin:0 10px 0 100px;">电脑端宝贝图片</span><p style="font-size:14px;">宝贝主图大小不能超过3MB；700*700 以上图片上传后宝贝详情页自动提供放大镜功能。第五张图发商品白底图可增加手淘首页曝光机会</p>
        <div class="itImg">
          <ul v-for="ia in imgArr" :key="ia.id" style="float:left;margin:0;">
            <image-text class="it"></image-text>
          </ul>
        </div>
        <div style="width:1002px;margin:0 auto;">
          <ckeditor-ck style="margin-top:200px;font-size:20px;"></ckeditor-ck>
        </div>
      </div>
      <div style="height:170px;">
        <h3 style="padding:20px 0 15px 20px;border-bottom:1px solid #e5e5e5e5;border-top:1px solid #e5e5e5e5;margin:0;">支付信息</h3>
        <div style="margin:30px 0 0 20px;">
          <span style="margin:0px 20px; 0 0px;">付款方式</span>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>
        <div style="margin:20px 0 0 20px;">
          <span style="margin:0px 20px; 0 0px;">库存计数</span>
          <el-radio v-model="radio1" label="1">备选项</el-radio>
          <el-radio v-model="radio1" label="2">备选项</el-radio>
        </div>
      </div>
      <div style="height:170px;">
        <h3 style="padding:20px 0 15px 20px;border-bottom:1px solid #e5e5e5e5;border-top:1px solid #e5e5e5e5;">物流信息</h3>
        <div style="margin:20px 0 0 20px;">
          <span style="margin:0px 20px; 0 0px;">提取方式</span>
          <el-checkbox v-model="checked">备选项</el-checkbox>
        </div>
      </div>
      <div style="height:270px;">
        <h3 style="padding:20px 0 15px 20px;border-bottom:1px solid #e5e5e5e5;border-top:1px solid #e5e5e5e5;">售后服务</h3>
        <div style="margin:20px 0 0 20px;">
          <span style="margin:0px 20px; 0 0px;">售后服务</span>
          <el-checkbox v-model="checked1">备选项</el-checkbox>
          <p style="margin:10px 104px; 0 0px;"><el-checkbox v-model="checked2">备选项</el-checkbox></p>
          <p style="margin:10px 104px; 0 0px;"><el-checkbox v-model="checked3">备选项</el-checkbox></p>
          <p style="margin:10px 104px; 0 0px;"><el-checkbox v-model="checked4">备选项</el-checkbox></p>
        </div>
        <div style="margin:20px 0 0 20px;">
          <span style="margin:0px 20px; 0 0px;">上架时间</span>
          <p style="margin:10px 104px; 0 0px;">
            <el-radio v-model="radio2" label="1">备选项</el-radio>
            <el-radio v-model="radio2" label="2">备选项</el-radio>
            <el-radio v-model="radio2" label="3">备选项</el-radio>
          </p>
        </div>
        <button @click="btncs()">点我</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Sku, SkuTable, PositiveDrive, ImageText, ckeditor4 } from '../packages/sku'
import { Input, Radio, Checkbox, DatePicker, CheckboxGroup } from 'element-ui'
// import {  } from '../packages/sku/components/PositiveDrive'

Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(CheckboxGroup)

const skuTree = [
  {
    id: 10740,
    text: '颜色'
  },
  {
    id: 40732,
    text: '尺寸'
  }
]

const sku = [
  {
    id: 3,
    text: '蓝色'
  },
  {
    id: 10,
    text: '红色'
  },
  {
    id: 30,
    text: '土豪金'
  },
  {
    id: 137,
    text: '黑色'
  },
  {
    id: 138,
    text: '灰色'
  },
  {
    id: 121,
    text: 'xxl'
  },
  {
    id: 94,
    text: 'xxxl'
  }
]
export default {
  components: {
    'vue-sku': Sku,
    'sku-table': SkuTable,
    'positive-drive': PositiveDrive,
    'image-text': ImageText,
    'ckeditor-ck': ckeditor4
  },
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      checkboxValue: true,
      options: '',
      attr_value: '',
      todos: '',
      input: '',
      imgArr: [1, 2, 3, 4, 5],
      radio: '1',
      radio1: '1',
      radio2: '1',
      checked: true,
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      value: [
        {
          'id': 10740,
          'text': '颜色',
          'leaf': [
            {
              'id': 3,
              'text': '蓝色',
              'is_show': false
            },
            {
              'id': 10,
              'text': '红色',
              'is_show': false
            }
          ]
        },
        {
          'id': 40732,
          'text': '尺寸',
          'leaf': [
            {
              'id': 121,
              'text': 'xxl',
              'is_show': false
            },
            {
              'id': 94,
              'text': 'xxxl',
              'is_show': false
            }
          ]
        }
      ],
      skuTree,
      data: [],
      flatten: [
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 3,
              'v': '蓝色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 121,
              'v': 'xxl'
            }
          ],
          'price': '',
          'stock': '',
          'marked_price': ''
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 3,
              'v': '蓝色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 94,
              'v': 'xxxl'
            }
          ],
          'price': '',
          'stock': '',
          'marked_price': ''
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 10,
              'v': '红色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 121,
              'v': 'xxl'
            }
          ]
        },
        {
          'skus': [
            {
              'k_id': 10740,
              'k': '颜色',
              'v_id': 10,
              'v': '红色'
            },
            {
              'k_id': 40732,
              'k': '尺寸',
              'v_id': 94,
              'v': 'xxxl'
            }
          ]
        }
      ],
      value4: ''
    }
  },
  created () {
    this.categoryEmit()
    this.btncs()
  },
  methods: {
    categoryEmit (param) {
      this.value4 = param
      console.log(param)
    },
    btncs () {
      // let postData = this.$qs.stringify([this.radio, this.radio1, this.radio2, this.checked, this.checked1, this.checked2, this.checked3, this.checked4, this.value4])
      // console.log(postData)
      this.$ajax({
        url: 'http://test1.yishangm.com/api/pc/goods_attr/list/174',
        method: 'get'
        // data: this.radio
        // data: this.val
      }).then((res) => {
        this.todos = res.data.data
        console.log(this.todos)
        res.data.data.map(item => {
          item.attr_value.map(item => {
            // console.log(item.value_id)
          })
        })
      })
    },

    fetchSkuTree () {
      return new Promise(resolve => {
        resolve(skuTree)
      })
    },

    fetchSku (id) {
      return new Promise(resolve => {
        resolve(sku)
      })
    },

    createGroup (text) {
      return new Promise((resolve, reject) => {
        if (text) {
          resolve(parseInt(Math.random() * 100, 10) + 1)
        } else {
          reject(new Error())
        }
      })
    },

    createSku (data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        resolve(data.data.map(item => {
          return {
            id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
            text: item
          }
        }))
      })
    },

    change (data) {
    },

    handleChangeData (data) {
      this.data = data
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
}
.itImg{
  margin:0 0 0 165px;
}
#app {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  .container {
    width: 1400px;
    border:1px solid #e5e5e5;
  }
}
</style>
