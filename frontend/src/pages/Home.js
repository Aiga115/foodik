import React from "react";
import Tabs from "../components/Tabs";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        textAlign: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          marginLeft: "250px"
        }}
      >
        <Tabs activeItem={"Salad"} />
        <section className="products" style={{ margin: 0 }}>
          <div className="box-container" style={{ gridTemplateColumns: "auto auto auto" }}>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;
