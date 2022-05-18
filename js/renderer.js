// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron');
const fs = require('fs');
const data = require('./js/data');

var campoCep = document.querySelector('#cep');
var botaoCriar = document.querySelector('#criaCliente');

campoCep.addEventListener('change', function(){
    var cep = (campoCep.value).replace(/\D/g,  '');
    
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        
        if(validacep.test(cep)) {
            getCep(cep.toString());
        }
    }
    alert('Digite um CEP válido!');
})

botaoCriar.addEventListener('click', function(){
    var dadosCliente = getDadosCliente();
    ipcRenderer.send('acaoBotaoCriar', dadosCliente);
})

function getCep(cep) {
    var url = 'https://viacep.com.br/ws/' + cep + '/json';

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        document.getElementById('bairro').setAttribute('value', data.bairro);
        document.getElementById('rua').setAttribute('value', data.logradouro);
        document.getElementById('cidade').setAttribute('value', data.localidade);
        document.getElementById('estado').value = data.uf;
        document.getElementById('complemento').value = data.complemento;
        document.getElementById('numero').focus();
    })
    .catch(function(error) {
        alert('Ocorreu um erro ao tentar recuperar seu CEP. Tente novamente em alguns instantes');
    });
}

function getDadosCliente() {
    var dadosCliente = {
        "nomeCliente" : document.getElementById('nome').value,
        "rgCliente" : document.getElementById('rg').value,
        "cpfCliente" : document.getElementById('cpf').value,
        "telefoneCliente" : document.getElementById('telefone').value,
        "emailCliente" : document.getElementById('email').value,
        "cepCliente" : document.getElementById('cep').value,
        "paisCliente" : document.getElementById('pais').value,
        "estadoCliente" : document.getElementById('estado').value,
        "cidadeCliente" : document.getElementById('cidade').value,
        "bairroCliente" : document.getElementById('bairro').value,
        "ruaCliente" : document.getElementById('rua').value,
        "numeroCliente" : document.getElementById('numero').value,
        "complementoCliente" : document.getElementById('complemento').value
    };
    return dadosCliente;
}