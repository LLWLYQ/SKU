<template>
  <div>
    <div class="Cascader ">
    <div class="main">
        <div class="search_input" ref="diu1">
          <i class="fa fa-search" id="i-advanced-search-i"></i>
          <input type="text" id="searchBox" placeholder="名称搜索" style="width: 220px;" />
          <ul class="Fc" @click="oneinpt()">
            <li v-for="FL in firstList" :key="FL.id" @click="LiId(FL)">{{FL.cate_name}}</li>
          </ul>
        </div>
        <div class="search_input1" ref="diu2" v-if="diu1">
          <i class="fa fa-search" id="i-advanced-search-i"></i>
          <input type="text" id="searchBox1" placeholder="名称搜索" style="width: 220px;"/>
          <ul class="Fc1">
            <li v-for="TL in twoList" :key="TL.id" @click="TiId(TL)">{{TL.cate_name}}</li>
          </ul>
        </div>
        <div class="search_input2"  ref="diu3" v-if="diu2">
          <i class="fa fa-search" id="i-advanced-search-i"></i>
          <input type="text" id="searchBox1" placeholder="名称搜索" style="width: 220px;"/>
          <ul class="Fc1">
            <li v-for="TrL in threeList" :key="TrL.id" @click="TriId(TrL)">{{TrL.cate_name}}</li>
          </ul>
        </div>
        <div class="search_input3" ref="diu4"  v-if="diu3">
          <i class="fa fa-search" id="i-advanced-search-i"></i>
          <input type="text" id="searchBox1" placeholder="名称搜索" style="width: 220px;"/>
          <ul class="Fc1">
            <li v-for="FoL in fourList" :key="FoL.id" @click="FiId(FoL)">{{FoL.cate_name}}</li>
          </ul>
        </div>
    </div>
    <div class="DB">
        已选类目:{{DB}}{{DB1}}{{DB2}}{{DB3}}
    </div>
  </div>
  <button @click="NextBtn()" class="nextBtn"><router-link to="HomeSelect"  >已选择商品,下一步</router-link></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      baseUrl: 'http://test1.yishangw.com/api/pc/',
      firstList: '',
      twoList: '',
      threeList: '',
      fourList: '',
      OneLiId: '',
      TwoLiId: '',
      TreeLiId: '',
      FourLiId: '',
      diu1: false,
      diu2: false,
      diu3: false,
      DB: '',
      DB1: '',
      DB2: '',
      DB3: '',
      LISTID: '',
      LISTID1: '',
      LISTID2: '',
      LISTID3: '',
      compilations: ''
    }
  },
  methods: {
    oneinpt () {
      this.$ajax({
        url: this.baseUrl + 'goods_category/show',
        method: 'get'
      }).then((res) => {
        this.firstList = res.data.data
      })
      this.diu3 = false
      this.diu2 = false
    },
    LiId (FL) {
      // console.log(FL.cate_name)
      this.OneLiId = FL.id
      this.$ajax({
        url: this.baseUrl + 'goods_category/' + this.OneLiId,
        method: 'get'
      }).then((res) => {
        // console.log(res.data.data)
        this.twoList = res.data.data
      })
      this.diu1 = true
      this.diu3 = false
      this.DB = FL.cate_name + '>'
      this.LISTID = FL.id
      this.DB1 = ''
      this.DB2 = ''
      this.DB3 = ''
      this.TwoLiId = ''
      this.TreeLiId = ''
      this.FourLiId = ''
    },
    TiId (TL) {
      // console.log(val)
      this.TwoLiId = TL.id
      this.$ajax({
        url: this.baseUrl + 'goods_category/' + this.TwoLiId,
        method: 'get'
      }).then((res) => {
        // console.log(res.data.data)
        this.threeList = res.data.data
      })
      this.diu2 = true
      this.diu3 = false
      this.DB1 = TL.cate_name + '>'
      this.LISTID1 = TL.id
      this.DB2 = ''
      this.DB3 = ''
      this.TreeLiId = ''
      this.FourLiId = ''
    },
    TriId (TrL) {
      this.TreeLiId = TrL.id
      this.$ajax({
        url: this.baseUrl + 'goods_category/' + this.TreeLiId,
        method: 'get'
      }).then((res) => {
        // console.log(res.data.data)
        this.fourList = res.data.data
      })
      this.diu3 = true
      this.LISTID2 = TrL.cate_name + '>'
      this.Three = TrL.id
      this.DB3 = ''
      this.FourLiId = ''
    },
    FiId (FoL) {
      this.DB3 = FoL.cate_name
      this.FourLiId = FoL.id
    },
    NextBtn () {
      this.compilations = this.OneLiId + ',' + this.TwoLiId + ',' + this.TreeLiId + ',' + this.FourLiId
      console.log(this.compilations)
      sessionStorage.setItem('compilations', this.compilations)
    }
  },
  created () {
    this.oneinpt()
  }
}
</script>

