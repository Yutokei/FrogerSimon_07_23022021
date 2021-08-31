import React from "react";
import useAxiosGet from "../../Hook/useAxiosGet";
import AllUsers from "./AllUsers";

const AdminAllProfile = () => {
  const { data } = useAxiosGet("user");

  return (
    <div>
      <ul className="user-list-container">
        {data.map((user) => (
          <AllUsers element={user} key={user.uuid} />
        ))}
      </ul>
    </div>
  );
};

export default AdminAllProfile;
