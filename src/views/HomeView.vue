<script setup lang="ts">
import TestComponent from "@/components/TestComponent.vue";
</script>

<template>
  <main>
    <div>
      <suspense> <test-component></test-component></suspense>
    </div>
  </main>
</template>
