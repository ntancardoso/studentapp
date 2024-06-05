<script>
    import Button from "./Button.svelte"
    import { state } from '../state'

    export let student = null;

    const exportStudent = () => {
        const data = JSON.stringify(student || $state.students);
        const link = document.createElement('a');

        link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        link.setAttribute('download', 'students.json');
        link.style.display = 'none';

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link)
    }
</script>

<Button
    text={student ? 'Export student' : 'Export'}
    onClick={exportStudent}
/>