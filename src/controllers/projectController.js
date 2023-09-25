const { Project } = require("../db");
const { Op } = require("sequelize");

// Función para obtener todos los proyectos
const getAllProjects = async (req, res, next) => {
	try {
		const projects = await Project.findAll();

		if (projects.length === 0) {
			const error = new Error("Projects not found");
			error.status = 404;
			throw error;
		}

		res.json(projects);
	} catch (error) {
		next(error);
	}
};

// Función para buscar un proyecto por su ID
const getProjectById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const project = await Project.findByPk(id);

		if (!project) {
			const error = new Error("Project not found");
			error.status = 404;
			throw error;
		}

		res.json(project);
	} catch (error) {
		next(error);
	}
};

// Función para crear un nuevo proyecto
const createProject = async (req, res, next) => {
	try {
		const { name, description, projectManager, assignedTo, status } = req.body;

		if (!name || !description || !projectManager || !assignedTo || !status) {
			const error = new Error("All fields are required");
			error.status = 400;
			throw error;
		}
		
		const existingProject = await Project.findOne({
			where: { name: { [Op.iLike]: `%${name}%` } },
		});

		if (existingProject) {
			const error = new Error("The project already exists");
			error.status = 409;
			throw error;
		}

		const newProject = await Project.create({
			name: name,
			description: description,
			projectManager: projectManager,
			assignedTo: assignedTo,
			status: status,
		});

		res.status(201).json(newProject);
	} catch (error) {
		next(error);
	}
};


// Función para eliminar un proyecto por su ID
const deleteProject = async (req, res, next) => {
	const { id } = req.params;
	try {
		const deletedProject = await Project.destroy({
			where: { id: id },
		});
		if (deleteProject === 0) {
			const error = new Error("Project not found");
			error.status = 404;
			throw error;
		}
		res.json({ message: "Project successfully deleted" });
	} catch (error) {
		next(error);
	}
};

// Función para actualizar un proyecto por su ID
const updateProject = async (req, res, next) => {
	const { id } = req.params;
	const { name, description, projectManager, assignedTo, status } = req.body;

	try {
		const project = await Project.findByPk(id);

		if (!project) {
			const error = new Error("Project not found");
			error.status = 404;
			throw error;
		}

		await project.update({
			name: name,
			description: description,
			projectManager: projectManager,
			assignedTo: assignedTo,
			status: status,
		});

		const updatedProject = await Project.findOne({
			where: { name: name },
		});

		res.json(updatedProject);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllProjects,
	getProjectById,
	createProject,
	updateProject,
	deleteProject,
};
