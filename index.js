const functions = require('firebase-functions');
const admin=require('firebase-admin')
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.getContactos = functions.https.onRequest((request, response) => {
    admin.firestore().collection('contactos').get()
        .then(data=>{
            let contactos=[]
            data.forEach(doc =>{
                contactos.push(doc.data())
            });
            return response.json(contactos)
        })
     .catch((err)=>console.error(err))

    });

    // insertar contactos
    exports.createContactos = functions.https.onRequest((request, response) => {
        const newContacto={

            asunto:request.body.asunto,
            nombre:request.body.nombre,
            email:request.body.email,
            telefono:request.body.telefono,
            mensaje:request.body.mensaje,
            acceso:admin.firestore.Timestamp.fromDate(new Date())


        }
        response.set('Access-Control-Allow-Origin', '*');
        if (request.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            response.set('Access-Control-Allow-Methods', 'GET');
            response.set('Access-Control-Allow-Headers', 'Content-Type');
            response.set('Access-Control-Max-Age', '3600');
            response.status(204).send('');
          } else {
            admin
            .firestore()
            .collection('contactos')
            .add(newContacto)
            .then((doc)=>{
                response.json({message:`document ${doc.id} creado correctamente`})
    
            })
            .catch((err)=>{
                response.status(500).json({error:'algo anda mal'});
                console.error(err);            
            })
            
            
            
          }
        
    
        });

        exports.enviarEmail = functions.https.onRequest((req, res) => {
            cors(req, res, () => {
              
                const newContact = {
                    nombre: req.body.nombre,
                    email: req.body.email,
                    asunto: req.body.asunto,
                    telefono: req.body.telefono,
                    mensaje: req.body.message
                }
                
                
                contentHTML = `
                    <h1>Informacion de consulta</h1>
                    <ul>
                        <li>Asunto: ${newContact.asunto}</li>
                        <li>Nombre: ${newContact.nombre}</li>
                        <li>Email: ${newContact.email}</li>
                        <li>Telefono de contacto: ${newContact.telefono}</li>
                        
                    </ul>
                    <p>${newContact.mensaje}</p>
                `;
            
                let transporter = nodemailer.createTransport({
                    host: 'c1560800.ferozo.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'hola@bergson.com.ar',
                        pass: 'Santiago1312'
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
            
                let info = transporter.sendMail({
                    from: '"Bergson" <hola@bergson.com.ar>', // sender address,
                    to: 'hola@bergson.com.ar',
                    subject: 'Formulario de consultas',
                    // text: 'Hello World'
                    html: contentHTML
                })

                
              
            });
          });