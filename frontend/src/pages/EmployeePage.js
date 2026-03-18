

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeePage = () => {

    const navigate = useNavigate();
    const API = "http://localhost:5000/api/emp";

    const [employees, setEmployees] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [search, setSearch] = useState("");


    // Fetch employees
    const fetchEmployees = async (searchText = "") => {
        try {
            const res = await axios.get(`${API}?search=${searchText}`);
            setEmployees(res.data.data);
        } catch (error) {
            console.log("Error fetching employees");
        }
    };

    useEffect(() => {
        fetchEmployees(search);
    }, [search]);

    // Open delete popup
    const openDeletePopup = (id) => {
        setDeleteId(id);
        setShowDelete(true);
    };

    // Confirm delete
    const confirmDelete = async () => {
        try {
            await axios.delete(`${API}/${deleteId}`);
            fetchEmployees();
            setShowDelete(false);
        } catch (error) {
            console.log("Delete failed");
        }
    };

    return (
        <>
            {/* Header */}
            <div className="AddEmployee-head-content">
                <h3>Employee</h3>

                <div className="employee-controls">

                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="search"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button className="add-btn" onClick={() => navigate("/addemp")}>
                        <i className="fa-solid fa-circle-plus"></i>
                        Add New Employee
                    </button>

                </div>
            </div>

            {/* Table */}
            <div className="employee-table">

                <table>

                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Project</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.length === 0 ? (

                            <tr>
                                <td colSpan="8" className="no-data-cell">
                                    <p>
                                        {search ? "No matching employees found" : "No records found"}
                                    </p>
                                </td>
                            </tr>

                        ) : (

                            employees.map((emp) => (

                                <tr key={emp._id}>

                                    <td className="emp-name">
                                        <img
                                            src={`http://localhost:5000${emp.image}`}
                                            alt="emp"
                                            width="40"
                                        />
                                        {emp.EmployeeName}
                                    </td>

                                    <td>{emp.EmployeeID}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.Designation}</td>
                                    <td>{emp.Project}</td>
                                    <td>{emp.Type}</td>
                                    <td>{emp.Status}</td>

                                    <td className="action-icons">

                                        <i
                                            className="fa-regular fa-eye"
                                            onClick={() => navigate(`/view/${emp._id}`)}
                                        ></i>

                                        <i
                                            className="fa-regular fa-pen-to-square"
                                            onClick={() => navigate(`/edit/${emp._id}`)}
                                        ></i>

                                        <i
                                            className="fa-regular fa-trash-can"
                                            onClick={() => openDeletePopup(emp._id)}
                                        ></i>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {/* Delete Popup */}
            {showDelete && (

                <div className="delete-popup">

                    <div className="popup-box">

                        <i className="fa-solid fa-trash popup-icon"></i>

                        <h3>Are you sure you want to delete?</h3>

                        <div className="popup-actions">
                            <button className="cancel-btn" onClick={() => setShowDelete(false)}>
                                Cancel
                            </button>

                            <button className="confirm-btn" onClick={confirmDelete}>
                                Yes
                            </button>
                        </div>

                    </div>

                </div>

            )}

        </>
    );
};

export default EmployeePage;