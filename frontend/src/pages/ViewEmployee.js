import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewEmployee = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const API = "http://localhost:5000/api/emp";

  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {

      const res = await axios.get(`${API}/${id}`);

      setEmployee(res.data.data);

    } catch (error) {
      console.log("Error fetching employee");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (!employee) {
    return <h3>Loading...</h3>;
  }

  return (
    <>

      {/* Header */}
      <div className="addEmp-header">

        <i className="fa-solid fa-angle-left"
          onClick={() => navigate("/")}
        ></i>

        <h2>View Employee Details</h2>

      </div>

      {/* Personal Info Title */}
      <div className="addEmp-head">

        <i className="fa-solid fa-user"></i>
        <h2>Personal Information</h2>

      </div>

      {/* Employee Info */}
      <div className="view-employee-container">

        {/* Image */}
        <div className="emp-image">

          <img
            src={`http://localhost:5000${employee.image}`}
            alt="employee"
            width="120"
          />

        </div>

        {/* Details */}
        <div className="employee-details">

          <div className="detail-row">
            <span>Name</span>
            <p>{employee.EmployeeName}</p>
          </div>

          <div className="detail-row">
            <span>Employee ID</span>
            <p>{employee.EmployeeID}</p>
          </div>

          <div className="detail-row">
            <span>Department</span>
            <p>{employee.Department}</p>
          </div>

          <div className="detail-row">
            <span>Designation</span>
            <p>{employee.Designation}</p>
          </div>

          <div className="detail-row">
            <span>Project</span>
            <p>{employee.Project}</p>
          </div>

          <div className="detail-row">
            <span>Type</span>
            <p>{employee.Type}</p>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <p>{employee.Status}</p>
          </div>

        </div>

      </div>

    </>
  );
};

export default ViewEmployee;