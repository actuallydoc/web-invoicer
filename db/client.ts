import mysql from 'mysql2/promise';


export async function dbconnecton() {
    await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webinvoicer'
    });
}

//Export it as default
export default dbconnecton;