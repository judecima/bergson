const admin = require('firebase-admin')
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
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

    

     res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.set('Access-Control-Max-Age', '3600');
            res.status(204).send('');
          } else {
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
    res.send('inserto')
    // res.redirect('/success.html');
    }

});


router.post('/new-siniestro', async(req, res) => {
    const newSiniestro = {
        
        afectado: req.body.afectado,
        nombre: req.body.nombre,
        email: req.body.email,
        patente: req.body.patente,
        telefono: req.body.telefono,
        compania: req.body.compania,
        mensaje: req.body.mensaje
    }
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


router.post('/new-contrato', async(req, res) => {
    const newContrato = {
        
        tipo: req.body.tipo,
        cuota: req.body.cuota,
        pago: req.body.pago,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        contacto: req.body.contacto
    }
    db.ref('contrato').push(newContrato);

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Afectado: ${newContrato.nombre}</li>
            <li>Nombre: ${newContrato.apellido}</li>
            <li>Email: ${newContrato.email}</li>
            <li>Telefono: ${newContrato.contacto}</li>
            <li>Telefono: ${newContrato.telefono}</li>
            
            
        </ul>
        
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
        subject: 'Formulario de Asesoramiento',
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




router.post('/new-asesoria', async(req, res) => {
    const newAsesora = {
        
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        contacto: req.body.contacto
    }
    db.ref('asesora').push(newAsesora);

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Afectado: ${newAsesora.nombre}</li>
            <li>Nombre: ${newAsesora.apellido}</li>
            <li>Email: ${newAsesora.email}</li>
            <li>Telefono: ${newAsesora.contacto}</li>
            <li>Telefono: ${newAsesora.telefono}</li>
            
            
        </ul>
        
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
        subject: 'Formulario de Asesoramiento',
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



router.post('/new-cotiza', async(req, res) => {
    const newCotizaPre = {
        
        modelo: req.body.modelo,
        version: req.body.version,
        ano: req.body.ano,
        marca: req.body.marca,
        gnc: req.body.gnc,
        cp: req.body.cp,
        
    }

    

    db.ref('cotizaPrev').push(newCotizaPre);
    console.log('a ver'+newCotizaPre)
    contentHTML = `
        <h1>Informacion de Cotizacion previa</h1>
        <ul>
            <li>Afectado: ${newCotizaPre.marca}</li>
            <li>Nombre: ${newCotizaPre.modelo}</li>
            <li>Email: ${newCotizaPre.ano}</li>
            <li>Telefono de contacto: ${newCotizaPre.version}</li>
            <li>Patente: ${newCotizaPre.gnc}</li>
            <li>Compañia: ${newCotizaPre.cp}</li>
        </ul>
        
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
        from: '"Bergson" <hola@bergson.com.ar>', // sender address,
        to: 'juliodecima@gmail.com',
        subject: 'Formulario de Cotizacion previa',
        // text: 'Hello World'
        html: contentHTML
    })


   
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