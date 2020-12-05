const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('./models/orcamento');
const Orcamento = mongoose.model('Orcamento');

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o BD MongoDB realizado com sucesso!");
}).catch((err) => {
    console.log("Erro Conexão com o BD MongoDB não realizado com sucesso: " + err);
});
    

app.post('/orcamento', async (req, res) => {
    await Orcamento.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Solicitação de orçamento não enviada com sucesso!"
        });
    });

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "136ac4e6bbb786", 
          pass: "ff504d24f123cd", 
        },
      });

    var emailHtml = 'Prezado(a),<br><br> Recebi a solicitação de orçamento. <br><br>Em breve será encaminhado o orçamento<br><br>';
    var emailTexto = 'Prezado(a),\n\nRecebi a solicitação de orçamento.\n\nEm breve será encaminhado o orçamento\n\n';

    var emailSendInfo = {
        from: '"Mario" <3fc7cc0dda-9ae5d2@inbox.mailtrap.io>', 
        to: req.body.email, 
        subject: "Solicitação de orçamento ✔", 
        text: emailTexto, 
        html: emailHtml, 
      }

    await transport.sendMail(emailSendInfo, function(err){
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Solicitação de orçamento não enviada com sucesso!"
        });

        return res.json({
            error: false,
            message: "Solicitação de orçamento enviada com sucesso!"
        });
    });
  })
   
  app.listen(8080, () => {
      console.log("Servidor iniciado na porta 8080: http://localhost:8080");
  });