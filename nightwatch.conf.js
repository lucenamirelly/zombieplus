require("babel-core/register") // pra interpretar o ecma script


const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['tests'],

  page_objects_path: './pages',
  globals_path: './hooks/globals.js',


  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    port: 9515,

  },


  test_settings: {
    default:{
      launch_url: "http://zombie-web:5000",
      globals:{
         waitForConditionTimeout: 15000 //as vezes a conexão fica lenta
      },
      desiredCapabilities:{
        browserName: 'chrome'
      }
    },

    headless: {
      launch_url:"http://zombie-web:5000",
      globals:{
        waitForConditionTimeout: 15000 //as vezes a conexão fica lenta
      },
      desiredCapabilities:{
        browserName: 'chrome',
        chromeOptions:{
          w3c:false,
          args:['--headless', '--no-sandbox']
        }
  
      }
    }, 
    stages: {
      launch_url: "http://stage.zombieplus.com" //nao existe
    }
  }
}
