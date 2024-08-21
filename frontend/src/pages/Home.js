import React from "react";
import Tabs from "../components/Tabs";
import Sidebar from "../components/Sidebar";


const Home = () => {
    return (
        <div style={{ height: '100vh', textAlign: 'center', width: '100%', position: "relative" }}>
            <Sidebar />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "350px" }}>
                <Tabs activeItem={"Salad"} />
                <div></div>
            </div>
        </div>
    )
}
export default Home;
