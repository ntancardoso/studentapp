<script>
    export let type = 'primary';
    export let onClick;
    export let text;
    export let visible = true;
    export let classNames = '';

    const colors = {
        primary: 'bg-primary',
        success: 'bg-success',
        accent: 'bg-accent'
    }
</script>

{#if visible}
    <button
        on:click={onClick}
        class={`${colors[type]} text-light font-bold py-2 px-4 rounded-sm ${classNames}`}
    >
        {text}
    </button>
{/if}