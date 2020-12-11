# projeto-final-reprograma

### Projeto final do curso de back-end - Reprograma

 - API Rest de bandas musicais independentes para divulgar os locais onde essas bandas se apresentam. Auxiliar o usuário a encontrar locais e bandas do seu gosto musical na cidade onde está presente.

 ### Dependências utilizadas no projeto:
    bcrypt
    dotenv-safe
    express
    jsonwebtoken
    mongoose
    nodemon



## Band: 
 
- Listar as bandas: 

/GET

query params: pode ser feita a busca por style, name, city e veneu 

### /bands
retorna um Json:
```
[
    {
        "venue": [
            "rock n ribs",
            "riomar"
        ],
        "_id": "5fb92d939dc32ab27c75f528",
        "name": "papaninfa",
        "city": "Recife",
        "style": "Pop Rock",
        "instagram": "@papaninfa_oficial",
        "twitter": "-",
        "__v": 0
    },
    {
        "venue": [
            "Mafuá do Januário",
            "riomar"
        ],
        "_id": "5fb92e7e9dc32ab27c75f529",
        "name": "Banda Anabela",
        "city": "Recife",
        "style": "Pop",
        "instagram": "@bandaanabela",
        "twitter": "-",
        "__v": 0
    }
]
```

### /bands?style=Pop

```[
    {
        "venue": [
            "Mafuá do Januário",
            "riomar"
        ],
        "_id": "5fb92e7e9dc32ab27c75f529",
        "name": "Banda Anabela",
        "city": "Recife",
        "style": "Pop",
        "instagram": "@bandaanabela",
        "twitter": "-",
        "__v": 0
    }
]
```

### /bands?style=Pop&city=Recife

```[
    {
        "venue": [
            "Mafuá do Januário",
            "riomar"
        ],
        "_id": "5fb92e7e9dc32ab27c75f529",
        "name": "Banda Anabela",
        "city": "Recife",
        "style": "Pop",
        "instagram": "@bandaanabela",
        "twitter": "-",
        "__v": 0
    }
]
```

### /bands?venue=rock n ribs

```[
    {
        "venue": [
            "rock n ribs",
            "riomar"
        ],
        "_id": "5fb92d939dc32ab27c75f528",
        "name": "papaninfa",
        "city": "Recife",
        "style": "Pop Rock",
        "instagram": "@papaninfa_oficial",
        "twitter": "-",
        "__v": 0
    }
]
```

## Authorization

Nas rotas autorizadas ("Authorization") necessário colocar o Bearer e o token que será gerado quando for feito o login. O PUT, DELETE e o POST são rotas que necessitarão de autorização para serem manipuladas.


- Cadastrar uma banda:

/POST

 Para criação, você precisará de autorização. O parâmetro "Authorization" do header precisa estar preenchido.


body:

    
    {
        "name":"SoulSin",
        "city": "Fortaleza", 
        "style": "Pop Rock",
        "instagram": "@soulsinband",
        "twitter": "-",
        "venue": "Hard Rock Café Fortaleza"
    }
    
    

response:
    201: a banda foi criada
      payload: 

    
    {
        "name":"SoulSin",
        "city": "Fortaleza", 
        "style": "Pop Rock",
        "instagram": "@soulsinband",
        "twitter": "-",
        "venue": "Hard Rock Café Fortaleza"
    } 
    

        
        
500: Authorization header missing

 - Deletar uma banda:

/DELETE

 Para deletar a banda que está cadastrada, você precisará de uma autorização. O parâmetro "Authorization" do header precisa estar preenchido. Através do ID deletaremos a banda desejada.

 500 : mensagem: "FAIL"

 200: "Band successfully removed"

 200 (se não houver a banda): "No band to be removed"

 - Atualizar uma banda:

 /PUT

 Para atualizar uma banda cadastrada você precisará de uma autorização. O parâmetro "Authorization" do header precisa estar preenchido.

 Através do ID iremos pegar a banda para atualizar o que queremos. No body passaremos os pontos que serão atualizados.

 body:

    
    {
        "name":"SoulSin",
        "city": "Fortaleza/CE"

    }

## authController:

Terá um signup e um login para o usuário entrar na conta. Criando um código de autorização para o usário registrar, deletar ou modificar o registro.

/POST

Usuário e senha será passado para entrar na conta da banda. 

### /login
### /signup

body:


    {

    "email": "SoulSin"
    "password": 123456

    }






