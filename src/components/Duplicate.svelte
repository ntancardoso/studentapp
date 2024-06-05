<script>
    import { navigate } from 'svelte-routing';
    import { update } from '../state';
    import Button from './Button.svelte';

    export let student;

    const duplicateStudent = () => {
        const newStudent = {
            ...student,
            id: +new Date(),
        };

        update(state => {
            state.students.unshift(newStudent);

            return state;
        });

        navigate('/');
    }
</script>

<Button
    text="Duplicate"
    onClick={duplicateStudent}
    classNames="mx=5"
/>