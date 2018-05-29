import Enzyme from 'enzyme'
import { Adapter } from 'enzyme-adapter-preact'

Enzyme.configure({
    adapter: new Adapter()
})
