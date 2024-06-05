<script>
    import { update } from '../state'
    import Button from './Button.svelte'

    const addStudent = () => {
            const newUser = {
            id: +new Date(), // conver date to a timestamp to use as a pseudo-random ID
            name: 'New Student',
            phone: '',
            email: '',
            score: 0,
            age: 18,
            note: '',
            registered: new Date().toISOString(),
            isActive: true
        };

        update(state => {
            state.students.unshift(newUser);

            return state;
        });
    }
</script>

<Button
    type="success"
    text="Add Student"
    onClick={addStudent}
    classNames="mx-5"
/>