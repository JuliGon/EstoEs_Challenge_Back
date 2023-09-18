const express = require("express");
const router = express.Router();
const assignmentController = require("../utils/assignmentController")

/**
 * @swagger
 * tags:
 *   name: Assignment
 *   description: Assignment management
 * components:
 *  schemas:
 *   Assignment:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: Assignment name
 *      image:
 *        type: text
 *        description: Assignment image
 *    required:
 *      - name
 *      - image
 *    example:
 *      name: Assignment name
 *      image: https://example.com/image.png
 */


/**
 * @swagger
 * /api/assignments/{id}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignment]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Assignment identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Assignment obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       '404':
 *         description: Assignment not found
 */

// Ruta para obtener una asignación por su ID 
router.get("/:id", assignmentController.getAssignmentById);

/**
 * @swagger
 * /api/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignment]
 *     responses:
 *       '200':
 *         description: Assignments obtained successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       '404':
 *         description: No assignments found
 */

// Ruta para obtener todas las asignaciones
router.get("/", assignmentController.getAllAssignments);

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignment]
 *     requestBody:
 *       description: Assignment to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       '201':
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       '400':
 *         description: Invalid data format
 */

// Ruta para crear una nueva asignación
router.post("/", assignmentController.createAssignment);

/**
 * @swagger
 * /api/assignments/{id}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [Assignment]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Assignment identifier
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Assignment deleted successfully
 *       '404':
 *         description: Assignment not found
 */

// Ruta para eliminar una asignación por su ID
router.delete("/:id", assignmentController.deleteAssignment);

module.exports = router;