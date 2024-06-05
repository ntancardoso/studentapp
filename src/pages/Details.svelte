<script>
    import { navigate } from 'svelte-routing'
    import { state, update } from '../state'
    import Header from '../components/Header.svelte'
    import FormSection from '../components/FormSection.svelte'
    import Input from '../components/Input.svelte'
    import TextArea from '../components/TextArea.svelte'
    import Button from '../components/Button.svelte'
    import Modal from '../components/Modal.svelte'

    export let id;

    const student = $state.students.find(student => [id, Number(id)].includes(student.id));

    if (!student) {
        navigate('/');
    }

    let showModal = false;

    const updateStudent = (property, event) => {
        student[property] = property === 'isActive' ? event.target.checked : event.target.value;

        update(state => {
            state.students = state.students.map(entry => {
                if (entry.id === student.id) {
                    entry = student;
                }

                return entry;
            });

            return state;
        });
    }

    const deleteStudent = () => {
        update(state => {
            state.students = state.students.filter(entry => entry.id !== student.id);

            return state;
        });

        navigate('/');
    }
</script>

<Header student={student} />
<FormSection title={`Student Information (#${student.id})`}>
    <div class="flex items-end gap-2">
        <Input value={student.name} label="Student name" onKeyUp={event => updateStudent('name', event)} />
        <span class="mb-2 text-sm text-grey">
            Age: {student.age},
            score: <strong class="font-bold text-base text-accent">{student.score}</strong>
        </span>
    </div>
</FormSection>
<FormSection title="Contact Information">
    <div class="flex gap-5">
        <Input value={student.phone} label="Phone number" onKeyUp={event => updateStudent('phone', event)} />
        <Input value={student.email} label="Email address" onKeyUp={event => updateStudent('email', event)} />
    </div>
</FormSection>
<FormSection title="Notes">
    <TextArea value={student.note} label="Put your notes here" onKeyUp={event => updateStudent('note', event)} />
</FormSection>
<FormSection title="Registration Details">
    <div class="flex justify-between">
        <div class="flex gap-12">
            <div class="flex flex-col gap-1">
                <span class="text-grey text-sm">Registered on</span>
                <span>{student.registered.split('T')[0]}</span>
            </div>
            <div class="flex flex-col gap-2 items-start">
                <span class="text-grey text-sm">Active student</span>
                <input type="checkbox" checked={student.isActive} on:change={event => updateStudent('isActive', event)} />
            </div>
        </div>
        <Button text="Delete Student" type="accent" onClick={() => showModal = true} />
        <Modal isOpen={showModal}>
            <p class="mb-2">Are you sure you want to delete this student?</p>
            <div class="flex justify-end gap-2">
                <Button text="Delete" type="accent" onClick={deleteStudent} />
                <Button text="Cancel" onClick={() => showModal = false} />
            </div>
        </Modal>
    </div>
</FormSection>