<style scope lang="scss">
 ul{
      list-style:none;
      padding: 0;
    }
    .top{
      height: 50px;
      width: 100px;
      border-bottom:2px solid #409Eff;
      text-align: center;
    }
    .top span {
      line-height: 50px;
      font-size: 15px;
    }
    .search_input input[type='text']{
      display: inline-block;
      width: 180px;
      height: 30px;
      text-indent: 30px;
      font-size: 12px;
      border-radius: 5%;
      border:1px solid;
  }
  .search_input {
      margin-top: 10px;
      float: left;
  }
  .search_input i{
      position: relative;
      left: 30px;
      top: 1px;
  }
  .Fc{
    height: 200px;
    width: 220px;
    margin-left: 20px;
    border:1px solid #ccc;
    overflow-x: hidden;
    overflow: hidden;
  }
  .Fc li{
    height: 25px;
    width: 100%;
    font-size: 12px;
    cursor:pointer;
    line-height: 25px;
    text-indent:5px;
    overflow: hidden;
  }
  .Fc li:hover{
    background-color: #F2F2F2;
  }

    .search_input input[type='text']{
      display: inline-block;
      width: 180px;
      height: 30px;
      text-indent: 30px;
      font-size: 12px;
      border-radius: 5%;
      border:1px solid;
  }
  .search_input {
      margin-top: 10px;
      float: left;
  }
  .search_input i{
      position: relative;
      left: 30px;
      top: 1px;
  }
  .Fc{
    height: 200px;
    width: 220px;
    margin-left: 20px;
    border:1px solid #ccc;
    overflow-x: hidden;
  }
  .Fc li{
    height: 25px;
    width: 100%;
    font-size: 12px;
    cursor:pointer;
    padding-left: 5px;
    line-height: 25px;
    text-indent:5px;

  }

 .search_input1 input[type='text']{
    display: inline-block;
    width: 180px;
    height: 30px;
    text-indent: 30px;
    font-size: 12px;
    border-radius: 5%;
    border:1px solid;
}
.search_input1 {
    margin-top: 10px;
    float: left;
}
.search_input1 i{
    position: relative;
    left: 30px;
    top: 1px;
}
.Fc1{
  height: 200px;
  width: 220px;
  margin-left: 20px;
  border:1px solid #ccc;
  overflow-x: hidden;
}
.Fc1 li{
  height: 25px;
  width: 100%;
  font-size: 12px;
  padding-left: 5px;
  cursor:pointer;
  line-height: 25px;
  text-indent:5px;
}
.Fc1 li:hover{
  background-color: #F2F2F2;
}
.DB{
  height: 35px;
  width: 1200px;
  background-color: #E3E3E3;
  padding-top: 10px;
  padding-left: 10px;
  margin-bottom:-20px;
  position: relative;
  top:30px;
  left: 25px;
  font-size: 14px;
  overflow: hidden;
}
/*/////////*/
.search_input2 input[type='text']{
  display: inline-block;
  width: 180px;
  height: 30px;
  text-indent: 30px;
  font-size: 12px;
  border-radius: 5%;
  border:1px solid;
}
.search_input2 {
  margin-top: 10px;
  float: left;
}
.search_input2 i{
  position: relative;
  left: 30px;
  top: 1px;
}
.Fc2{
height: 200px;
width: 220px;
margin-left: 20px;
border:1px solid #ccc;
overflow-x: hidden;
}
.Fc2 li{
height: 25px;
width: 100%;
font-size: 12px;
padding-left: 5px;
cursor:pointer;
line-height: 25px;
text-indent:5px;
}
.Fc2 li:hover{
background-color: #F2F2F2;
}
/*////////*/
.search_input3 input[type='text']{
  display: inline-block;
  width: 180px;
  height: 30px;
  text-indent: 30px;
  font-size: 12px;
  border-radius: 5%;
  border:1px solid;
}
.search_input3 {
  margin-top: 10px;
  float: left;
}
.search_input3 i{
  position: relative;
  left: 30px;
  top: 1px;
}
.Fc3{
height: 200px;
width: 220px;
margin-left: 20px;
border:1px solid #ccc;
overflow-x: hidden;
}
.Fc3 li{
height: 25px;
width: 100%;
font-size: 12px;
cursor:pointer;
line-height: 25px;
padding-left: 5px;
text-indent:5px;
}
.Fc3 li:hover{
background-color: #F2F2F2;
}
.current{
  background:#F2F2F2;
  border-left:2px solid blue;
}
.nextBtn{
  border:none;
  position:absolute;
  text-decoration: none;
  top:410px;
  left:800px;
  font-size: 16px;
  padding:15px;
  border-radius: 5%;
  cursor: pointer;
  background-color: #6495ED;
  color:#fff;
}
.nextBtn a{
  color:#fff;
  text-decoration: none;
}
.nextBtn:hover{
  background-color: #436EEE;
}
</style>
