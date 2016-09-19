// @flow

import type {Store} from '../flowtypes/redux'
import Layout from '../components/Layout.js'

export default (store: Store): Object => {
  return {
    component: Layout,
    childRoutes: [
      require('./home').default(store),
    ],
  }
}
