<script setup lang="ts">
//
//  CLIENT SIDE
//
import { getFirestore, collection, doc } from "firebase/firestore";

definePageMeta({
  layout: "landing",
});
const router = useRouter();
const { isMobile } = useIsMobile();
function routeToHome() {
  router.push("/");
}
const db = getFirestore();
const listRtClients = useCollection(collection(db, "rt-clients"));
const dataRtClients = useDocument(
  doc(collection(db, "rt-clients"), "DJMVMvoXOW60qR6gztPW")
);

//
//  SERVER SIDE BY POLLING VIA CLIENT SIDE
//
const { rtData: rtDataServer } = usePollingFs();
</script>

<template>
  <div class="mb-10">
    <p v-if="isMobile">Anda menggunakan perangkat mobile</p>
    <p v-else>Anda menggunakan desktop</p>
    <button class="my-3" @click="routeToHome()">Route to Home</button>
  </div>
  <div class="flex flex-col gap-14">
    <div>
      <div class="title">FIRESTORE CLIENT SIDE</div>
      <div class="flex flex-col gap-6">
        <div>
          <div class="section">All data:</div>
          <div>{{ listRtClients }}</div>
        </div>
        <div>
          <div class="section">data:</div>
          <div>{{ dataRtClients }}</div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        FIRESTORE SERVER SIDE
        <div class="subtitle">(POLLING VIA CLIENT SIDE)</div>
      </div>
      <div>{{ rtDataServer }}</div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.title {
  @apply font-bold text-[20px];
  @apply mb-8;
}
.subtitle {
  @apply font-normal italic text-[16px];
}
.section {
  @apply font-bold mb-1;
}
</style>
