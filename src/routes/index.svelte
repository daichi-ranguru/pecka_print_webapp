<script>
  import { fade, fly } from 'svelte/transition'
  import SEO from '~/components/seo.svelte'
  import Buttons from '~/components/buttons.svelte'
  import { appStore } from '~/utils/store.ts'
  import translations from '../utils/translations'
  import PrintResult from '../components/printResult.svelte'
  const title = 'Lístky'

  function tryToPrint() {
    window.print()
  }
</script>

<style>
  #soucet {
    flex-basis: calc(100% - 4rem - 8rem);
  }
  #soucet::before,
  #soucet::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 30px;
    pointer-events: none;
    z-index: 10;
  }

  #soucet::before {
    top: 0;
    background: rgb(237, 242, 247);
    background: linear-gradient(
      180deg,
      rgba(237, 242, 247, 1) 0%,
      rgba(237, 242, 247, 0.7) 51%,
      rgba(237, 242, 247, 0) 100%
    );
  }

  #soucet::after {
    bottom: 0;
    background: rgb(237, 242, 247);
    background: linear-gradient(
      0deg,
      rgba(237, 242, 247, 1) 0%,
      rgba(237, 242, 247, 0.7) 51%,
      rgba(237, 242, 247, 0) 100%
    );
  }
  #soucet-child {
    padding: 20px 0;
  }
  button.hlavni {
    outline: 0 !important;
  }

  @media print {
    .noprint {
      display: none !important;
    }
  }

  .calcul {
    height: auto;
    margin-bottom: 1em;
  }
  @media screen and (min-width: 500px) {
    .calcul {
      height: 8rem;
      margin-bottom: 0;
    }
  }
</style>

<SEO {title} />
<div class="lg:flex lg:flex-flow lg:h-screen w-full lg:w-screen noprint ">
  <Buttons />
  <div class="m-2 sm:m-10 lg:m-0 lg:w-3/6 2xl:w-2/6 py-10 lg:pl-6 flex flex-col">
    <div class="rounded-3xl lg:rounded-l-3xl bg-gray-200 h-full flex flex-col justify-between">
      <h1 class="font-bold text-5xl mx-10 mt-5 uppercase" style="height: 4rem;">Součet</h1>
      <div id="soucet" style="height: calc(100% - 4rem - 8rem);" class="relative mx-10">
        <div class="relative overflow-auto h-full z-0" id="soucet-child">
          {#each Object.keys($appStore) as item}
            <div class="flex justify-between align-middle" in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
              <p class="text-3xl sm:text-4xl">
                {$appStore[item]}x
                {translations[item].type}
                {translations[item].collumn}
              </p>
              <div class="flex align-middle">
                <button class="text-red-600 mx-2 px-2 text-lg rounded-full" on:click={() => appStore.decrement(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-dash-circle active:scale-90 transform duration-150 ease-in-out"
                    viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                </button>
                <button class="text-red-600 mx-2 px-2 text-lg" on:click={() => appStore.delete(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-trash active:scale-90 transform duration-150 ease-in-out rounded-full"
                    viewBox="0 0 16 16">
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </button>
              </div>
            </div>
          {/each}
          {#if Object.keys($appStore).length === 0}
            <div class="text-center h-full flex">
              <div class="h-32 m-auto">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-patch-question mx-auto h-16 w-auto text-blue-600"
                    viewBox="0 0 16 16">
                    <path
                      d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" />
                    <path
                      d="M10.273 2.513l-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" />
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                  </svg>
                </div>
                <p class="text-3xl text-blue-600">Žádná položka</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
      <div class="mx-10 uppercase  border-dashed border-t-8 border-blue-600 pt-5 text-5xl calcul">
        Celkem:
        <span class="font-bold">550Kč</span>
      </div>
    </div>
    <div class="grid grid-cols-1 h-32">
      <button
        class="{Object.keys($appStore).length === 0 ? 'opacity-50' : ''} bg-green-500 rounded-3xl my-4 lg:mx-4 text-3xl text-white font-bold shadow-lg hlavni active:scale-90 active:shadow-sm transform duration-150 ease-in-out"
        disabled={Object.keys($appStore).length === 0}
        on:click={tryToPrint}>Tisk</button>
    </div>
  </div>
</div>
<PrintResult />
