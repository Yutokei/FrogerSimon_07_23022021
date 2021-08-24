import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosGet from "../../Hook/useAxiosGet";
import { AuthContext } from "../../auth/AuthContext";
import AllUsers from "./AllUsers";


const AdminAllProfile = () => {
  const { data, loading, error } = useAxiosGet("user")

  return (
    <div>
      <ul>
        {data.map((user, key) => (
            <AllUsers element={user} mappingKey={key}/>
        ))}
      </ul>
    </div>
  );
};

export default AdminAllProfile;
