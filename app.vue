<script setup lang="ts">
const title = ref("Instant Note (β)");
useHead({
  bodyAttrs: {
    class: "font-ja",
  },
});
</script>

<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
      <Link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🚀</text></svg>"
      />
      <Link
        rel="icon alternate"
        type="image/png"
        href="https://cdn.jsdelivr.net/gh/twitter/twemoji@v13.0.2/assets/72x72/1f680.png"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
