/**
 * Title:  Nodebucket - Emoloyee Model
 * Author: Mark Watson
 * Date: 20 August 2021
 * Description: The employee model for the Nodebucket database.
**/

/**
 * Require statements
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * MongoDB employee model
 */
let employeeSchema = new Schema({
  empId:     {type: String, unique: true},
  firstName: {type: String},
  lastName:  {type: String},
}, {collection: 'employees'})

module.exports =  mongoose.model('Employee', employeeSchema);
