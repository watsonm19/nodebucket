/**
 * Title:  Nodebucket - Employee Model
 * Author: Mark Watson
 * Date: 29 August 2021
 * Description: Employee model for Nodebucket.
**/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  toDo: Item[];
  done: Item[];
}
