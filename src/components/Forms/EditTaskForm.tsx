import { ReactElement, useState } from "react";
import ReactDOM from "react-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { editTask } from "../../store/tasks/taskSlice";
import { EditProps, FormDataType } from "../../types/task";
import "./EditTaskForm.scss";

// interface FormDataType {
//   name: string | undefined;
//   description: string | undefined;
//   id: string | undefined;
// }

const Backdrop = (/*props*/) => {
  return <div className="backdrop" /*onClick={props.onConfirm}*/></div>;
};

// const FormOverlay = () => {
//   return (
//     <form className="formOverlay">
//       <label>
//         Task name:
//         <input type="text" />
//       </label>
//     </form>
//   );
// };

// type EditProps = {
//   // editData: FormDataType;
//   visibility: boolean;
//   name: string | undefined;
//   description: string | undefined;
//   id: string | undefined;
//   setVisibility: (visibility: boolean) => void;
// };

const EditTaskForm = (props: EditProps): ReactElement => {
  const { setVisibility } = props;
  const [name, setName] = useState<string>(props.name!);
  const [description, setDescription] = useState<string>(props.description!);

  // const responseBody: FormDataType = { name: "", description: "", id: "" };
  const responseBody: FormDataType = {
    name: name,
    description: description,
    id: props.id, // --> WHY might this be UNDEFINED??????
  };

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // responseBody.name = name;
    // responseBody.description = description;
    // console.log(JSON.stringify(responseBody));
    // console.log(responseBody);
    console.log(responseBody);
    console.log(tasks);
    dispatch(editTask(responseBody));
    console.log(tasks);
    setVisibility(false);
    // setName("");
    // setDescription("");
  };

  const toggleEdit = () => {
    setVisibility(false);
  };

  // const tasks = useAppSelector((state) => state.tasks);

  // console.log(tasks);
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root") as HTMLInputElement,
      )}
      {ReactDOM.createPortal(
        <form onSubmit={onSubmitHandler} className="formOverlay">
          <label>
            Task name:
            <input
              type="text"
              value={name} // two-way-binding
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              value={description} //two-way-binding
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Save Changes</button>
          <div className="cancel" onClick={toggleEdit}>
            Cancel
          </div>
        </form>,
        document.getElementById("overlay-root") as HTMLInputElement,
      )}
    </>
  );
};

export { EditTaskForm };
