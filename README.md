## Installation
💾   
  
`npm install`
  
## Usage
💻   
  
Run the following command at th root of your project:
  
`npm start`

## Test
🚀  
  
Tp access the API you need to use a headers named as `Authorization` with your ProJuris token:

POST - Entidades - Incluir
`http://localhost:3001/entidades/incluir`
```
{
    "nome":"Teste batatinha",
    "idtipodocumentotipodocumento":"CPF",
    "numerodocumento":"122.231.123-71"
}
```

POST - Processo por Filtro
`http://localhost:3001/processo/`
```
{
    "filtro":"{gA:[{c:{f:'ID_PROCESSO', o:'=', vc:'263'}}]}"
}
```

GET - Processo por ID
`http://localhost:3001/processo/263`
