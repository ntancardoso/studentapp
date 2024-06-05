<script>
    import Button from './Button.svelte'
    import { update } from '../state'
    import { listen } from '../utils'

    let toggledStudents = [];

    const deleteStudents = () => {
        update(state => {
            state.students = state.students.filter(student => !student.toggled);
            
            return state;
        });

        toggledStudents = [];
    }

    listen('STUDENTS_SELECTED', payload => toggledStudents = payload.detail);
</script>

<Button
    type="accent"
    text="Bulk Delete"
    onClick={deleteStudents}
    classNames="mx-5"
    visible={toggledStudents.some(student => student.toggled)}
/>