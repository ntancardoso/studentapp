<script>
    export let label;
    export let value;
    export let onKeyUp;

    const id = btoa(value);
</script>

<div class="flex flex=col gap-1">
    <label for={id} class="text-grey text-sm">{label}</label>
    <input
        id={id}
        type="text"
        value={value}
        class="border rounded-sm border-grey p-1"
        on:keyup={onKeyUp}
    />
</div>