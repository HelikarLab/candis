import Enzyme from 'enzyme'
import { Adapter } from 'enzyme-adapter-preact'
import nprogress from 'nprogress'

Enzyme.configure({
    adapter: new Adapter()
})

global.nprogress = nprogress
