<script>
  import { Router, Route } from 'svelte-routing'
  import List from './pages/List.svelte'
  import Details from './pages/Details.svelte'
</script>

<Router>
  <Route component={List} />
  <Route path="/details" component={List} />
  <Route path="/details/:id" let:params>
    <Details id={params.id} />
  </Route>
</Router>
