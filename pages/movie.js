
var createActions = {
    createForm: function () {
        return this
            .click('@addButton')
            .waitForElementVisible('@movieForm', 10000)
    },
    selectStatus: function (status) {
        return this
            .click('@statusSelect')
            .useXpath()
            .waitForElementVisible(`//li//span[contains(text(), "${status}")]`, 10000)
            .click(`//li//span[contains(text(), "${status}")]`)
            .useCss()
    },
    insertCast: function (cast){ //função para preencher um array
        const browser = this
        cast.forEach(function(actor){ //para cada for, adiciona um novo ator no array
            browser
                .setValue('@castInput', actor)
                .api.keys(browser.api.Keys.TAB) //função de apertar enter
        })

        return this
    },
    uploadCover: function(fileName) { //função para fazer o download da foto
        let fullPath = require ('path').resolve(__dirname, '../images/' + fileName) //fullPath é a variável onde ficará salvo o camino | pacote "path" é nativo do node, ele retorna o caminho| função resolve tem dois parametros, "__dirname" que passa o diretório onde esta funcionando, depois o caminho para o arquivo de imagem
        return this
            .setValue('@uploadInput', fullPath) //retorna o elemento que faz download e o caminho como parametro
            .pause(1000)
            .assert.attributeContains('.picture-src', 'src', 'blob')
    }
}

module.exports = {
    commands: [createActions],
    elements: { //elementos da pagina que vai automatizar o teste
        addButton: '.movie-add', //classe onde fica o botão "cadastro de filmes" *seletor css/jquery
        searchInput: 'input[placeholder^=Pesquisar', //utilizar o ^ significa que o nome do elemento começa com aquela palavra, pq o nome do elemento é "Pesquisar...""
        searchIcon: '#search-movie', //icone de pesquisar
        alertDanger: '.alert-danger',
        movieForm: '#movie-form',
        titleInput: 'input[name=title]', //campo que recebe o titulo do filme, tipo input, com a classe "name" que recebe "title"
        statusSelect: 'input[placeholder=Status]',
        yearInput: 'input[name=year]',
        dateInput: 'input[name=release_date]',
        castInput: '.cast',
        plotInput: 'textarea[name=overview]', //textarea recebe mais texto do que o input, recebe muitas linhas de texto
        uploadInput: '#upcover', //id onde fica o dowload da foto
        createButton: '#create-movie', //usou # porque é um id
        list: 'table tbody', //table tbody é onde fica a lista de filmes
        tr: 'table tbody tr', //tr é o elemento onde ta armazenado o filme, cada filme fica em uma tr
    }
}