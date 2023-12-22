import React from "react";

const Home = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const user_name = userInfo?.name;

  return (
    <div className="home">
      <div className="border p-4 mb-4 rounded">
        <h2>Hello <span> {user_name} </span> this your home</h2>
      </div>
    </div>
  );
};

export default Home;
