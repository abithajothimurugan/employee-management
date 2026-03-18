import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const AddEmployee = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const API = "http://localhost:5000/api/emp"

    const [formData, setFormData] = useState({
        EmployeeName: "",
        EmployeeID: "",
        Department: "",
        Designation: "",
        Project: "",
        Type: "",
        Status: ""
    })

    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState("")
    const [isEdit, setIsEdit] = useState(false)

    const [errorMsg, setErrorMsg] = useState("");

    const goBack = () => {
        navigate('/')
    }

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImageFile(file)

        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    // 🔥 Fetch data for edit
    useEffect(() => {
        if (id) {
            setIsEdit(true)

            axios.get(`${API}/${id}`)
                .then(res => {
                    const data = res.data.data

                    setFormData({
                        EmployeeName: data.EmployeeName,
                        EmployeeID: data.EmployeeID,
                        Department: data.Department,
                        Designation: data.Designation,
                        Project: data.Project,
                        Type: data.Type,
                        Status: data.Status
                    })

                    // existing image preview
                    setPreview(`http://localhost:5000${data.image}`)
                })
                .catch(err => console.log(err))
        }
    }, [id])

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (
            !formData.EmployeeName ||
            !formData.EmployeeID ||
            !formData.Department ||
            !formData.Designation ||
            !formData.Type ||
            !formData.Status ||
            (!isEdit && !imageFile)
        ) {
            setErrorMsg("All fields are required");
            return;
        }

        setErrorMsg(""); // clear error

        const data = new FormData()

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key])
        })

        if (imageFile) {
            data.append("image", imageFile)
        }

        try {

            if (isEdit) {
                await axios.put(`${API}/${id}`, data)
                alert("Employee Updated Successfully")
            } else {
                await axios.post(API, data)
                alert("Employee Added Successfully")
            }

            navigate("/")

        } catch (error) {
            console.log(error.response?.data || error.message)
        }
    }

    return (
        <>
            {/* Header */}
            <div className="addEmp-header">
                <i className="fa-solid fa-angle-left" onClick={goBack}></i>
                <h2>{isEdit ? "Update Employee" : "Add New Employee"}</h2>
            </div>

            {/* Section Title */}
            <div className='addEmp-head'>
                <i className="fa-solid fa-user"></i>
                <h2>Personal Information</h2>
            </div>

            {/* Form */}
            <div className="addEmp-form">
                <form onSubmit={handleSubmit}>

                    {errorMsg && <p className="form-error">{errorMsg}</p>}

                    {/* Image Upload */}
                    <div className="image-upload-box">
                        <label htmlFor="imageUpload">
                            <div className="upload-placeholder">
                                {preview ? (
                                    <img src={preview} alt="preview" width="90" height="90" style={{ borderRadius: "8px" }} />
                                ) : (
                                    <i className="fa-solid fa-camera"></i>
                                )}
                            </div>
                        </label>

                        <input
                            id="imageUpload"
                            type="file"
                            onChange={handleImageChange}
                            hidden
                        />
                    </div>

                    {/* Form Grid */}
                    <div className="form-grid">

                        <div className="form-group">
                            <label>Name*</label>
                            <input
                                type="text"
                                name="EmployeeName"
                                value={formData.EmployeeName}
                                onChange={handleChange}
                                
                            />
                        </div>

                        <div className="form-group">
                            <label>Employee ID*</label>
                            <input
                                type="number"
                                name="EmployeeID"
                                value={formData.EmployeeID}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Department*</label>
                            <select name="Department" value={formData.Department} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                <option value="Design">Design</option>
                                <option value="Development">Development</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Designation*</label>
                            <select name="Designation" value={formData.Designation} onChange={handleChange} required>
                                <option value="">Select designation</option>
                                <option value="Senior Developer">Senior Developer</option>
                                <option value="Team Lead">Team Lead</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Project</label>
                            <input
                                type="text"
                                name="Project"
                                value={formData.Project}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Type*</label>
                            <select name="Type" value={formData.Type} onChange={handleChange} required>
                                <option value="">Select Type</option>
                                <option value="Office">Office</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Status*</label>
                            <select name="Status" value={formData.Status} onChange={handleChange} required>
                                <option value="">Select Status</option>
                                <option value="Permanent">Permanent</option>
                                <option value="Contract">Contract</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="form-actions">
                        <button type="button" onClick={goBack}>
                            Cancel
                        </button>

                        <button type="submit">
                            {isEdit ? "Update" : "Confirm"}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default AddEmployee