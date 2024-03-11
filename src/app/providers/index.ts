import compose from 'compose-function'
import {reduxProvider} from './reduxProvider.tsx'
import {tanstackQueryProvider} from './tanstackQueryProvider.tsx'
import {vkuiProvider} from './vkuiProvider.tsx'
export const withProviders = compose(reduxProvider, tanstackQueryProvider, vkuiProvider)