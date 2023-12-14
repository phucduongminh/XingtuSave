import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Plans } from '../models/Plans';
import { AddPlans } from '../models/Plans';

const tableName = 'plans';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'xingtu.db', location:'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS "${tableName}"(
    "category_id"	INTEGER NOT NULL,
    "category_name"	INTEGER NOT NULL,
    "money"	INTEGER NOT NULL,
    PRIMARY KEY("category_id" AUTOINCREMENT)
    );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<Plans[]> => {
  try {
    const todoItems: Plans[] = [];
    const results = await db.executeSql(`SELECT category_id,category_name,money  FROM ${tableName};`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItems: AddPlans[]) => {
  const insertQuery =
    `INSERT INTO ${tableName}(category_name, money) values` +
    todoItems.map(i => `('${i.category}', ${i.money})`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where category_id = ${id};`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName};`;

  await db.executeSql(query);
};