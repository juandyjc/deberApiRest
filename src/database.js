const mysql= require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    pasword:'',
    database: 'empresa'
});

mysqlConnection.connect((error)=>{
    if(error)throw error;
    console.log('Conexión exitosa a la base de datos');
});

module.exports=mysqlConnection;
