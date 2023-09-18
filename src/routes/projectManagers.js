const express = require("express");
const router = express.Router();
const projectManagerController = require("../utils/projectManagerController")

/**
 * @swagger
 * tags:
 *   name: ProjectManager
 *   description: PM management
 * components:
 *  schemas:
 *   ProjectManager:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: PM name
 *      image:
 *        type: text
 *        description: PM image
 *    required:
 *      - name
 *      - image
 *    example:
 *      name: PM name
 *      image: https://example.com/image.png
 */


/**
 * @swagger
 * /api/projectmanagers/{id}:
 *   get:
 *     summary: Get a PM by ID
 *     tags: [ProjectManager]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: PM identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: PM obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectManager'
 *       '404':
 *         description: PM not found
 */

// Ruta para obtener un PM por su ID 
router.get("/:id", projectManagerController.getPMById);

/**
 * @swagger
 * /api/projectmanagers:
 *   get:
 *     summary: Get all PMs
 *     tags: [ProjectManager]
 *     responses:
 *       '200':
 *         description: PMs obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectManager'
 *       '404':
 *         description: No PMs found
 */

// Ruta para obtener todos los project managers
router.get("/", projectManagerController.getAllPMs);

/**
 * @swagger
 * /api/projectmanagers:
 *   post:
 *     summary: Create a new PM
 *     tags: [ProjectManager]
 *     requestBody:
 *       description: PM to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectManager'
 *     responses:
 *       '201':
 *         description: PM created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectManager'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear un nuevo pm
router.post("/", projectManagerController.createPM);

/**
 * @swagger
 * /api/projectmanagers/{id}:
 *   delete:
 *     summary: Delete a PM by ID
 *     tags: [ProjectManager]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: PM identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: PM deleted successfully
 *       '404':
 *         description: PM not found
 */

// Ruta para eliminar un PM por su ID
router.delete("/:id", projectManagerController.deletePM);

module.exports = router;