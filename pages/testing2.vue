<script setup>
const { data: asdasd } = await useFetch("/api/sheets", {
  params: {
    name: "LTA Imran",
    checklist: "2",
  },
});
</script>

<template>{{ asdasd }}</template>
