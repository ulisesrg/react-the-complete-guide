import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);

    const transformTasks = useCallback((tasksObj) => {
        const loadedTasks = [];

        for (const taskKey in tasksObj) {
            loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
        }

        setTasks(loadedTasks);
    }, []);

    const {
        isLoading,
        error,
        sendRequest: fetchTasks,
    } = useHttp(
        useMemo(() => {
            return {
                url: 'https://react-complete-guide-htt-c56f1-default-rtdb.firebaseio.com/tasks.json',
            };
        }, []),
        transformTasks
    );

    /*
        fetchTasks will be different as it is a function/object, so we'll add
        useCallback in use-https for sendRequest to prevent infinite loop
    */
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
