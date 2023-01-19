import { connection } from '../db.js'
import fs from 'fs';

export async function executeScript(filePath) {
  console.log(filePath)
  try {
    // Read the SQL script file
    const sqlScript = await fs.promises.readFile(filePath, 'utf8');
    // Execute the SQL script
    await connection.execute(sqlScript);
    console.log(`SQL Script ${filePath} executed successfully`);
  } catch (error) {
    console.log(`Error executing the script: ${error.stack}`);
  }
}