

module.exports = {
    'email nao informado': (browser) =>{
        let login = browser.page.login()
        login 
            .with('', 'pwd123')
            .expectAlertInfo('Opps. Cadê o email?') //ver se contem essa mensagem nessa classe .alert
    }
}