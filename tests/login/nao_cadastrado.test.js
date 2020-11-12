

module.exports = {

    'nao cadastrado': (browser) => { //cenário de teste
        let login = browser.page.login()
        login
            .with('404@yahoo.com', '123abc')
            .expectAlertDanger('Usuário e/ou senha inválidos')
    }
}