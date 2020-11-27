# projeto-final-reprograma

### Projeto final do curso de back-end - Reprograma

 - API Rest de bandas musicais independentes para divulgar os locais onde essas bandas se apresentam. Auxiliar o usuário a encontrar locais e bandas do seu gosto musical na cidade onde está presente.


## Band: 
 
- GET: 
query params: pode ser feita a busca por style, name, city e veneu 

http://localhost:8080/bands
retorna um Json:
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

http://localhost:8080/bands?style=Pop

[
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

http://localhost:8080/bands?style=Pop&city=Recife

[
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

http://localhost:8080/bands?venue=rock n ribs

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
    }
]
```

- Post: 

 Para criação, você precisará de autorização. O parâmetro "Authorization" do header precisa estar preenchido.

body:
    ```{
        "name":"SoulSin",
        "city": "Fortaleza", 
        "style": "Pop Rock",
        "instagram": "@soulsinband",
        "twitter": "-",
        "venue": "Hard Rock Café Fortaleza"
        
    }
    ```

response:
    201: a banda foi criada
      payload: 
        ``` {
        "name":"SoulSin",
        "city": "Fortaleza", 
        "style": "Pop Rock",
        "instagram": "@soulsinband",
        "twitter": "-",
        "venue": "Hard Rock Café Fortaleza"
        
    }
    ```
        500: Authorization header missing

 - Delete:
 Para deletar a banda que está cadastrada.
