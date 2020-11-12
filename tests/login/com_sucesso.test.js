

module.exports = {
    '@tags': ['smoke'],
    'login com sucesso': (browser) => { //modelo de função em ES6 | 'login com sucesso': function (browser) (JavaScript)

        let login = browser.page.login() //instanciando os objetos
        let sidebar = browser.page.sidebar()
    
        
        login.with('zumbi@dospalmares.com.br', 'pwd123') //chamei a função with na pasta login, que realiza o login, passando os parametros email e senha

        sidebar.expectLoggedUser('Quilombo')
            
    }
    
} 