const express = require ('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, ()=> {
 console.log(`API executando em http://localhost:${PORT}`);
});

let filmes = [
    {id: 1, titulo: 'Interestelar', ano: 2014},
    {id: 2, titulo: 'Matrix', ano: 1999}
];

let proximoId = 3; 
//Consultar todos os filmes
app.get('/filmes', (req, res) =>{
    res.json(filmes);
});

//Consultar filme específico
app.get('/filmes/:id', (req,res) => {
    const id = Number(req.params.id); //extrai da url
    const filme = filmes.find(f => f.id === id);

    if (!filme) return res.status(404).json({mensagem: 'Não Encontrado'});
});

//Cadastrar um novo filme 
app.post('/filmes', (req, res)=> {
    const { titulo, ano } = req.body;
    
    if(!titulo || !ano){
        return res.status(400).json({ erro: 'Dados invalidos'});
    }
     const novoFilme = {id: proximoId++, titulo, ano:Number(ano)};
    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
 
});

app.put('/filmes/:id', (req, res)=>{
    const id = Number(req.params.id);
    const filmes = filmes.find(f => f.id === id);

    if (!filme) return res.status (404).json({mensagem: 'Não encontrado'});

    const {titulo, ano} = req.body; 
    if (!titulo || !ano) return res.status(400).json({erro: 'Faltam dados'});

    filme.titulo = titulo; 
    filme.ano = Number(ano);

    res.json(filme);
});

app.delete('/filmes/:id', (req, res )=>{
    const id = Number(req.params.id);
    const indice = filmes.findIndex(f => f.id === id);

    if(indice=== -1) {
        return res.status(404).json({erro: 'Não encontrado'});

    }

    filmes.splice(indice, 1);
    res.status(204).send();
}
)