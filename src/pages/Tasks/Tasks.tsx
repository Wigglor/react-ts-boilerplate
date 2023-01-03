import { ReactElement, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { EditTaskForm } from "../../components/Forms/EditTaskForm";
import { TaskForm } from "../../components/Forms/TaskForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTask } from "../../store/tasks/taskSlice";
import "./Tasks.scss";

interface FormData {
  name: string;
  description: string;
  id: string;
}

const Tasks = (): ReactElement => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [data, setData] = useState<FormData>();
  // const [data, setData] = useState<FormData>();
  const [name, setName] = useState<string>();

  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const removeTaskHandler = (event: React.MouseEvent<SVGElement>, id: string) => {
    event.preventDefault();
    dispatch(removeTask(id));
  };

  const editTaskHandler = (event: React.MouseEvent<SVGElement>, task: FormData) => {
    event.preventDefault();

    setData(task);
    setVisibility(true);
    // dispatch(editTask(task));
  };
  console.log(tasks);

  return (
    <>
      <div className="tasks">
        <h1>Tasks</h1>
        <TaskForm />
        <div className="tasks-items">
          {tasks.tasks.map((item) => (
            <div className="tasks-items__item" key={item.id}>
              <div className="tasks-items__item-close">
                <MdModeEditOutline onClick={(e) => editTaskHandler(e, item)} />
                <FaRegWindowClose onClick={(e) => removeTaskHandler(e, item.id!)} />
              </div>
              <p>{item.name}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      {visibility && (
        <EditTaskForm
          visibility={visibility}
          // editData={data}
          id={data!.id}
          name={data?.name}
          description={data?.description}
          setVisibility={setVisibility}
        />
      )}
    </>
  );
};

export default Tasks;
