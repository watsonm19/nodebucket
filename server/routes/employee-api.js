/**
 * Title:         Nodebucket - App Module
 * Author:        Mark Watson
 * Date:          4 September 2021
 * Description:   API for retrieving employee data and performing CRUD operations on tasks.
**/

/**
 * Require statements
 */
const express = require('express');
const Employee = require('../models/employee');
const BaseResponse = require('../models/base-response');

const router = express.Router();

/**
 * Get employee by empId
 */
router.get('/:empId', async (req, res) => {
  // find one employee by id
  try {
    Employee.findOne({ empId: req.params.empId }, function(err, employee) {
      // if unable to find employee or there's a database error - log error and send an error message
      if (err) {
        console.log(err);
        res.status(500).send({
          message: 'MongoDB server error: ' + err.message
        })
        // if employee is found - log employee and show employee object
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
    // catch errors and log errors to the console
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Internal server error ' + e.message
    })
  }
});

/**
 * Get all tasks for employee
 */
 router.get('/:empId/tasks', async (req, res) => {
  try {
    // find employee record
    Employee.findOne({empId: req.params.empId}, 'empId toDo done', function (err, employee) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: 'MongoDB server error: ' + err.message,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
    // catch errors and log to the console
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Internal server error: ' + e.message,
    });
  }
});

/**
 * Create a task for the employee
 */
router.post('/:empId/tasks', async(req, res) => {
  // find employee record
  try {
    Employee.findOne({empId: req.params.empId}, function(err, employee){
      if (err) {
        console.log(err);
        res.status(501).send({
          message: 'MongoDB Exception: ' + err.message
        })
      } else {
          console.log(employee);

          // created task
          const newTask = {
            text: req.body.text
          };

          // adds toDo to list
          employee.toDo.push(newTask);
          // saves record
          employee.save(function(err, updatedEmployee) {
            if (err) {
              console.log(err);
              res.status(501).send({
                message: 'MongoDB Exception: ' + err.message
              })
            } else {
              console.log(updatedEmployee);
              // updates employee record
              res.json(updatedEmployee);
            }
        })
      }
    })
    // catch errors and log to the console
  } catch(e) {
    console.log(e);
    res.status(500).send({
      message: 'Internal server error: ' + e.message
    })
  }
})

/**
 * Update a task
 */
router.put('/:empId/tasks', async (req, res) => {
  try {
    // find the employee record
    Employee.findOne({'empId': req.params.empId}, function(err,employee) {
      // 
      if (err) {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(updateTaskServerErrorResponse.toObject());
      } else {
        console.log(employee);

        // set the toDo and done tasks
        employee.set({
          toDo: req.body.toDo,
          done: req.body.done
        })

        // save the updated tasks
        employee.save(function(err, updatedEmployee) {
          if (err) {
            console.log(err);  
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse('501', 'Mongo server error', err);
            res.status(501).send(updateTaskServerErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskSuccessRate  = new BaseResponse('200', 'Update successful', updatedEmployee);
            res.status(200).send(updatedTaskSuccessRate.toObject());
            }
        })
      }
    })
  } catch(e) {
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal server error', e);
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
})

/**
 * deleteTask API
 */
router.delete('/:empId/tasks/:taskId', async (req, res) => {
  try {
    // find the employee record
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {
      if (err) {
        console.log(err);

        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);

        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);

        // find the item in the array
        const toDoItem = employee.toDo.find((item) => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find((item) => item._id.toString() === req.params.taskId);

        if (toDoItem) {
          // remove the record from the array if item is found
          employee.toDo.id(toDoItem._id).remove();
          // save the updated employee record
          employee.save(function (err, updatedToDoItemEmployee) {
            if (err) {
              console.log(err);
              const deleteToDoItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteToDoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedToDoItemEmployee);
              const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Item removed from the toDo array', updatedToDoItemEmployee);
              res.status(200).send(deleteToDoItemSuccessResponse.toObject());
            }
          });
        } else if (doneItem) {
          // remove the item from the done array
          employee.done.id(doneItem._id).remove();
          // save the updated employee record
          employee.save(function (err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status (501).send(deleteDoneItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item removed from the done array', updatedDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          });
        } else {
          console.log('Invalid taskId' + req.params.taskId);
          const deleteTasksNotFoundResponse = new BaseResponse('300', 'Unable to locate the requested resources', req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const deleteTaskServerError= new BaseResponse('500','Internal server error', e);
    res.status(500).send(deleteTaskServerError.toObject());
  }
})

module.exports = router;
