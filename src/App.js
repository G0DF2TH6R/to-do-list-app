import React, { useEffect, useState } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';


function App() {
  const testJSON = [{
    'id':'0',
    'title':'Do this',
    'desc':'You have to do this maaan',
    'date':'2030-02-10',
    'priority':'Low'
  },
  {
    'id':'1',
    'title':'Do that',
    'desc':'You have to do this maaan',
    'date':'2030-02-10',
    'priority':'Medium'
  },
  {
    'id':'2',
    'title':'Do this first!',
    'desc':'You have to do this maaan',
    'date':'2030-02-10',
    'priority':'High'
  }
];

  const [tasks, setTasks] = useState(testJSON);

  const Task = (props) => {
    const {title, desc, date, delTask, id} = props;
    return (
      <div className='group m-1 relative border-solid border-black border-2'>
        <div className='invisible xs:group-hover:visible absolute h-full w-full '>
          <button onClick={() => { delTask(id)}} className=' hover:bg-green-500 border-r-2 h-full w-1/2'>Done</button>
          <button onClick={() => {handleVisibility(true)
          handleDefaultTask(findTaskById(id))}} className=' hover:bg-red-500 h-full w-1/2'>Edit</button>
        </div>

        <div onClick={() => clickableTasks(id)} className=''>
          <p className='xs:group-hover:invisible'>{title}</p>
          <p className='hidden xs:block xs:group-hover:invisible'>{desc}</p>
          <p className='xs:group-hover:invisible'>{date}</p>
        </div>
      </div>
    )
  }

  const findTaskById = (id) => {
    let i = 0;

    while (true) {
      if (tasks[i].id == id) {
        return tasks[i];
      }

      i++;
    }
  }

  const Column = (props) => {
    const {info, delTask, priority} = props;

    const tasks = info.filter((item) => item.priority == priority).map((item, index) => <Task id={item.id} delTask={delTask} key={index} title={item.title} desc={item.desc} date={item.date} />)
    
    return (
      <div className='space-y-3.5'>
        {tasks}
      </div>);
  }




  const AddOrModifyTask = () => {
    const [inputs, setInputs] = useState({
      'id':'',
      'title':'',
      'desc':'',
      'date':'',
      'priority':''
    }); 
    const [submission,setSubmission] = useState({});

    useEffect(() => {
      if (inputs.id == '') {
        setSubmission(values => ({...values, "id": defaultTask.id}));
      }

      if (inputs.title == '') {
        setSubmission(values => ({...values, "title": defaultTask.title}));
      }

      if (inputs.desc == '') {
        setSubmission(values => ({...values, "desc": defaultTask.desc}));
      }

      if (inputs.date == '') {
        setSubmission(values => ({...values, "date": defaultTask.date}));
      }
      
      if (inputs.priority == '') {
        setSubmission(values => ({...values, "priority": defaultTask.priority}));
      }
    }, [inputs])

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
      setSubmission(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      alert(JSON.stringify(submission));
    }

    const handleEditSubmit = (event) => {
      handleSubmit(event);
      deleteTask(submission.id);
    }

    const [textAreaSize, setTextAreaSize] = useState(0);

    const handleTextAreaChange = (event) => {
      handleChange(event);
      setTextAreaSize(event.target.value.length);
    }

    if (defaultTask.id === '') {
      return (
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <input name='title' onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <textarea name='desc' onChange={handleTextAreaChange} maxLength={500} className="resize-none appearance-none block w-full h-48 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="textarea"/>
              <p className='float-right text-xs'>{textAreaSize}/500</p>
            </div>
          </div>
          <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Due date
              </label>
              <input name='date' onChange={handleChange} className="appearance-none mb-4 block w-auto bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Priority
              </label>
              <div className="relative">
                <select name='priority' onChange={handleChange} className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight hover:outline-none hover:bg-white hover:border-gray-500 focus:outline-none focus:bg-white focus:border-gray-500">
                  <option >Low</option>
                  <option >Medium</option>
                  <option >High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className=":w-1/3 px-3 mb-6 mt-6 ml-36 md:mb-0">
              <button onClick={handleSubmit} className="float-right text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
            </div>
          </div>
        </form>
      ); 
    } else {
      return (
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <input name='title' defaultValue={defaultTask.title} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <textarea defaultValue={defaultTask.desc} name='desc' onChange={handleTextAreaChange} maxLength={500} className="resize-none appearance-none block w-full h-48 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="textarea"/>
              <p className='float-right text-xs'>{textAreaSize}/500</p>
            </div>
          </div>
          <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Due date
              </label>
              <input name='date' onChange={handleChange} className="appearance-none mb-4 block w-auto bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" />
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className=" md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Priority
              </label>
              <div className="relative">
                <select defaultValue={defaultTask.priority} name='priority' onChange={handleChange} className="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight hover:outline-none hover:bg-white hover:border-gray-500 focus:outline-none focus:bg-white focus:border-gray-500">
                  <option >Low</option>
                  <option >Medium</option>
                  <option >High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className=":w-1/3 px-3 mb-6 mt-6 ml-36 md:mb-0">
              <button onClick={handleEditSubmit} className="float-right text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
            </div>
          </div>
        </form>
      ); 
    }

  }

  const [defaultTask, setDefaultTask] = useState({});

  const handleDefaultTask = (json) => {
    setDefaultTask(json);
  }


  
  const [rodalVisibility, setRodalVisibility] = useState(false);
  const handleVisibility = (boolean) => setRodalVisibility(boolean);
  
  const [descRodalVisibility, setDescRodalVisibility] = useState(false);
  const handleDescVisibility = (boolean) => setDescRodalVisibility(boolean);

  const deleteTask = (number) => {
    let i = 0;

    while (true) {
      if (tasks[i].id == number) {
        const newTable = [...tasks];

        newTable.splice(i,1);

        setTasks(newTable);
        return;
      }

      i++;
    }

  }


  const [shouldWork, setShouldWork] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShouldWork(window.innerWidth <= 390);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])

  const clickableTasks = (id) => {
    if (shouldWork) {
      setChosenTask(findTaskById(id));
      setDescRodalVisibility(true);
    }
  }
  const [chosenTask, setChosenTask] = useState({});

  const Description = () => {
    let i = 0;

    return (
      <div className='text-2xl'>
        <div className='flex mb-2'>
          <h1 className='mx-2'>Title:</h1>
          <p className=''>{chosenTask.title}</p>
        </div>
        <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700'/>
        <div className='mx-2 mb-2'>
          <h1>Description:</h1>
          <p>{chosenTask.desc}</p>
        </div>
        <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700' />
        <div className='flex mb-2'>
          <h1 className='mx-2'>Due date:</h1>
          <p>{chosenTask.date}</p>
        </div>
        <hr className='h-px my-2 bg-gray-200 border-0 dark:bg-gray-700' />
        <div className='flex mb-2'>
          <h1 className='mx-2'>Priority:</h1>
          <p>{chosenTask.priority}</p>
        </div>
      </div>
    )
  }
  

  return (
    <div className="font-serif ">
      <div className="flow-root w-full p-2">
        <h1 className="mt-2 float-left text-2xl">To-do list</h1>
        <button onClick={() => {handleVisibility(true)
        setDefaultTask({
          'id':'',
          'title':'',
          'desc':'',
          'date':'',
          'priority':'Low'
        })}} className="mt-2 float-right text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
      </div>
      <Rodal height={550} visible={rodalVisibility} onClose={() => handleVisibility(false)}>
        <AddOrModifyTask />
      </Rodal>
      <Rodal width={340} height={250} visible={descRodalVisibility} onClose={() => handleDescVisibility(false)}>
        <Description />
      </Rodal>
      <div className='h-8 xs:h-16'/>
      <div className="text-center h-screen text-s_black text-2xl w-full space-y-3.5 flex flex-col xs:flex-row">
        <div className="bg-c_blue h-full border-solid xs:flex-auto xs:w-1/3 border-black border-2 m-4">
          <h1 className='pb-2 underline'>Low Priority</h1>
          <Column priority="Low" info={tasks} delTask={deleteTask} />
        </div>
        <div className="bg-ut_orange h-full border-solid xs:flex-auto xs:w-1/3 border-black border-2 mx-4 ">
          <h1 className='pb-2 underline'>Medium Priority</h1>
          <Column priority="Medium" info={tasks} delTask={deleteTask} />
        </div>
        <div className="bg-crimson border-solid h-full xs:flex-auto xs:w-1/3 border-black border-2 m-4">
          <h1 className='pb-2 underline'>High Priority</h1>
          <Column priority="High" info={tasks} delTask={deleteTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
