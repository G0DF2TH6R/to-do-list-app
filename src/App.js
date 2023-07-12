import React, { useEffect, useState } from 'react';

function LoadFood() {
  const [data,setData] = useState([]);

  useEffect(() => {
      const dataFetch = async () => {
          const info = await fetch("http://localhost:8080/api/food").then(response => response.json());

          setData(info);
      };

      dataFetch();

  }, []);

  console.log(data);

}

function App() {

  const testJSON = {
    'title':'Do this',
    'desc':'You have to do this maaan',
    'date':'10.02.2030'
  }

  const [data, setData] = useState([]);

  const testList = [];

  for (let i = 0; i < 20; i++) {
    testList.push(testJSON);
  }

  useEffect(() => {
      setData(testList);
  }, [])

  const tasks = data.map((item) => <ol>
    <li>{item.title}</li>
    <li>{item.desc}</li>
    <li>{item.date}</li>
    </ol>)

  return (
    <div className="">
      <div className="flow-root w-full border-solid border-black border-2">
        <h1 className="mt-2 float-left text-2xl">To-do list</h1>
        <button className="mt-2 float-right text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
      </div>
      <div className="space-y-3.5 mt-16 flex flex-col xs:flex-row border-solid border-black border-2">
        <div id="lowPriority" className="border-solid border-black border-2">Low priority
          {tasks}
        </div>
        <div id="middlePriority" className="border-solid border-black border-2">Medium priority</div>
        <div id="highPriority" className="border-solid border-black border-2">High priority</div>
      </div>
    </div>
  );
}

export default App;
