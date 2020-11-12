

module.exports = {
    //'@disabled': true   faz com que esse teste nao seja executado
    '@tags': ['smoke', '404'], 

    before: function(browser){
        // garantindo que fez o login e está logado, reutilizando o login com sucesso
        let login = browser.page.login() 
        let sidebar = browser.page.sidebar()
    
        login.with('zumbi@dospalmares.com.br', 'pwd123') 
        sidebar.expectLoggedUser('Quilombo')
    },

    'quando eu busco um titulo nao cadastrado': function(browser){
        let movie=browser.page.movie()

        movie
            .setValue('@searchInput', 'Não é mais um besteirol americano')
            .click('@searchIcon')
    },

    'entao devo ver uma mensagem de alerta': function(browser){
        let movie=browser.page.movie()
        movie
            .waitForElementVisible ('@alertDanger', 10000)
            .assert.containsText('@alertDanger', 'Puxa! não encontramos nada aqui :(')

    }
}