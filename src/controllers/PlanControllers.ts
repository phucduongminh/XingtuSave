import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Plans } from '../models/Plans';
import { AddPlans } from '../models/AddPlans';

const tableName = 'plans';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'xingtu-123.sqlite', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      category_name	TEXT,
      money	INTEGER
    );`;

  await db.executeSql(query);
};

export const getTodoPlans = async (db: SQLiteDatabase): Promise<Plans[]> => {
  try {
    const todoPlans: Plans[] = [];
    const results = await db.executeSql(`SELECT rowid as id,category_name,money  FROM ${tableName};`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoPlans.push(result.rows.item(index))
      }
    });
    return todoPlans;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoPlans !!!');
  }
};

export const saveTodoPlans = async (db: SQLiteDatabase, todoPlans: AddPlans[]) => {
  const insertQuery =
    `INSERT INTO ${tableName}(category_name, money) values` +
    todoPlans.map(i => `('${i.category}', ${i.money})`).join(';');

  return db.executeSql(insertQuery);
};

export const deleteTodoPlan = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id};`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName};`;

  await db.executeSql(query);
};