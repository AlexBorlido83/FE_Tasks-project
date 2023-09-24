import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

  const createTask = (taskText, dataTask) => {
    const generatedId = dataTask.id; 
    const createdTask = { id: generatedId, title: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest({
    url: 'http://localhost:3000/tasks', 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { title: taskText },
  }, createTask.bind(null,taskText))

};
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
