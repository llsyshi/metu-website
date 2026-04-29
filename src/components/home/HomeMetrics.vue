<script setup>
defineProps({
  t: {
    type: Object,
    required: true,
  },
  metricValues: {
    type: Array,
    required: true,
  },
})
</script>

<template>
      <section data-metrics class="relative z-10 -mt-10 px-4">
        <div class="mx-auto grid max-w-7xl divide-y divide-carbon/10 bg-white shadow-metal md:grid-cols-4 md:divide-x md:divide-y-0">
          <div v-for="(item, index) in t.metrics" :key="item.label" class="p-6 md:p-8">
            <p class="text-3xl font-semibold text-carbon">
              {{ metricValues[index] }}<span class="text-champagne">{{ item.suffix }}</span>
            </p>
            <p class="mt-2 text-sm leading-6 text-carbon/58">{{ item.label }}</p>
          </div>
        </div>
      </section>
</template>
