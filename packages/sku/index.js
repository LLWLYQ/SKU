import { flatten, isEqual } from './utils'
import Sku from './sku'
import SkuTable from './components/SKUTable'
import PositiveDrive from './components/PositiveDrive'
import ImageText from './components/ImageText'
import ckeditor4 from './components/ckeditor4'

const components = [
  Sku,
  SkuTable,
  PositiveDrive,
  ImageText,
  ckeditor4
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
}
