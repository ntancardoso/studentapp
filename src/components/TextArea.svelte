<script>
    export let label;
    export let value;
    export let onKeyUp;

    const id = btoa(value);
</script>

<div class="flex flex-col gap-1">
    <label for={id} class="text-grey text-sm">{label}</label>
    <textarea
        id={id}
        value={value}
        class="border rounded-sm border-grey p-1 w-98 h-28 resize-none"
        on:keyup={onKeyUp}
    ></textarea>
</div>