import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import { md3 } from 'vuetify/blueprints'
// import * as directives from 'vuetify/directives'

// Amplify
//import { Amplify } from 'aws-amplify'
//import COGNITO_CONFIG from '../utils/enums'
//import AmplifyVue from '@aws-amplify/ui-vue'

// Amplify.configure({
//     Auth: {
//       region: "us-east-1",
//       userPoolId: "us-east-1_uDAIkJd2y",
//       userPoolWebClientId: "5ddfkn0v3fsb80keniulioo44i",
//     }
// })

export default defineNuxtPlugin(nuxtApp => {

    const vuetify = createVuetify({
        ssr: true,
        blueprint: md3,
        icons: {
            defaultSet: 'md',
            aliases,
            sets: {
                md
            }
        },
        components,
        // directives
    })

    nuxtApp.vueApp.use(vuetify)
    //nuxtApp.vueApp.use(AmplifyVue)
})
