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
        mensaje: req.body.mensaje,
        dia: new Date().toISOString()
    }
    db.ref('contacts').push(newContact);
    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Asunto: ${newContact.asunto}</li>
            <li>Nombre: ${newContact.nombre}</li>
            <li>Email: ${newContact.email}</li>
            <li>Telefono: ${newContact.telefono}</li>
            <li>Fecha de consulta: ${newContact.dia}</li>
        </ul>
        <p>${newContact.mensaje}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'c1560800.ferozo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jdecima@bergson.com.ar',
            pass: 'Julio1312'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'hola@bergson.com.ar',
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
    res.set('Access-Control-Allow-Origin', '*');
        if (req.method === 'OPTIONS') {
            // Send response to OPTIONS requests
            res.set('Access-Control-Allow-Methods', 'GET');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.set('Access-Control-Max-Age', '3600');
            res.status(204).send('');
          } else {
    
    const newSiniestro = {
        
        afectado: req.body.afectado,
        nombre: req.body.nombre,
        email: req.body.email,
        patente: req.body.patente,
        telefono: req.body.telefono,
        compania: req.body.compania,
        mensaje: req.body.mensaje,
        dia: new Date().toString()
    }
	console.log("New Siniestro: "+newSiniestro)
    db.ref('siniestros').push(newSiniestro);

    contentHTML = `
        <h1>Información de siniestro</h1>
        <ul>
            <li>Afectado: ${newSiniestro.afectado}</li>
            <li>Nombre: ${newSiniestro.nombre}</li>
            <li>Email: ${newSiniestro.email}</li>
            <li>Patente: ${newSiniestro.patente}</li>
            <li>Telefono: ${newSiniestro.telefono}</li>
            <li>Compañia: ${newSiniestro.compania}</li>
            <li>Fecha de consulta: ${newSiniestro.dia}</li>
            
        </ul>
        <p>${newSiniestro.mensaje}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'c1560800.ferozo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jdecima@bergson.com.ar',
            pass: 'Julio1312'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'siniestros@bergson.com.ar',
        subject: 'Formulario de siniestros',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('inserto')

      }
    
});


router.post('/new-contrato', async(req, res) => {
    
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      } else {
    
    const newContrato = {
        empresa:req.body.empresa,
        oferta:req.body.oferta,
        asegura: req.body.asegurado,
        monto:req.body.monto,
        tipo: req.body.tipo,
        cuota: req.body.cuota,
        pago: req.body.pago,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        contacto: req.body.contacto,
        gnc: req.body.gnc,
        nuevo: req.body.nuevo,
        dia: new Date().toString()
    }
    db.ref('contrato').push(newContrato);

    contentHTML = `
        <h1>Solicitud de poliza</h1>
        <ul>
            <li>Empresa: ${newContrato.empresa}</li>
            <li>Oferta: ${newContrato.oferta}</li>
            <li>Asegura: ${newContrato.asegura}</li>
            <li>Monto Asegurado: ${newContrato.monto}</li>
            <li>Tipo: ${newContrato.tipo}</li>
            <li>Precio de cuota:$ ${newContrato.cuota}</li>
            <li>Forma de pago: ${newContrato.pago}</li>
            <li>Nombre: ${newContrato.nombre}</li>
            <li>Apellido: ${newContrato.apellido}</li>
            <li>Email: ${newContrato.email}</li>
            <li>Forma de contacto: ${newContrato.contacto}</li>
            <li>Telefono: ${newContrato.telefono}</li>
            <li>Posee GNC: ${newContrato.gnc}</li>
            <li>Es nuevo: ${newContrato.nuevo}</li>
            <li>Fecha de contratacion: ${newContrato.dia}</li>
            
            
        </ul>
        
    `;

    let transporter = nodemailer.createTransport({
        host: 'c1560800.ferozo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jdecima@bergson.com.ar',
            pass: 'Julio1312'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'ventas@bergson.com.ar',
        subject: 'Formulario de Solicitud de Poliza',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('inserto')

}
    // res.redirect('/siniestros');
});




router.post('/new-asesoria', async(req, res) => {
    
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      } else {
    const newAsesora = {

        empresa:req.body.empresa,
        oferta:req.body.oferta,
        asegura: req.body.asegurado,
        tipo: req.body.tipo,
        cuota: req.body.cuota,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        contacto: req.body.contacto,
        gnc: req.body.gnc,
        nuevo: req.body.nuevo,
        dia: new Date().toString()
    }
    db.ref('asesora').push(newAsesora);

    contentHTML = `
        <h1>Pedido de asesoramiento</h1>
        <ul>

            <li>Empresa: ${newAsesora.empresa}</li>
            <li>Oferta: ${newAsesora.oferta}</li>
            <li>Asegura: ${newAsesora.asegura}</li>
            <li>Tipo: ${newAsesora.tipo}</li>
            <li>Precio de cuota:$ ${newAsesora.cuota}</li>           
            <li>Nombre: ${newAsesora.nombre}</li>
            <li>Apellido: ${newAsesora.apellido}</li>
            <li>Email: ${newAsesora.email}</li>
            <li>Forma de contacto: ${newAsesora.contacto}</li>
            <li>Telefono: ${newAsesora.telefono}</li>
            <li>Posee GNC: ${newAsesora.gnc}</li>
            <li>Es nuevo: ${newAsesora.nuevo}</li>
            <li>Fecha consulta: ${newAsesora.dia}</li>
            
            
        </ul>
        
    `;

    let transporter = nodemailer.createTransport({
        host: 'c1560800.ferozo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'jdecima@bergson.com.ar',
            pass: 'Julio1312'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Bergson Seguros" <hola@bergson.com.ar>', // sender address,
        to: 'ventas@bergson.com.ar',
        subject: 'Formulario de Asesoramiento',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.send('inserto')

      }
    // res.redirect('/siniestros');
});



router.post('/new-cotiza', async(req, res) => {
    
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
      } else {
    
    const newCotizaPre = {
        
        modelo: req.body.modelo,
        version: req.body.version,
        ano: req.body.ano,
        marca: req.body.marca,
        gnc: req.body.gnc,
        nuevo: req.body.nuevo,
        cp: req.body.cp,
        dia:new Date().toString()
        
    }

    

    db.ref('cotizaPrev').push(newCotizaPre);
    
    contentHTML = `
        <h1>Informacion de Cotizacion previa</h1>
        <h3>Todo cliente que haya iniciado el formulario</h3>
        <ul>
            <li>Marca: ${newCotizaPre.marca}</li>
            <li>Modelo: ${newCotizaPre.modelo}</li>
            <li>Version: ${newCotizaPre.version}</li>
            <li>Año: ${newCotizaPre.ano}</li>
            <li>Posee Gnc: ${newCotizaPre.gnc}</li>
            <li>Es Nuevo: ${newCotizaPre.nuevo}</li>
            <li>Codigo Postal: ${newCotizaPre.cp}</li>
            <li>Fecha de consulta: ${newCotizaPre.dia}</li>
        </ul>
        
    `;


    let transporter = nodemailer.createTransport({
        host: 'c1560800.ferozo.com',
        port: 465,
        secure: true,
        auth: {
            user: 'Jdecima@bergson.com.ar',
            pass: 'Julio1312'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Bergson" <hola@bergson.com.ar>', // sender address,
        to: 'ventas@bergson.com.ar',
        subject: 'Formulario de Cotizacion previa',
        // text: 'Hello World'
        html: contentHTML
    })

      }
   
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
