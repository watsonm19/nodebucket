/**
 * Title:  Nodebucket - Employee API
 * Author: Mark Watson
 * Date: 20 August 2021
 * Description: The database query logic for finding employees.
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
  }
  // catch errors and log errors to the console
  catch (e) {
    console.log(e);
    res.status(500).send({
      message: 'Internal server error ' + e.message
    })
  }
})

module.exports = router;
