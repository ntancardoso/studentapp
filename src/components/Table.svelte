<script>
  import { Link } from 'svelte-routing'
  import { state } from '../state'
  import { sort, listen, dispatch, paginate } from '../utils'
  import Export from './Export.svelte'
  import Import from './Import.svelte'

  const columns = [
    { name: 'Student', key: 'name' },
    { name: 'Phone', key: 'phone' },
    { name: 'Email', key: 'email' },
    { name: 'Score', key: 'score' },
    { name: 'Age', key: 'age'  },
    { name: 'Registration Date', key: 'registered' },
    { name: 'Active', key: 'isActive' }
  ];

  let sortKey = 'score';
  let order = 'asc';
  let currentPage = 0;
  let itemsPerPage = 10;
  let sortedStudents = paginate(sort($state.students, sortKey, order), itemsPerPage);

  const toggle = id => {
    sortedStudents[currentPage] = sortedStudents.map(student => {
      if (student.id === id) {
        student.toggled = !student.toggled;
      }

      return student;
    });

    dispatch('STUDENTS_SELECTED', sortedStudents[currentPage]);
  }

  const sortBy = key => {
    if (sortKey === key) {
      order = order === 'desc' ? 'asc' : 'desc'
    } else {
      order = 'asc'
    }

    sortKey = key
    sortedStudents[currentPage] = sort(sortedStudents[currentPage], sortKey, order);
  }

  const changeItemsPerPage = event => {
    currentPage = 0
    itemsPerPage = Number(event.target.value)
    sortedStudents = paginate(sort($state.students, sortKey, order), itemsPerPage);
  }

  listen('FILTERED_STUDENTS', event => {
    if (event.detail.length) {
      sortedStudents = paginate(event.detail, itemsPerPage);
    } else {
      sortedStudents = []
    }
  });

  state.subscribe(state => sortedStudents = paginate(state.students, itemsPerPage));
</script>

{#if sortedStudents.length}
  <table class="w-full">
    <thead class="bg-light text-left text-grey">
      <tr>
        <th></th>
        {#each columns as column}
          <th
            on:click={() => sortBy(column.key)}
            class:sorted={sortKey === column.key}
            class:desc={order === 'desc'}
          >
            {column.name}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each sortedStudents[currentPage] as student}
        <tr class={student.toggled ? 'bg-accent/10' : ''}>
          <td>
            <input
              type="checkbox"
              checked={student.toggled}
              on:click={() => toggle(student.id)}
            />
          </td>
          <td>
            <Link to={`/details/${student.id}`} class="text-primary">
              {student.name}
            </Link>
          </td>
          <td>{student.phone}</td>
          <td>
            <a href={`mailto:${student.email}`} class="text-primary underline">
              {student.email}
            </a>
          </td>
          <td>{student.score}</td>
          <td>{student.age}</td>
          <td>{student.registered}</td>
          <td>{student.isActive ? '✅' : '❌'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <section class="border-b border-grey py-2 flex justify-between px-5">
    <div>
      <span>Items per page:</span>
      <select on:change={changeItemsPerPage}>
        <option value="10" selected>10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      {#if currentPage === sortedStudents.length - 1}
        ({(currentPage * itemsPerPage) + 1}-{$state.students.lenth} of {$state.students.length} items)
      {:else}
        ({(currentPage * itemsPerPage) + 1}-{(currentPage * itemsPerPage) + itemsPerPage} of {$state.students.length} items)
      {/if}
    </div>
    <ul class="flex justify-center gap-2">
      {#if currentPage > 0}
        <li on:click={() => currentPage--} class="cursor-pointer">{'<'}</li>
      {/if}
      {#each {length: sortedStudents.length} as _, index}
        <li
          class="cursor-pointer"
          class:text-gray={index === currentPage}
          on:click={() => currentPage = index}
        >
          {index + 1}
        </li>
      {/each}
      {#if currentPage < sortedStudents.length - 1}
        <li on:click={() => currentPage++ } class="">{'>'}</li>
      {/if}
    </ul>
    <div class="flex gap-2">
      <Export />
      <Import />
    </div>
  </section>
{:else}
  <h1 class="text-center text-2xl my-14 text-grey">We found no results for your search term 🙁</h1>
{/if}
<style>
  th,
  td {
    @apply py-2 px-5 border border-grey;
  }

  th:first-child,
  td:first-child {
    @apply border-l-0;
  }

  th:last-child,
  td:last-child {
    @apply border-r-0;
  }

  th {
    @apply cursor-pointer;
  }

  th.sorted::after {
    @apply content-['^'] float-right;
  }

  th.desc::after {
    @apply rotate-180;
  }
</style>
