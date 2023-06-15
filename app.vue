<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
</script>
<template>
  <NuxtLayout>
    <Authenticator v-if="false"></Authenticator>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>
