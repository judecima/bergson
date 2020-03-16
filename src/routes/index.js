const admin = require('firebase-admin')
const nodemailer = require('nodemailer');
// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);

var serviceAccount = require("../../bergson-c7518-firebase-adminsdk-b2zly-36b99e3b9c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bergson-c7518.firebaseio.com/"
});

const db = admin.database();

const { Router}= require('express');
const router = Router();

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('index', {contacts: data})
    });
})

router.get('/siniestros', (req, res) => {
    db.ref('siniestros').once('value', (snapshot) => {
       data = snapshot.val();
       res.render('siniestros', {siniestros: data})
    });
})

router.post('/new-contact', async(req, res) => {
    const newContact = {
        nombre: req.body.nombre,
        email: req.body.email,
        asunto: req.body.asunto,
        telefono: req.body.telefono,
        mensaje: req.body.mensaje
    }
    db.ref('contacts').push(newContact);
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Asunto: ${newContact.asunto}</li>
            <li>Nombre: ${newContact.nombre}</li>
            <li>Email: ${newContact.email}</li>
            <li>Telefono: ${newContact.telefono}</li>
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

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'juliodecima@gmail.com',
        subject: 'Formulario de contactos',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});


router.post('/new-siniestro', async(req, res) => {
console.log("request body: "+req.body.email)

    const newSiniestro = {
        
        afectado: req.body.afectado,
        nombre: req.body.nombre,
        email: req.body.email,
        patente: req.body.patente,
        telefono: req.body.telefono,
        compania: req.body.compania,
        mensaje: req.body.mensaje
    }
	console.log("New Siniestro: "+newSiniestro)
    db.ref('siniestros').push(newSiniestro);

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Afectado: ${newSiniestro.afectado}</li>
            <li>Nombre: ${newSiniestro.nombre}</li>
            <li>Email: ${newSiniestro.email}</li>
            <li>Telefono: ${newSiniestro.patente}</li>
            <li>Telefono: ${newSiniestro.telefono}</li>
            <li>Telefono: ${newSiniestro.compania}</li>
            
        </ul>
        <p>${newSiniestro.mensaje}</p>
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

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'juliodecima@gmail.com',
        subject: 'Formulario de siniestros',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');


    // res.redirect('/siniestros');
});

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove();
    res.redirect('/');
});

router.get('/delete-siniestros/:id', (req, res) => {
    db.ref('siniestros/' + req.params.id).remove();
    res.redirect('/siniestros');
});

module.exports = router;
