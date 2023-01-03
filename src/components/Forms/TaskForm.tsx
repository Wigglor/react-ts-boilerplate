import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTask } from "../../store/tasks/taskSlice";
import { FormDataType } from "../../types/task";
import "./TaskForm.scss";

const TaskForm = (): ReactElement => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [invalidForm, setInvalidForm] = useState<boolean>(false);

  const responseBody: FormDataType = { name: "", description: "", id: "" };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.length === 0 || description.length === 0) {
      setInvalidForm(true);
    } else {
      setInvalidForm(false);
      responseBody.name = name;
      responseBody.description = description;
      responseBody.id = crypto.randomUUID();
      // console.log(JSON.stringify(responseBody));
      console.log(responseBody);
      dispatch(addTask(responseBody));
      setName("");
      setDescription("");
    }
  };

  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  return (
    <>
      {invalidForm && <div className="task-form">Fields cannot be empty</div>}
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="text">
          Task name:
          <input
            type="text"
            value={name}
            /*two-way-binding*/ onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="text">
          Description:
          <input
            type="text"
            value={description}
            /*two-way-binding*/ onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </>
  );
};

export { TaskForm };
