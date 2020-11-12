import pg from '../../lib/db' //importando a pagina pg para esta. "../" para ir saindo das paginas

let movieData = {}
module.exports = {
    before: function (browser){
        movieData = { //massa de teste
            title: 'ResidentEvil',
            status: 'Disponível',
            year: 2002,
            releaseDate: '01/05/2002',
            cast: ['Mila Jovovich', 'Ali Larter', 'Ian Glen', 'Shawn Roberts'],
            cover: 'resident-evil-2002.jpg',
            plot: 'fsfgegfebhfaehdbahefbahebfe'
        }

        pg.removeByTitle(movieData.title)

        // garantindo que fez o login e está logado, reutilizando o login com sucesso
        let login = browser.page.login() 
        let sidebar = browser.page.sidebar()
    
        login.with('zumbi@dospalmares.com.br', 'pwd123') 
        sidebar.expectLoggedUser('Quilombo')
    },

    'quando eu faço o cadastro do filme': function(browser){ //passo a passo que o teste deve fazer
        let movie = browser.page.movie()
        movie //cadastrando via tela, usando a massa de tste
            .createForm()
            .setValue('@titleInput', movieData.title) //setValue é uma função do nightwatch pra preencher o campo | movieData.title é o que está declarado na mascara de teste
            .selectStatus(movieData.status)
            .setValue('@yearInput', movieData.year)
            .setValue('@dateInput', movieData.releaseDate)
            .insertCast(movieData.cast) //chamando a função e passando o array cast como parametro
            .setValue('@plotInput', movieData.plot)
            .uploadCover(movieData.cover) //chamando a função que faz upload da foto, passando como parametro o nome do arquivo
            .pause(5000)
            .click ('@createButton')
            .pause(5000) //pausar por 5 segundos
    },
    'entao devo ver o filme na lista': function (browser){ //função para ver se o filme foi cadastrado com sucesso quando retorna pra tela normal
        let movie = browser.page.movie() //usando page object
        
        //Visible => Procura o elemento na página, mas também procura pelo
        //atributo Display

        //Present => Verifica se o elemento está na página (em algum lugar da página)
        
        movie
            .waitForElementPresent('@list', 5000) //table tbody é onde fica a lista de filmes
            .assert.containsText('@list', movieData.title) //ver se na classe table tbody tem o titulo do filme
    }
    


}