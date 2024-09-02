import React, { useCallback, useEffect, useState } from "react";
import ScrollView from "devextreme-react/scroll-view";
import Sortable from "devextreme-react/sortable";
// import { tasks as taskList, employees } from "./data.js";
import "./style.css";
import axios from "axios";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
const taskList = [
  {
    Task_ID: 1,
    Task_Assigned_Employee_ID: 1,
    Task_Owner_ID: 1,
    Task_Subject: "Plans 2010",
    Task_Start_Date: "2015-01-01T00:00:00",
    Task_Due_Date: "2015-04-01T00:00:00",
    Task_Status: "новый",
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 2,
    Task_Assigned_Employee_ID: 2,
    Task_Owner_ID: 1,
    Task_Subject: "Plans 2012",
    Task_Start_Date: "2015-01-01T00:00:00",
    Task_Due_Date: "2015-04-01T00:00:00",
    Task_Status: "в работе",
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 3,
    Task_Assigned_Employee_ID: 3,
    Task_Owner_ID: 1,
    Task_Subject: "Plans 2011",
    Task_Start_Date: "2015-01-01T00:00:00",
    Task_Due_Date: "2015-04-01T00:00:00",
    Task_Status: "готов к выдаче",
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 4,
    Task_Assigned_Employee_ID: 2,
    Task_Owner_ID: 1,
    Task_Subject: "Plans 2018",
    Task_Start_Date: "2015-01-01T00:00:00",
    Task_Due_Date: "2015-04-01T00:00:00",
    Task_Status: "выкуплен",
    Task_Priority: 3,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
  {
    Task_ID: 5,
    Task_Assigned_Employee_ID: 1,
    Task_Owner_ID: 1,
    Task_Subject: "Plans 2015",
    Task_Start_Date: "2015-01-01T00:00:00",
    Task_Due_Date: "2015-04-01T00:00:00",
    Task_Status: "отменен",
    Task_Priority: 4,
    Task_Completion: 100,
    Task_Parent_ID: 0,
  },
];

const employees = [
  {
    ID: 1,
    Name: "John Heart",
  },
  {
    ID: 2,
    Name: "Samantha Bright",
  },
  {
    ID: 3,
    Name: "Arthur Miller",
  },
];

function getLists(statusArray, taskArray) {
  const tasksMap = taskArray.reduce((result, task) => {
    if (result[task.Task_Status]) {
      result[task.Task_Status].push(task);
    } else {
      result[task.Task_Status] = [task];
    }
    return result;
  }, {});
  return statusArray.map((status) => tasksMap[status]);
}
function getEmployeesMap(employeesArray) {
  return employeesArray.reduce((result, employee) => {
    result[employee.ID] = employee.Name;
    return result;
  }, {});
}
function removeItem(array, removeIdx) {
  return array.filter((_, idx) => idx !== removeIdx);
}
function insertItem(array, item, insertIdx) {
  const newArray = [...array];
  newArray.splice(insertIdx, 0, item);
  return newArray;
}
function reorderItem(array, fromIdx, toIdx) {
  const item = array[fromIdx];
  const result = removeItem(array, fromIdx);
  return insertItem(result, item, toIdx);
}
const taskStatuses = [
  "новый",
  "в работе",
  "выкуплен",
  "готов к выдаче",
  "отменен",
];

const employeesRecord = getEmployeesMap(employees);
const Card = ({ task, employeesMap, setPopupVisible }) => (
  <div className="card dx-card" onClick={() => setPopupVisible(true)}>
    <div className={`card-priority priority-${task.Task_Priority}`}></div>
    <div className="card-subject">{task.Task_Subject}</div>
    <div className="card-assignee">
      {employeesMap[task.Task_Assigned_Employee_ID]}
    </div>
  </div>
);
const List = ({
  title,
  index,
  tasks,
  employeesMap,
  onTaskDrop,
  setPopupVisible,
}) => (
  <div className="list">
    <div className="list-title">{title}</div>
    <ScrollView
      className="scrollable-list"
      direction="vertical"
      showScrollbar="always"
    >
      <Sortable
        className="sortable-cards"
        group="cardsGroup"
        data={index}
        onReorder={onTaskDrop}
        onAdd={onTaskDrop}
      >
        {tasks.map((task) => (
          <Card
            key={task.Task_ID}
            task={task}
            employeesMap={employeesMap}
            setPopupVisible={setPopupVisible}
          ></Card>
        ))}
      </Sortable>
    </ScrollView>
  </div>
);
function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const shops = {
    "7c803cc7-bd61-11eb-9672-a8a1595a0d25":
      'Магазин "Варшавка"; 117105, г.Москва, муниципальный округ Донской, Варшавское ш, дом 18, корпус 1',
    "90eeaa40-bfbb-11eb-82c8-001d7dd64d88":
      'Магазин "Садовая-Спасская"; 107078, г. Москва, муниципальный округ Красносельский, ул. Садовая-Спасская 17/2',
  };
  //  const taskList = []
  const [statuses, setStatuses] = useState(taskStatuses);
  const [lists, setLists] = useState(getLists(taskStatuses, taskList));
  const onListReorder = useCallback(({ fromIndex, toIndex }) => {
    setLists((state) => reorderItem(state, fromIndex, toIndex));
    setStatuses((state) => reorderItem(state, fromIndex, toIndex));
  }, []);
  useEffect(() => {
    async function exec() {
      const bearer =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJleHAiOjE3MjUyOTE3ODIsImlzcyI6IldpbmVTZXJ2ZXIiLCJhdWQiOiJhZG1pbiJ9.CECDoQ5TXKJzffJkxwXChyPenyky5gHbvce9uGgXwAg";
      const res = await axios("http://194.87.239.231:55555/api/deal", {
        headers: {
          User: "admin",
          Authorization: `Bearer ${bearer}`,
        },
      });
      console.log(res);
      setLists(
        getLists(
          taskStatuses,
          res.data.map((el, idx) => ({
            Task_ID: idx,
            Task_Assigned_Employee_ID: 1,
            Task_Owner_ID: 1,
            Task_Subject: el.dealName,
            Task_Start_Date: "2015-01-01T00:00:00",
            Task_Due_Date: "2015-04-01T00:00:00",
            Task_Status: "отменен",
            Task_Priority: 4,
            Task_Completion: 100,
            Task_Parent_ID: 0,
          }))
        )
      );
    }
    exec();
  }, []);
  const onTaskDrop = useCallback(
    ({ fromData, toData, fromIndex, toIndex }) => {
      const updatedLists = [...lists];
      console.log(updatedLists);
      const item = updatedLists[fromData][fromIndex];
      updatedLists[fromData] = removeItem(updatedLists[fromData], fromIndex);
      updatedLists[toData] = insertItem(updatedLists[toData], item, toIndex);
      setLists(updatedLists);
    },
    [lists]
  );

  return (
    <>
      {/* <Popup
        visible={true}
        dragEnabled={false}
        hideOnOutsideClick={true}
        showCloseButton={false}
        showTitle={true}
        title="Information"
        container=".dx-viewport"
        width={300}
        height={280}
      >
        <Position at="bottom" my="center" collision="fit" />
        <ToolbarItem widget="dxButton" toolbar="top" locateInMenu="always" />
        <ToolbarItem widget="dxButton" toolbar="bottom" location="before" />
        <ToolbarItem widget="dxButton" toolbar="bottom" location="after" />
        <p>Full Name: MAx</p>
      </Popup> */}
      <Popup
        visible={popupVisible}
        dragEnabled={false}
        title="Описание"
        width={300}
        hideOnOutsideClick={() => setPopupVisible(false)}
        height={280}
      >
        <p>Full Name: MAx</p>
      </Popup>
      <div id="kanban">
        <ScrollView
          className="scrollable-board"
          direction="horizontal"
          showScrollbar="always"
        >
          <Sortable
            className="sortable-lists"
            itemOrientation="horizontal"
            handle=".list-title"
            onReorder={onListReorder}
          >
            {lists.map((tasks, listIndex) => {
              const status = statuses[listIndex];
              return (
                <List
                  key={status}
                  title={status}
                  index={listIndex}
                  tasks={tasks}
                  employeesMap={employeesRecord}
                  onTaskDrop={onTaskDrop}
                  setPopupVisible={setPopupVisible}
                ></List>
              );
            })}
          </Sortable>
        </ScrollView>
      </div>
    </>
  );
}
export default App;
