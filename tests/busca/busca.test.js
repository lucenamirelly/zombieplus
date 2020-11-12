import pg from '../../lib/db' //importando o arquivo db.js
let movieData = {}

module.exports = {
    before: function (browser) { 

        movieData = { //criar uma nova massa de teste, os testes devem ser independentes
            title: 'Meu namorado é um zumbi',
            status: 'Disponível',
            year: 2013,
            releaseDate: '01/05/2013',
            cast: ['Nicholas Hoult', 'Tereza Palmer', 'Analeign Tapton', 'Rob Corddry'],
            cover: 'meu-namo-zumbi.jpg',
            plot: 'fsfgegfebhfaehdbahefbahebfe'
        }
        pg.removeByTitle(movieData.title).then(function(){ //excluir se ja tiver no banco de dados, passando a promessa pra garantir que ja foi excluido
            pg.insertMovie(movieData) //chamando função para inserir a massa de teste, implementada no arquivo db.js
        }) 

         // garantindo que fez o login e está logado, reutilizando o login com sucesso
         let login = browser.page.login() 
         let sidebar = browser.page.sidebar()
     
         login.with('zumbi@dospalmares.com.br', 'pwd123') 
         sidebar.expectLoggedUser('Quilombo')
        
    },

    'quando eu faço a busca pelo titulo': function (browser) {
        let movie=browser.page.movie()

        movie
            .setValue('@searchInput', movieData.title)
            .click('@searchIcon')
            .pause(10000)
    },

    'entao o titulo buscado deve ser exibido na lista': function (browser) {
        let movie = browser.page.movie()

        //tr é o elemento onde ta armazenado o filme, cada filme fica em uma tr
        // com essa função queremos garantir que so será exibido uma tr
        movie
            .waitForElementPresent('@tr', 10000) //tr fica dentro do tbody, dentro de table
            .expect.elements('@tr').count.to.equal(1) //verificar se so tem uma tr
        movie.assert.containsText('@tr', movieData.title) //precisa chamar o contexto o browser de novo pq o expect ja finalizou
        //verificar se na tr que foi exibida, esse é o titulo do filme contido nela
    }
}