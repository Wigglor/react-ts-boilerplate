import { /*Enzyme,*/ shallow } from "enzyme";
import toJson from "enzyme-to-json";
// import Adapter from "enzyme-adapter-react-16";
import React from "react";
import Layout from "../Layout";

// Enzyme.configure({ adapter: new Adapter() });

describe("Render Layout component", () => {
  it("renders without crashing", () => {
    shallow(<Layout />);
  });

  it("check for jsx elements", () => {
    const wrapper = shallow(<Layout />);
    const sidebar = <div className="sidebar"></div>;
    // const value = wrapper.find("h2").text();
    expect(wrapper.contains("Visualization")).toEqual(true);
    // expect(value).toEqual("hej");
  });

  it("renders correctly", () => {
    const tree = shallow(<Layout />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
