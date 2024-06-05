<script>
  import { update } from '../state';
    import Button from './Button.svelte'

    const importStudent = () => {
        const fileSelector = document.getElementById('import');

        fileSelector.click();

        fileSelector.addEventListener('change', event => {
            const files = event.target.files;
            const reader = new FileReader();

            reader.addEventListener('load', event => {
                const result = JSON.parse(event.target.result);

                if (result.length) {
                    update(state => {
                        state.students.unshift(...result);

                        return state;
                    });
                }
                console.log(event.target.result);
            });

            reader.readAsText(files[0]);
        })
    }
</script>

<Button
    text="Import"
    onClick={importStudent}
/>
<input
    type="file"
    id="import"
    class="hidden"
    accept=".json"
/>