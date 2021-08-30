/**
 * Title:         Nodebucket - App Module
 * Author:        Mark Watson
 * Date:          29 August 2021
 * Description:   API for retrieving employee data and creating tasks.
**/

/**
 * Require statements
 */
const express = require('express');
const Employee = require('../models/employee');

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

module.exports = router;
