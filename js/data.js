const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    saveData(nomeArquivo, conteudoArquivo){
        let arquivoCurso = __dirname + '/../data/' + nomeArquivo + '.json';
        this.setFile(arquivoCurso, conteudoArquivo);
    },

    setFile(arquivoCurso, conteudoArquivo){
        return jsonfile.writeFile(arquivoCurso, conteudoArquivo)
            .then(() => {
                console.log('Arquivo \'' + arquivoCurso + '\' criado')
            }).catch((err) => {
                console.log(err);
            });
    }, 
    
    getFile(cpfCliente){
        let filePath = __dirname + '/../data/' + cpfCliente + '.json'
        return jsonfile.readFile(filePath);
    }
}