const express=require('express');
const router= express.Router();

const mysqlConnection= require('../database');

router.get('/',(req,res)=>{
    res.send("Bienvenido al sistema de empleados de la empresa DPC Envases Plásticos");
});

router.get('/empleados',(req,res)=>{
    mysqlConnection.query('SELECT * FROM empleados', (error, rows, fields)=>{
        if(error)throw error;
        if(rows.length>0){
            res.json(rows);
        }
        else{
            res.send('No existen registros a mostrar');
        }
    });
});
router.get('/empleados/:id',(req,res)=>{
    const {id}= req.params;
    mysqlConnection.query(`SELECT * FROM empleados WHERE id= ${id}`,(error,rows,fields)=>{
        if(error)throw error;
        if(rows.length>0){
            res.json(rows[0]);
        }else{
            res.send(`El empleado ${id} no existe`);
        }
    });
});

router.post('/empleados',(req,res)=>{
    const id=0;
    const {nombre,salario}=req.body;
    const query=`CALL empleadoAgregarOEditar(?,?,?);`;
    mysqlConnection.query(query,[id,nombre,salario], (error)=>{
        if (error)throw error;
        res.send('Empleado creado exitosamente');
    });
});

router.put('/empleados/:id',(req,res)=>{
    const {id}= req.params;
    const {nombre, salario}=req.body;
    const query=`CALL empleadoAgregarOEditar(?,?,?);`;
    
    mysqlConnection.query(`SELECT * FROM empleados WHERE id= ${id}`,(error,rows)=>{  //comprueba si existe el empleado
        if(error)throw error;
            if(rows.length>0){
                mysqlConnection.query(query,[id,nombre,salario],(error,rows)=>{
                    if(error)throw error;
                    res.send(`Empleado ${id} modificado correctamente`);
                });
            }                     
            else{
              res.send(`El empleado ${id} no existe para modificar`);
            }         
    });
});

router.delete('/empleados/:id',(req,res)=>{
    const {id}= req.params;
    mysqlConnection.query(`SELECT * FROM empleados WHERE id = ${id}`,(error,rows)=>{
        if(error)throw error;
            if(rows.length>0){
                mysqlConnection.query(`DELETE FROM empleados WHERE id= ${id}`,(error)=>{
                    if(error)throw error;
                    res.send(`Empleado ${id} eliminado correctamente`);
                });
            }else{
                res.send(`ALERTA => El empleado ${id} no existe para eliminar`);
              }   

    });

   
});
module.exports= router;