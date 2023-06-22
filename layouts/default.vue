<template>
  <v-app
      :theme="$colorMode.value"
  >
    <authenticator v-if="false"></authenticator>
    <template v-if="auth.authStatus === 'authenticated'">
    </template>
    <NavigationDrawer />
    <slot />
  </v-app>
</template>

<script setup>
definePageMeta({
  //middleware: ["auth"],
  path: '/:id?',
  keepalive: true
})

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
const auth = useAuthenticator();
</script>
