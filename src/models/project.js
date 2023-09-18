const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Project = sequelize.define(
		"Project",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			description: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
			projectManager: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "ProjectManagers",
					key: "id",
				},
			},
			assignedTo: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: {
					model: "Assignments",
					key: "id",
				},
			},
			status: {
				allowNull: false,
				type: DataTypes.STRING,
			},
		},
		{ timestamps: false }
	);

	return Project;
};