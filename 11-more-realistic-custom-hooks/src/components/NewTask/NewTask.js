import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
    const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

    const createdTask = (taskText, taskData) => {
        const generatedId = taskData.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
    };

    const enterTaskHandler = async (taskText) => {
        sendTaskRequest({
            url: 'https://react-complete-guide-htt-c56f1-default-rtdb.firebaseio.com/tasks.json',
            method: 'POST',
            body: { text: taskText },
            headers: {
                'Content-Type': 'application/json',
            },
        }, createdTask.bind(null, taskText));
        /* 
            Above, very clever method to use createdTask and add an argument just for this case
            in which we need it
        */
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
