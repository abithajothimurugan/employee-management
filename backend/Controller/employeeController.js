const Employee = require('../Model/employeeModel')
const fs = require("fs");

const createEmployee = async (req, res) => {
    try {

        const { EmployeeName, EmployeeID, Department, Designation, Project, Type, Status } = req.body;

        if (!EmployeeName || !EmployeeID || !Department || !Designation || !Type || !Status) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Employee image is required"
            });
        }

        const employee = new Employee({
            EmployeeName,
            EmployeeID,
            image:`/uploads/${req.file.filename}`,
            Department,
            Designation,
            Project,
            Type,
            Status
        });

        await employee.save();

        res.status(201).json({
            message: "Employee created successfully",
            data: employee
        });

    } catch (error) {

        console.log(error);

        if (error.name === 'ValidationError') {
            let errors = {};
            for (let key in error.errors) {
                errors[key] = error.errors[key].message;
            }
            return res.status(400).json(errors);
        }

        return res.status(500).json({
            message: "Internal server error",
            error
        });
    }
};
const editEmployee = async (req, res) => {
    try {

        const { id } = req.params;

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const updatedData = req.body;

        if (req.files && req.files.length > 0) {

            if (employee.image && employee.image.length > 0) {
                employee.image.forEach(img => {
                    if (fs.existsSync(img)) {
                        fs.unlinkSync(img);
                    }
                });
            }

            const newImages = req.files.map(file => file.path);
            updatedData.image = newImages;
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            updatedData,
            { returnDocument: 'after' }
        );

        res.status(200).json({
            message: "Employee updated successfully",
            data: updatedEmployee
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const delEmp = await Employee.findById(id);

        if (!delEmp) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        if (delEmp.image && fs.existsSync(delEmp.image)) {
            fs.unlinkSync(delEmp.image);
        }

        await Employee.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Employee deleted successfully"
        });


    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

const fetchAllEmployee = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        // SEARCH - match anywhere in product name
        if (search) {
            query.EmployeeName = { $regex: search.trim(), $options: "i" };
        }
        const viewAll = await Employee.find(query)
        return res.status(200).json({ data: viewAll, count: viewAll.length })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

const fetchSingleEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const fetchEmp = await Employee.findById(id)
        return res.status(200).json({ data: fetchEmp })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

module.exports = { fetchAllEmployee, fetchSingleEmployee, deleteEmployee, createEmployee, editEmployee }