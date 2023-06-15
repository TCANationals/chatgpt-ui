<template>
  <v-card
      style="height: 100vh"
  >
    <v-container>
      <!-- <SettingsLanguages/> -->
      <v-row>
        <v-col
            sm="9"
            offset-sm="1"
            md="6"
            offset-md="3"
        >
          <v-card
              class="mt-15"
              elevation="0"
          >
            <v-card-text>

              <div v-if="errorMsg" class="text-red">{{ errorMsg }}</div>

              <div class="text-center">
                <authenticator v-if="false">
                  <template v-slot="{ user, signOut }">
                    <h1>Hello {{ user.username }}!</h1>
                    <button @click="signOut">Sign Out</button>
                  </template>
                </authenticator>

                <template v-if="auth.authStatus === 'configuring'">
                  <v-btn
                    color="primary"
                    :loading="submitting"
                    @click="auth.signOut"
                    size="large"
                >Loading...</v-btn>
                </template>
                <template v-if="auth.authStatus === 'authenticated'">
                  <v-btn
                    color="primary"
                    :loading="submitting"
                    @click="auth.signOut"
                    size="large"
                >Sign out</v-btn>
                </template>
                <template v-if="auth.authStatus === 'unauthenticated'">
                  <v-btn
                    color="primary"
                    :loading="submitting"
                    @click="signIn"
                    size="large"
                >{{$t('signIn')}}</v-btn>
                </template>

              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</template>

<script setup>
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
  import {useUser} from "~/composables/states";

  const auth = useAuthenticator();

  const { $i18n } = useNuxtApp()

  // definePageMeta({
  //   layout: 'vuetify-app'
  // })

  const formData = ref({
    username: '',
    password: ''
  })
  const formRules = ref({
    username: [
        v => !!v || $i18n.t('Username is required')
    ],
    password: [
        v => !!v || $i18n.t('Password is required')
    ]
  })
  const errorMsg = ref(null)
  const signInForm = ref(null)
  const submitting = ref(false)
  const route = useRoute()
  const passwordInputType = ref('password')

  const submit = async () => {
    errorMsg.value = null
    const { valid } = await signInForm.value.validate()
    if (valid) {
      submitting.value = true
      const { data, error } = await useFetch('/api/account/login/', {
        method: 'POST',
        body: JSON.stringify(formData.value)
      })
      submitting.value = false
      if (error.value) {
        if (error.value.status === 400) {
          if (error.value.data.non_field_errors) {
            errorMsg.value = error.value.data.non_field_errors[0]
          }
        } else {
          errorMsg.value = 'Something went wrong. Please try again.'
        }
      } else {
        setUser(data.value.user)
        const callback = route.query.callback ? decodeURIComponent(route.query.callback) : '/'
        await navigateTo(callback)
      }
    }
  }
</script>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'
import { Auth } from 'aws-amplify';

export default {
  created() {
    if(this.authState === undefined) {
      Auth.currentAuthenticatedUser().then(authData => {
        setUser(authData)
        const callback = route.query.callback ? decodeURIComponent(route.query.callback) : '/'
        navigateTo(callback)
      }).catch(err => {

      });
    }

    onAuthUIStateChange((authState, authData) => {
      console.log('auth ui')
      this.authState = authState;
      this.user = authData;
    })
  },

  data() {
    return { user: undefined, authState: undefined }
  },

  methods: {
    signOut: async () => Auth.signOut(),
    signIn: async () => Auth.federatedSignIn({customProvider: 'cfzero'}),
  },

  beforeDestroy() {
    return onAuthUIStateChange;
  }
}
</script>
