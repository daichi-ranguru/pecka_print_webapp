<script>
  import { appStore } from '~/utils/store.ts'
  import translations from '../utils/translations'

  $: s = ary => ary.map(item => translations[item].price * $appStore[item]).reduce((acu, val) => acu + val, 0)

  $: abRes = Object.keys($appStore).filter(val => val.startsWith('ab-'))
  $: aRes = Object.keys($appStore).filter(val => val.startsWith('a-'))
  $: bRes = Object.keys($appStore).filter(val => val.startsWith('b-'))

  $: abValue = s(abRes)
  $: aValue = s(aRes)
  $: bValue = s(bRes)

  function getToday() {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()

    return `${dd}.${mm}.${yyyy}`
  }

  const nf = new Intl.NumberFormat()
</script>

<style>
  .wrap {
    top: 10mm;
    left: 94mm;
  }
  .top-row {
    width: 41mm;
  }
  .people {
    font-size: 0.6em;
    padding-top: 1.4em;
    padding-left: 2.6em;
    min-height: 20mm;
    width: 21mm;
  }
  .title {
    font-size: 4.5em;
    height: 20mm;
    width: 27mm;
    line-height: 1em;
  }
  .date {
    padding-top: 0.4mm;
    font-size: 0.83rem;
  }
  hr {
    height: 2px;
  }
  .paper-wrap {
    height: 58mm;
    width: 152.4mm;
    position: relative;
  }
  .print {
    display: none;
  }

  @media print {
    .print {
      display: block !important;
    }
  }
</style>

<div id="print-result" class="print">
  {#if abRes.length > 0}
    <div class="paper-wrap">
      <div class="absolute wrap">
        <div class="grid grid-cols-2 top-row">
          <div class="text-6xl font-bold title">AB</div>
          <div class="people">
            {#each abRes as item}
              <p>{$appStore[item]}x {translations[item].type}</p>
            {/each}
          </div>
        </div>
        <hr class="m-0 border-black" />
        <div class="flex justify-between">
          <p class="text-black date">{getToday()}</p>
          <p class="font-bold">{nf.format(abValue)} Kč</p>
        </div>
      </div>
    </div>
  {/if}

  {#if aRes.length > 0}
    <div class="paper-wrap" id="print-result">
      <div class="absolute wrap">
        <div class="grid grid-cols-2 top-row">
          <div class="text-6xl font-bold title">A</div>
          <div class="people">
            {#each aRes as item}
              <p>{$appStore[item]}x {translations[item].type}</p>
            {/each}
          </div>
        </div>
        <hr class="m-0 border-black" />
        <div class="flex justify-between">
          <p class="text-black date">{getToday()}</p>
          <p class="font-bold">{nf.format(aValue)} Kč</p>
        </div>
      </div>
    </div>
  {/if}

  {#if bRes.length > 0}
    <div class="paper-wrap" id="print-result">
      <div class="absolute wrap">
        <div class="grid grid-cols-2 top-row">
          <div class="text-6xl font-bold title">B</div>
          <div class="people">
            {#each bRes as item}
              <p>{$appStore[item]}x {translations[item].type}</p>
            {/each}
          </div>
        </div>
        <hr class="m-0 border-black" />
        <div class="flex justify-between">
          <p class="text-black date">{getToday()}</p>
          <p class="font-bold">{nf.format(bValue)} Kč</p>
        </div>
      </div>
    </div>
  {/if}
</div>
