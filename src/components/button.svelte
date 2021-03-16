<script lang="typescript">
  import { appStore } from '../utils/store'
  import translations from '../utils/translations'
  export let data

  $: conditClasses =
    translations[data].collumn === 'AB'
      ? 'bg-green-600'
      : translations[data].collumn === 'A'
      ? 'bg-orange-500'
      : 'bg-red-600'
</script>

<style>
  button:focus {
    outline: 0 !important;
  }
</style>

<button
  class="rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold py-8 active:scale-90 active:shadow-sm shadow-lg transform duration-150 ease-in-out  {conditClasses}"
  on:click={() => {
    appStore.increment(data)
  }}>
  <div class="text-left w-4/6">
    <span class="block text-6xl leading-tight"> {translations[data].collumn} </span>
    <span class="block text-2xl"> {translations[data].type} </span>
  </div>
</button>
