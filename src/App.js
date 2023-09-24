import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks} = useHttp();


  useEffect(() => {
    const taskTransform = (taskObj) => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
      const taskData = taskObj[taskKey];
      loadedTasks.push({ id: taskData.id, title: taskObj[taskKey].title });
      }

      setTasks(loadedTasks);
    };

    fetchTasks({url: 'http://localhost:3000/tasks'}, taskTransform);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const deleteTaskHandler = (taskId) => {
    // Filter out the task with the given taskId
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDelete={deleteTaskHandler}
      />
    </React.Fragment>
  );
}

export default App;
