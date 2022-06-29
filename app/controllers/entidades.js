const express = require('express');
const authMiddleware = require('../middlewares/auth');
var axios = require('axios');

const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
    try {
        return res.send({ok:true});
    } catch (err) {
        return res.status(400).send({error:'Error loading'});
    }
    res.send({user: req.userId}); 
});

router.get('/:idEntidade', async (req, res) => {
    const idEntidade = req.params.idEntidade;
    const token = req.headers.authorization;
    var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.projurisweb.virtuem.com.br">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <web:token>'+token+'</web:token>\r\n      <web:ObtemRequest>\r\n         <entidade>\r\n            <filtro>{gA:[{c:{f:\'ID_ENTIDADE\', o:\'=\', vc:\''+idEntidade+'\'}}]}</filtro>\r\n         </entidade>\r\n      </web:ObtemRequest>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';

    var config = {
        method: 'post',
        url: 'https://demotec.projuris.com.br/projuris/services/EntidadeWS',
        headers: { 
            'Content-Type': 'application/xml'
        },
        data : data
    };

    try {
         const obtem = await axios(config);
         console.log(obtem.data)
        //  .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        // console.log(error);
        // });

        return res.send(obtem.data);
    } catch (err) {
        return res.status(400).send({error:'Error loading entidades'});
    }
    res.send({user: req.userId}); 
});

