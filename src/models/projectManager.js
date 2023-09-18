const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const ProjectManager = sequelize.define(
		"ProjectManager",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			image: {
				allowNull: false,
				type: DataTypes.TEXT,
			},
		},
		{ timestamps: false }
	);

	return ProjectManager;
};