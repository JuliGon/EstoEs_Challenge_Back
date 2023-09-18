const { ProjectManager } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todos los project managers
const getAllPMs = async (req, res, next) => {
	try {
		const pms = await ProjectManager.findAll();

		if (pms.length === 0) {
			const error = new Error("Project Managers not found");
			error.status = 404;
			throw error;
		}

		res.json(pms);
	} catch (error) {
		next(error);
	}
};

// Función para obtener un pm por su ID
const getPMById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const pm = await ProjectManager.findByPk(id);

		if (!pm) {
			const error = new Error("PM not found");
			error.status = 404;
			throw error;
		}
		res.json(pm);
	} catch (error) {
		next(error);
	}
};

// Función para crear un pm
const createPM = async ({ name, image }) => {
	const existingPM = await ProjectManager.findOne({
		where: { name: { [Op.iLike]: `%${name}%` } },
	});

	if (existingPM) {
		const error = new Error("The PM already exists");
		error.status = 404;
		throw error;
	}

	const newPM = await ProjectManager.create({
		name: name,
		image: image,
	});

	return newPM;
};

// Función para eliminar un pm por su ID
const deletePM = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedPM = await ProjectManager.destroy({
			where: { id: id },
		});
		if (deletedPM === 0) {
			const error = new Error("PM not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "PM successfully deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllPMs,
	getPMById,
	createPM,
	deletePM
};