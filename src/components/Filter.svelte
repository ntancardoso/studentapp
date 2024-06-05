<script>
    import { state } from '../state'
    import { dispatch } from '../utils'

    let filterToggled = false;
    let selectedFilter = 'name';

    const filters = [
        { name: 'Name', key: 'name' },
        { name: 'Phone', key: 'phone' },
        { name: 'Email', key: 'email' },
        { name: 'Score', key: 'score' },
        { name: 'Age', key: 'age'  },
        { name: 'Registration Date', key: 'registered' },
        { name: 'Active', key: 'isActive' }
    ];

    const toggleFilter = event => {
        if (event.target.dataset.action === 'filter') {
            filterToggled = !filterToggled;
        }
    }

    const selectFilter = event => selectedFilter = event.target.value;

    const filter = event => {
        const filteredStudents = event.target.value ? $state.students.filter(student => {
            if (selectedFilter === 'isActive') {
                return student.isActive === event.target.checked;
            } else {
                return String(student[selectedFilter]).toLocaleLowerCase().includes(event.target.value);
            }
        }) : $state.students;

        dispatch('FILTERED_STUDENTS', filteredStudents);
    }
</script>

<button on:click={toggleFilter} class="relative w-5">
    <img
        class="mx-auto select-none"
        src={filterToggled ? '/close-filter.svg' : '/filter.svg'}
        alt="Filter"
        data-action="filter"
    />
    <div class="absolute right-12 top-0 p-5 bg-[#FFF] drop-shadow-lg z-10 text-left" class:hidden={!filterToggled}>
        <label for="filters" class="mb-2 block">Filter by:</label>
        <select on:change={selectFilter} class="border w-full mb-1 rounded-sm border-grey p-1 min-w-[100px]" id="filters">
            {#each filters as filter}
                <option value={filter.key} selected={filter.key === selectedFilter}>
                    {filter.name}
                </option>
            {/each}
        </select>
        {#if selectedFilter === 'isActive'}
            <input type="checkbox" on:change={filter} />
        {:else}
            <input
                type="text"
                placeholder="Enter your search query..."
                class="border rounded-sms border-grey p-1"
                on:keyup={filter}
            />
        {/if}
    </div>
</button>
