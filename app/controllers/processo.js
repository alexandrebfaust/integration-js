const express = require('express');
const authMiddleware = require('../middlewares/auth');
var axios = require('axios');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ attrkey: "ATTR" });

const contexto = "Processo";

const router = express.Router();

router.use(authMiddleware);

function capFirtsLetter(str){
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

async function PJObtemPorId(token, idContexto, filtro){
    if(filtro == ""){
        filtro = "{gA:[{c:{f:'ID_"+contexto.toUpperCase()+"', o:'=', vc:'"+idContexto+"'}}]}";
    }
    var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.projurisweb.virtuem.com.br">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <web:token>'+token+'</web:token>\r\n      <web:ObtemRequest>\r\n         <'+contexto.toLowerCase()+'>\r\n            <filtro>'+filtro+'</filtro>\r\n         </'+contexto.toLowerCase()+'>\r\n      </web:ObtemRequest>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';
    console.log(data);

    var config = {
        method: 'post',
        url: 'https://demotec.projuris.com.br/projuris/services/'+capFirtsLetter(contexto)+'WS',
        headers: { 
            'Content-Type': 'application/xml'
        },
        data : data
    };

    try {
        const obtem = await axios(config);
        // console.log(obtem.data)
        return obtem.data;
    } catch (err) {
        return {error:'Error loading processos'};
    }

}


router.get('/:idContexto', async (req, res) => {
    try {
        const idContexto = req.params.idContexto;
        const token = req.headers.authorization;
        if(req.body.filtro){
            var filtro = req.body.filtro;
        }
        else{
            filtro = "";
        }
        obtem = await PJObtemPorId(token, idContexto, filtro);
        data = await obtem.data;

        console.log('Parsed XML: ' + JSON.stringify(data));

        // parser.parseString(String(obtem.data), function(error, result) {
        //     if(error === null) {
        //         console.log(result);
        //     }
        //     else {
        //         console.log(error);
        //     }
        // });

        
        return res.send(obtem);
    } catch (err) {
        return res.status(400).send({error:'Error loading function'});
    }
});

router.post('/', async (req, res) => {
    try {
        const idContexto = req.params.idContexto;
        const token = req.headers.authorization;
        if(req.body.filtro){
            var filtro = req.body.filtro;
        }
        else{
            filtro = "";
        }

        obtem = await PJObtemPorId(token, idContexto, filtro)
        return res.send(obtem);
    } catch (err) {
        return res.status(400).send({error:'Error loading function'});
    }
});

module.exports = app => app.use('/'+contexto+'', router)