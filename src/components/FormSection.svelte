<script>
    export let title;
</script>

<section>
    <h2 class="py-2 pl-12 font-bold text-lg text-grey bg-light border-y">{title}</h2>
    <div class="p-5 pb-10">
        <slot />
    </div>
</section>