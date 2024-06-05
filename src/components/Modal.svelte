<script>
    export let isOpen = false;
  </script>
  
  <div class={[
    'fixed top-1/2 left-1/2 p-5 bg-light rounded-sm',
    'shadow-[0_0_0_9999px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2'
  ].join(' ')} class:hidden={!isOpen}>
    <slot />
  </div>
  