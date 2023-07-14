import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

function LoadTasks() {
  const [data,setData] = useState([]);

  useEffect(() => {
      const dataFetch = async () => {
          const info = await fetch("PLACEHOLDER").then(response => response.json());

          setData(info);
      };

      dataFetch();

  }, []);

  console.log(data);

}




function App() {

  const Task = (props) => {
    const {title, desc, date, delTask, index} = props;
    return (
      <div className='group relative border-solid border-red-900 border-2'>
        <div className='absolute h-full w-full border-solid border-blue-900 border-2'>
          <button onClick={() => { delTask(index)}} className='invisible group-hover:visible hover:bg-green-600 h-full w-1/2'>Done</button>
          <button onClick={() => {handleVisibility(true)
          handleDefaultTaskAndIndex(tasks[index], index)}} className='invisible group-hover:visible hover:bg-blue-600 h-full w-1/2'>Edit</button>
        </div>

        <div className=''>
          <p className='group-hover:invisible'>{title}</p>
          <p className='group-hover:invisible'>{date}</p>
        </div>
      </div>
    )
  }

  const Column = (props) => {
    const {info, delTask} = props;

    const tasks = info.map((item, index) => <Task index={index} delTask={delTask} key={index} title={item.title} desc={item.desc} date={item.date} />)
    
    return (
      <div>
        {tasks}
      </div>);
  }

  const AddOrModifyTask = () => {
    console.log(defaultTask);
    console.log(defaultIndex);
    if (defaultIndex === -1) {
      return (
        <form>
          Add task
          <div className='flex flex-col'>
            <label>
              Title
              <input type='text' name='title' maxLength='30' />
            </label>
            <label>
              Description
              <input type='text' name='desc' maxLength='250' />
            </label>
            <label>
              Due date
              <input type='date' name='date' />
            </label>
            <input type='submit' value="Add" />
          </div>
        </form>
      )} else {
        return (
          <form>
            Edit task
            <div className='flex flex-col'>
              <label>
                Title
                <input type='text' name='title' maxLength='30' defaultValue={defaultTask.title} />
              </label>
              <label>
                Description
                <input type='text' name='desc' defaultValue={defaultTask.desc} maxLength='250' />
              </label>
              <label>
                Due date
                <input type='date' name='date' defaultValue={defaultTask.date} />
              </label>
              <input type='submit' value="Edit" />
            </div>
          </form>
        )
    }  
  }

  const [defaultTask, setDefaultTask] = useState({});
  const [defaultIndex, setDefaultIndex] = useState(-1);

  const handleDefaultTaskAndIndex = (json, index) => {
    setDefaultTask(json);
    setDefaultIndex(index);
  }

  const testJSON = [{
    'title':'Do this',
    'desc':'You have to do this maaan',
    'date':'2030-02-10'
    },
    {
      'title':'Do this',
      'desc':'You have to do this maaan',
      'date':'2030-02-10'
    }
  ];


  const [tasks, setTasks] = useState(testJSON);
  
  const [rodalVisibility, setRodalVisibility] = useState(false);
  const handleVisibility = (boolean) => setRodalVisibility(boolean);

  const deleteTask = (number) => {
    const newTable = [...tasks];

    newTable.splice(number,1);

    setTasks(newTable);
  }


  

  

  return (
    <div className="">
      <div className="flow-root w-full border-solid border-black border-2">
        <h1 className="mt-2 float-left text-2xl">To-do list</h1>
        <button onClick={() => {handleVisibility(true)
        handleDefaultTaskAndIndex({}, -1)}} className="mt-2 float-right text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
      </div>
      <Rodal visible={rodalVisibility} onClose={() => handleVisibility(false)}>
        <AddOrModifyTask />
      </Rodal>
      <div className="space-y-3.5 h-48 mt-16 flex flex-col xs:flex-row border-solid border-black border-2">
        <div className="border-solid border-black border-2">Low priority
        <Column info={tasks} delTask={deleteTask} />
        </div>
        <div id="middlePriority" className="border-solid border-black border-2">Medium priority</div>
        <div id="highPriority" className="border-solid border-black border-2">High priority</div>
      </div>
    </div>
  );
}

export default App;
