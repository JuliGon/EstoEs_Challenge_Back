const { Assignment } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todas las asignaciones
const getAllAssignments = async (req, res, next) => {
	try {
		const assignments = await Assignment.findAll();

		if (assignments.length === 0) {
			const error = new Error("Assignments not found");
			error.status = 404;
			throw error;
		}

		res.json(assignments);
	} catch (error) {
		next(error);
	}
};

// Función para obtener una asignación por su ID
const getAssignmentById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const assignment = await Assignment.findByPk(id);

		if (!assignment) {
			const error = new Error("Assignment not found");
			error.status = 404;
			throw error;
		}
		res.json(assignment);
	} catch (error) {
		next(error);
	}
};

// Función para crear una asignación
const createAssignment = async (req, res, next) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      const error = new Error("Name and image are required");
      error.status = 400;
      throw error;
    }

    const existingAssignment = await Assignment.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });

    if (existingAssignment) {
      const error = new Error("The assignment already exists");
      error.status = 409;
      throw error;
    }

    const newAssignment = await Assignment.create({
      name: name,
      image: image,
    });

    return res.status(201).json(newAssignment);
  } catch (error) {
    next(error);
  }
};

// Función para eliminar una asignación por su ID
const deleteAssignment = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedAssignment = await Assignment.destroy({
			where: { id: id },
		});
		if (deletedAssignment === 0) {
			const error = new Error("Assignment not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "Assignment successfully deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllAssignments,
	getAssignmentById,
	createAssignment,
	deleteAssignment,
};