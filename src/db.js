import pg from 'pg';
const {Pool} = pg;

export const pool = new Pool({
    user: "postgres",
    password: "2021",
    host: "localhost",
    port: 5432,
    database: "companydb",
});

pool.connect((err, cliente , release)=>{
  if (err) {
    return console.log("error al conectar:", err);
  }
  console.log("conexion exitosa a la base de datos");

  // release(); // Libera el cliente de la conexión
  // pool.end(); // Cierra el pool de conexiones
  
});

 export default  pool;
