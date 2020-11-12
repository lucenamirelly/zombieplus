

module.exports = {
    'senha incorreta': (browser) => { //modelo de função em ES6 | 'login com sucesso': function (browser) (JavaScript)
        let login = browser.page.login()
        login
            .with('zumbi@dospalmares.com.br', '123abc') //chamando a função de login with e passando os parametros email e senha
            .expectAlertDanger('Usuário e/ou senha inválidos')
    }
}