import { /*Enzyme,*/ shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Layout from "../Layout";

// Enzyme.configure({ adapter: new Adapter() });

describe("Render Layout component", () => {
  it("renders without crashing", () => {
    shallow(<Layout />);
  });
});
