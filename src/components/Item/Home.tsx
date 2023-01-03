import { ReactElement, useState } from "react";

interface AppName {
  name: string;
}

interface MyObject {
  name: string;
  surname: string;
  age?: number;
  address?: Address;
  things?: string[];
}

export interface Address {
  houseNo: number;
  street: string;
  Town: string;
}
interface MyObject {
  // Declaration merging
  nationality: string;
}

const myUnion: string | null = "test union";
// myUnion = "test union";

const Home = ({ name }: AppName): ReactElement => {
  const [student, setStudent] = useState<MyObject | null>(null);
  const addStudent = () => {
    setStudent({
      name: "Jane",
      surname: "Doe",
      age: 20,
      nationality: "Sweden",
      things: ["Pizza", "Rum", "Computer", "Phone", "Beer"],
    });
  };
  return (
    <>
      <h1>{name}</h1>
      <p>
        <b>
          {student?.name} {student?.surname}
          <br></br>
          {student?.age} {student?.nationality} {student?.things}
        </b>
      </p>
      <button onClick={addStudent}> Add Person</button>
    </>
  );
};

export default Home;
