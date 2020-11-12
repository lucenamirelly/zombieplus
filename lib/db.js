//implementação que tem acesso ao banco de dados

import { Pool } from 'pg'
const connectionString = 'postgresql://postgres:qaninja@pgdb:5432/zombieplus'
const pool = new Pool({ connectionString: connectionString })

export default { //EC6, por isso o export é diferente
    removeByTitle: (title) => {
        return new Promise((resolve, reject) => { //usando promessa do JS, para o caso da função de deletar nao ser executada antes de criar um novo filme, senão vai mostrar que o filme ja existe
            pool
                .query(`DELETE FROM public.movies where title = '${title}';`) //usa apostrofo quando vai fazer uma interpolação
                .then(res => { //se a promessa for cumprida, retorne o seu resultado, no caso, delete do banco de dados
                    resolve(res)
                })
                .catch(e => reject(e.stack)) //re nao for cumprida, rejeita a promessa e retorna porque nao foi cumprida, e o teste nao continua, nao executa os proximos passos
        })
    },
    insertMovie: (movie) => { //inserindo a massa de teste pelo banco de dados
        let query = `INSERT INTO public.movies(
            title, status, year, release_date, "cast", overview, cover, created_at, updated_at)
            VALUES ('${movie.title}', '${movie.status}','${movie.year}', '${movie.releaseDate}', '{${movie.cast}}', '${movie.plot}', '${movie.cover}', current_timestamp, current_timestamp);` //current time stamp é a data do sistema do postgres | cast recebeu duas chaves porque é um array

        return new Promise((resolve, reject) => { //usando promessa do JS, para o caso da função de deletar nao ser executada antes de criar um novo filme, senão vai mostrar que o filme ja existe
            pool
                .query(query)
                .then(res => { //se a promessa for cumprida, retorne o seu resultado, no caso, delete do banco de dados
                    resolve(res)
                })
                .catch(e => reject(e.stack)) //re nao for cumprida, rejeita a promessa e retorna porque nao foi cumprida, e o teste nao continua, nao executa os proximos passos
        })

    }
}