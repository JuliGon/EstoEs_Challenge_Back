const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController"); 

/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 * components:
 *  schemas:
 *   Project:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Project name
 *      description:
 *        type: text
 *        description: Project description
 *      projectManager:
 *        type: integer
 *        description: Project PM
 *      assignedTo:
 *        type: integer
 *        description: Project assignment
 *      status:
 *        type: string
 *        description: Project status
 *    required:
 *      - name
 *      - description
 *      - projectManager
 *      - assignedTo
 *      - status
 *    example:
 *      name: Project example
 *      description: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
 *      projectManager: 1
 *      assignedTo: 1
 *      status: Enabled
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Project obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '404':
 *         description: Project not found
 */

// Ruta para obtener un proyecto por su ID
router.get("/:id", projectController.getProjectById);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       '200':
 *         description: Projects obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '404':
 *         description: No projects found
 */

// Ruta para obtener todos los proyectos
router.get("/", projectController.getAllProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       description: Project to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '201':
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear un nuevo proyecto
router.post("/", projectController.createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Project deleted successfully
 *       '404':
 *         description: Project not found
 */

// Ruta para eliminar un proyecto por su ID
router.delete("/:id", projectController.deleteProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Project]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Project identifier
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated project data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: Project updated successfully
 *       '404':
 *         description: Project not found
 */

// Ruta para actualizar un proyecto por su ID
router.put("/:id", projectController.updateProject);

module.exports = router;