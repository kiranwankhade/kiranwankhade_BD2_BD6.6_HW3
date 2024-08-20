let { DataTypes, sequelize } = require("../lib/index");

let employees = sequelize.define("employees", {
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    department: DataTypes.TEXT,
    position: DataTypes.TEXT,
    hire_year: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
});

module.exports = {
    employees,
};
