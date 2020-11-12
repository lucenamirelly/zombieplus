
var loginActions = { //criando uma variável com os passos do login pois era sempre executado o mesmo passo em todos os cenários
    with: function (email, pass){
        return this
            .navigate()
            .waitForElementVisible('@form', 10000)
            .setValue('@emailInput', email)
            .setValue('@passInput', pass)
            .click('@loginButton')
    },
    expectAlertDanger: function (texto){
        return this
            .waitForElementVisible('@alertDanger', 10000) // .alert é a classe onde fica a mensagem de alerta quando digita uma senha errada. esperar essa classe ficar visivel depois de clicar no botão
            .assert.containsText('@alertDanger', texto)

    },
    expectAlertInfo: function (texto){
        return this
            .waitForElementVisible('@alertInfo', 10000) // .alert é a classe onde fica a mensagem de alerta quando digita uma senha errada. esperar essa classe ficar visivel depois de clicar no botão
            .assert.containsText('@alertInfo', texto)

    }
}


//page object, transformo os seletores css em objetos e chamo eles nos cenários de teste

module.exports ={
    url: '/login',
    commands: [loginActions], //comando personalizado do nightwatch
    elements: {
        form: '.card-login',
        emailInput: 'input[name=email]',
        passInput: 'input[name=password]',
        loginButton: '.login-button',
        alertDanger: '.alert-danger',
        alertInfo: '.alert-info'

    }
}