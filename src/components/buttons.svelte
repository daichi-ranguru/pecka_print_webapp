<script>
  import Button from '~/components/button.svelte'

  const options = [
    'ab-dospeli',
    'a-dospeli',
    'b-dospeli',

    'ab-detsky',
    'a-detsky',
    'b-detsky',

    'ab-senior',
    'a-senior',
    'b-senior',

    'ab-rodinna',
    'a-rodinna',
    'b-rodinna',

    'ab-zdarma',
    'a-zdarma',
    'b-zdarma'
  ]
</script>

<div class="m-2 sm:m-10 lg:w-3/6 2xl:w-4/6 grid grid-cols-3 sm:gap-8 gap-4 h-1/1 2xl:px-10 grid-rows-5">
  {#each options as option}
    <Button data={option} />
  {/each}
</div>
