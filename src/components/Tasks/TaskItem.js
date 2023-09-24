import useHttp from '../../hooks/use-http';
import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  const {isLoading, error, sendRequest: removeTaskRequest} = useHttp();


  const deleteTaskHandler = () => {
    removeTaskRequest({
      url: 'http://localhost:3000/tasks/' + props.id,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    props.onDelete(props.id);
  } 
  

  return <li className={classes.task}>
    {props.children}
    <button onClick={deleteTaskHandler}>X</button>
    </li>
};

export default TaskItem;