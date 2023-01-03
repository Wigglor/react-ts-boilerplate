// interface FormData {
//     name: string | undefined;
//     description: string | undefined;
//     id: string | undefined;
// }

interface FormDataType {
  name: string;
  description: string;
  id: string;
}

// interface Task {
//     name: string | undefined;
//     description: string | undefined;
//     id: string | undefined;
// }

interface TaskState {
  tasks: Task[];
  //   tasks: {
  //     name: string;
  //     description: string;
  //   }[];
}

type EditProps = {
  // editData: FormDataType;
  visibility: boolean;
  //   editData: {
  //     name: string;
  //     description: string;
  //     id: string;
  //   };
  name: string | undefined;
  description: string | undefined;
  id: string;
  setVisibility: (visibility: boolean) => void;
};

export { FormData, FormDataType, EditProps, Task, TaskState };
