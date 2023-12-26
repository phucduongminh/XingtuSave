import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { Spends } from '../models/Spends';
import { AddTrades } from '../models/AddTrades';

const tableName = 'spends';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'xingtu-123.sqlite', location: 'default' });
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      category TEXT,
      money	INTEGER,
      image	TEXT,
      description TEXT,
      date TEXT,
      income number
    );`;

  await db.executeSql(query);
};

export const getSpendsHistory = async (db: SQLiteDatabase): Promise<Spends[]> => {
  try {
    const newTrades: Spends[] = [];
    const results = await db.executeSql(`SELECT rowid as id,category,money,image,description,date,income  FROM ${tableName};`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        newTrades.push(result.rows.item(index))
      }
    });
    return newTrades;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get TradesHistory !!!');
  }
};

export const saveNewTrade = async (db: SQLiteDatabase, newTrades: AddTrades[]) => {
  try {
  const insertQuery =
    `INSERT INTO ${tableName}(category,money,image,description,date,income) values` +
    newTrades.map(i => `('${i.category}', ${i.money},'${i.image}','${i.description}','${i.date}',${i.income})`).join(';');
  return db.executeSql(insertQuery);
  
} catch (error) {
  console.error(error);
  throw Error('Failed to get TradesHistory !!!');
}
};

export const deleteTrade = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id};`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName};`;

  await db.executeSql(query);
};