router.post('/incluir', async (req, res) => {
    const token = req.headers.authorization;
    // console.log(req.body.nome, req.body.idtipodocumentotipodocumento, req.body.numerodocumento);
    var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservices.projurisweb.virtuem.com.br">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <web:token>2201bc3b-4497-4b15-b506-84a76c962046</web:token>\r\n      <web:IncluirRequest>\r\n         <entidade>\r\n            <id-entidade></id-entidade>\r\n            <proximo-evento></proximo-evento>\r\n            <ultimo-evento-realizado></ultimo-evento-realizado>\r\n            <id-situacao-atual></id-situacao-atual>\r\n            <nome>'+req.body.nome+'</nome>\r\n            <id-categoria-cliente-adverso></id-categoria-cliente-adverso>\r\n            <id-categoria-cliente-adverso-categoria-cliente-adverso></id-categoria-cliente-adverso-categoria-cliente-adverso>\r\n            <stat-out-custom></stat-out-custom>\r\n            <tipo-pessoa></tipo-pessoa>\r\n            <estrangeiro></estrangeiro>\r\n            <matricula></matricula>\r\n            <assinatura-digital></assinatura-digital>\r\n            <agente-contumaz></agente-contumaz>\r\n            <beneficiario-reincidente></beneficiario-reincidente>\r\n            <codigo-integracao></codigo-integracao>\r\n            <obs></obs>\r\n            <qualificacao></qualificacao>\r\n            <nome-nr-documento></nome-nr-documento>\r\n            <cliente></cliente>\r\n            <advogado></advogado>\r\n            <depositario></depositario>\r\n            <adverso></adverso>\r\n            <emissor></emissor>\r\n            <outorgante></outorgante>\r\n            <outorgado></outorgado>\r\n            <fornecedor></fornecedor>\r\n            <quotista></quotista>\r\n            <procurador></procurador>\r\n            <assinante></assinante>\r\n            <juiz></juiz>\r\n            <interlocutor></interlocutor>\r\n            <beneficiario></beneficiario>\r\n            <operadora></operadora>\r\n            <tipo-entidade></tipo-entidade>\r\n            <tratamento></tratamento>\r\n            <profissao></profissao>\r\n            <data-nascimento></data-nascimento>\r\n            <sexo></sexo>\r\n            <estado-civil></estado-civil>\r\n            <estado-civil-nome></estado-civil-nome>\r\n            <admin-qualisign></admin-qualisign>\r\n            <razao-social></razao-social>\r\n            <inscricao-municipal></inscricao-municipal>\r\n            <inscricao-estadual></inscricao-estadual>\r\n            <codigo-estrutural></codigo-estrutural>\r\n            <id-grupo-economico></id-grupo-economico>\r\n            <id-grupo-economico-nome-grupo-economico></id-grupo-economico-nome-grupo-economico>\r\n            <nome-fantasia></nome-fantasia>\r\n            <tipo-ambiente-qualisign></tipo-ambiente-qualisign>\r\n            <codigo-cliente></codigo-cliente>\r\n            <tipo-documento-principal></tipo-documento-principal>\r\n            <numero-documento-principal></numero-documento-principal>\r\n            <id-doc-principal>\r\n               <id-entidade-documento></id-entidade-documento>\r\n               <id-entidade></id-entidade>\r\n               <id-tipo-documento></id-tipo-documento>\r\n               <id-tipo-documento-tipo-documento>'+req.body.idtipodocumentotipodocumento+'</id-tipo-documento-tipo-documento>\r\n               <numero-documento>'+req.body.numerodocumento+'</numero-documento>\r\n               <orgao-emissor></orgao-emissor>\r\n               <data-emissao></data-emissao>\r\n               <principal></principal>\r\n               <id-usuario-cadastro></id-usuario-cadastro>\r\n               <id-usuario-cadastro-nome></id-usuario-cadastro-nome>\r\n               <data-cadastro></data-cadastro>\r\n               <ultima-modificacao></ultima-modificacao>\r\n               <by></by>\r\n               <key></key>\r\n               <filtro></filtro>\r\n               <total></total>\r\n               <where></where>\r\n               <alias></alias>\r\n               <paginate></paginate>\r\n               <start></start>\r\n               <dir></dir>\r\n               <limit></limit>\r\n               <sort></sort>\r\n               <multipleid>\r\n                  <id></id>\r\n               </multipleid>\r\n            </id-doc-principal>\r\n            <link-tst-cert></link-tst-cert>\r\n            <cep></cep>\r\n            <entidade-integrada-custom></entidade-integrada-custom>\r\n            <glosa></glosa>\r\n            <busca-auto></busca-auto>\r\n            <endereco></endereco>\r\n            <numero></numero>\r\n            <complemento></complemento>\r\n            <bairro></bairro>\r\n            <id-pais></id-pais>\r\n            <id-pais-pais></id-pais-pais>\r\n            <id-uf></id-uf>\r\n            <id-uf-uf></id-uf-uf>\r\n            <id-municipio></id-municipio>\r\n            <id-municipio-municipio></id-municipio-municipio>\r\n            <email></email>\r\n            <home-page></home-page>\r\n            <tel-comercial></tel-comercial>\r\n            <ramal></ramal>\r\n            <tel-residencial></tel-residencial>\r\n            <fax></fax>\r\n            <tel-celular></tel-celular>\r\n            <contato></contato>\r\n            <id-unidade-de-controle>\r\n               <id></id>\r\n            </id-unidade-de-controle>\r\n            <qnt-processo-relacionados></qnt-processo-relacionados>\r\n            <atualizacao-entidade-contumaz></atualizacao-entidade-contumaz>\r\n            <advgado-entidade-contumaz></advgado-entidade-contumaz>\r\n            <adverso-entidade-contumaz></adverso-entidade-contumaz>\r\n            <id-usuario-cadastro></id-usuario-cadastro>\r\n            <id-usuario-cadastro-nome></id-usuario-cadastro-nome>\r\n            <data-cadastro></data-cadastro>\r\n            <ultima-modificacao></ultima-modificacao>\r\n            <by></by>\r\n            <key></key>\r\n            <filtro></filtro>\r\n            <total></total>\r\n            <where></where>\r\n            <alias></alias>\r\n            <paginate></paginate>\r\n            <start></start>\r\n            <dir></dir>\r\n            <limit></limit>\r\n            <sort></sort>\r\n            <multipleid>\r\n               <id></id>\r\n            </multipleid>\r\n         </entidade>\r\n      </web:IncluirRequest>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>';

    console.log(data);

    var config = {
        method: 'post',
        url: 'https://demotec.projuris.com.br/projuris/services/EntidadeWS',
        headers: { 
            'Content-Type': 'application/xml'
        },
        data : data
    };

    try {
         const incluir = await axios(config);
         console.log(incluir.data)
        //  .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // })
        // .catch(function (error) {
        // console.log(error);
        // });

        return res.send(incluir.data);
    } catch (err) {
        return res.status(400).send({error:'Error loading entidades'});
    }
    res.send({user: req.userId}); 
});

// router.get('/:entidadeId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

// router.post('/', async (req, res) => {
//     try {
//         const entidade = await Entidade.create({...req.body, user: req.userId});
        

//         return res.send({entidade});
//     } catch (err) {
//         return res.status(400).send({error:'Error creating new entidade'})
//     }
 
// });

// router.put('/:entidadeId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

// router.delete('/:entidadeId', async (req, res) => {
//     res.send({user: req.userId}); 
// });

module.exports = app => app.use('/entidades', router)