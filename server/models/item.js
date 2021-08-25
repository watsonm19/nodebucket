/**
 * Title:  Nodebucket - Item Model
 * Author: Mark Watson
 * Date: 20 August 2021
 * Description: The item model for the Nodebucket database.
**/

/**
 * Require statements
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * MongoDB item model
 */
let itemSchema = new Schema({
  text: {type: String}
});

module.exports = itemSchema;
