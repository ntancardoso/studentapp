<script>
    import { Link, navigate } from 'svelte-routing'
    import Add from './Add.svelte'
    import BulkDelete from './BulkDelete.svelte'
    import Filter from './Filter.svelte'
    import Button from './Button.svelte'
    import Duplicate from './Duplicate.svelte'
    import Export from './Export.svelte'

    export let student = null;
</script>

<header class="flex justify-between items-center p-5">
    <Link to="/" class="text-accent font-bold text-2xl flex gap-2">
        <img src="/svelte.svg" alt="Svelte logo" />
        {#if student}
            {student.name} ({student.age})
        {:else}
            Students Dashboard
        {/if}
    </Link>
    <div>
        {#if student}
            <Export student={student} />
            <Duplicate student={student} />
            <Button text="Back" onClick={() => navigate('/')} />
        {:else}
            <BulkDelete />
            <Add />
            <Filter />
        {/if}
    </div>
</header>