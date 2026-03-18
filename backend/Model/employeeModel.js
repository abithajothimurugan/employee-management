const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    EmployeeName: {
        type: String,
        required: [true, "Employee name is required"],
        minLength: [3, "Employee name must have at least 3 characters"]
    },

    EmployeeID: {
        type: Number,
        required: [true, "Employee ID is required"]
    },

    image: {
        type: String,
        required: [true, "Profile image is required"]
    },

    Department: {
        type: String,
        required: true,
        enum: ["Design", "Development", "HR"]
    },

    Designation: {
        type: String,
        required: [true, "Designation is required"],
        enum: ["Senior Developer","Team Lead","Manager"]
    },

    Project: {
        type: String,
        required: [true, "Project is required"]
    },

    Type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["Office", "Remote", "Hybrid"]
    },
    Status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["Permanent", "Contract", "Intern"]
    }
},
    {
        timestamps: true
    }
)
module.exports = new mongoose.model('employeeDetail', empSchema);