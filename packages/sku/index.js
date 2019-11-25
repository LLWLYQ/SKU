import { flatten, isEqual } from './utils'
import Sku from './sku'
import SkuTable from './components/SKUTable'
import PositiveDrive from './components/PositiveDrive'
import ImageText from './components/ImageText'
import ckeditor4 from './components/ckeditor4'
// import HomeSelect from './components/HomeSelect'

// import selectGoods from './components/selectGoods'

const components = [
  Sku,
  SkuTable,
  PositiveDrive,
  ImageText,
  ckeditor4
  // HomeSelect
  // selectGoods
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  flatten,
  isEqual,
  Sku,
  SkuTable,
  PositiveDrive,
  ImageText,
  ckeditor4
  // HomeSelect
  // selectGoods
}
// export default new Router({
//   routes:[
//     path:'/',
//     name : 'HomeSelect',
//     component : HomeSelect
//   ]
// })
