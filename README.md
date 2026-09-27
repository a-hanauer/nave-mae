# Nave-Mãe

Central de apps escolares em estilo 8-bits, feita para o celular. Cada matéria é um planeta no mapa estelar, e cada planeta reúne os jogos daquela matéria.

Publicado em `https://a-hanauer.github.io/nave-mae/`.

## Apps

| Planeta | App | Pasta |
|---|---|---|
| Matemática | Estação Nostro-9 (divisão) | `nostro-9/` |
| Matemática | Ruínas de Numeris (números romanos) | `numeris/` |
| Português | em breve | |
| Ciências | em breve | |
| Inglês | em breve | |
| História | em breve | |
| Geografia | em breve | |

## Como funciona

- **Primeiro acesso:** a criança digita o nome de piloto.
- **Mapa estelar:** mostra quantas tarefas faltam hoje em cada planeta e a sequência de dias seguidos com o turno completo.
- **Tela do planeta:** lista os apps, com o progresso do dia e o botão DECOLAR.
- **Área dos pais:** segure o logo da Nave-Mãe por 3 segundos para trocar o nome do piloto.

Cada app tem um botão "< Nave-Mãe" na tela inicial para voltar ao mapa.

## iPhone

Abra o link no Safari, toque em Compartilhar e escolha **Adicionar à Tela de Início**. A Nave-Mãe abre em tela cheia, com ícone próprio, e os apps abrem dentro dela.

## Adicionar um app novo

1. Crie uma pasta com o app, por exemplo `leitura/index.html`.
2. Em `index.html` da raiz, adicione um item na lista `APPS`:

```js
{id:'leitura', planet:'por', name:'Nome do app', tag:'Assunto', icon:'station',
 url:'leitura/', desc:'Descrição curta.',
 progress(){ /* ler o localStorage do app e devolver {played, done, total, extra, full} */ }}
```

Os ids dos planetas são `mat`, `por`, `cie`, `ing`, `his` e `geo`.

3. Na tela inicial do app, inclua o link de volta: `<a href="../">&lt; Nave-Mãe</a>`.

## Dados

Nada é enviado para servidor. O progresso fica no `localStorage` do navegador do aparelho. Como todos os apps estão no mesmo domínio, a Nave-Mãe consegue ler o progresso de cada um.
