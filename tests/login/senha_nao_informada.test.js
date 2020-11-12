

module.exports = {

    'senha nao informada': (browser) =>{
        let login = browser.page.login()
        login
            .with('zumbi@dospalmares.com.br', '')
            .expectAlertInfo('Opps. Cadê a senha?') //chamando função
    }
    
}