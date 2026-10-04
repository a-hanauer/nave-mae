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

Cada app tem um botão "< Nave-Mãe" na tela inicial para voltar ao mapa.

## Abas

A barra inferior tem quatro abas:

- **Mapa:** planetas e missões do dia. O painel do piloto leva ao Hangar.
- **Missões:** lista do que falta fazer hoje em todos os apps, agrupada por jogo. As obrigatórias aparecem primeiro, depois os extras, e as feitas ficam riscadas no fim. Tocar numa missão abre o jogo já dentro dela (link `app/#m=missao`). Um selo na aba mostra quantas faltam.
- **Hangar:** uma página só, com a chave **PILOTO | NAVE** no topo.
  - **Piloto (Vestiário):** traje EVA industrial. Use ◀ ▶ para trocar título, capacete, viseira, traje, tom de pele, emblema no ombro e equipamento (lanterna, tanques de O₂, rastreador, maçarico, jetpack).
  - **Nave:** a nave na plataforma. Use ◀ ▶ para trocar modelo (foguete, caça, cargueiro, disco, interceptor), pintura e propulsor.
- **Conquistas:** parede de medalhas por categoria (bronze, prata, ouro e níveis acima). Tocar numa medalha mostra o progresso e as recompensas.

Itens bloqueados aparecem como prévia com cadeado e mostram o objetivo que falta. Os itens só dependem das missões diárias: total de missões, dias seguidos, acertos de primeira nas missões e nível em Numeris. Os desafios extras (Fuja do Alien, Desabamento) dão medalhas de honra, contadas a cada fuga, sem itens. O que foi conquistado fica guardado e não volta a travar.

## Configurações e backup

Toque na engrenagem no topo para abrir as configurações:

- **Som:** liga ou desliga em todo o app, inclusive nos jogos (é o único lugar com essa opção).
- **Exportar:** gera um código de texto com todo o progresso (Nave-Mãe e apps). Guarde no WhatsApp ou nas Notas.
- **Importar:** cole o código para restaurar. Isso substitui o progresso do aparelho.

## Área dos pais

Escondida nas configurações: **segure o título CONFIGURAÇÕES por 3 segundos** (uma linha amarela enche embaixo dele). Os jogos não têm mais área dos pais própria.

A interface é limpa, sem o estilo 16-bits, e tem filtro de período no topo (7 dias, 30 dias, tudo):

- **Visão geral:** acerto de primeira, missões concluídas, dias com turno completo, dias seguidos (e recorde), calendário das últimas 5 semanas, destaques (missão que precisa de atenção e ponto forte) e lista de matérias.
- **Matéria:** números da matéria e cada jogo com suas missões.
- **Jogo:** números do jogo, missões, gráfico dos últimos 14 dias, erros mais comuns, troca de nível (Numeris) e apagar histórico do jogo.
- **Missão:** acerto, respostas, dias concluída, última vez, acerto por dia (14 dias) e o que mais errou. Os botões no topo trocam entre as missões do jogo.

Faixas: Ótimo (85% ou mais), Bom (65% a 84%), Atenção (abaixo de 65%), Poucos dados (menos de 5 respostas).

Para isso, cada jogo grava no seu `localStorage` um `log` diário (`{data:{missao:[respostas,certas]}}`) e os erros por missão (`errM`). Esses dois começaram a ser gravados nesta versão; os totais e os erros gerais vêm de antes.

Ao criar um app novo, informe em `APPS` o campo `store` com a chave do `localStorage` do app, para ele entrar no backup.

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

3. Liste as missões do app no campo `tasks` (id, nome, subtítulo e `opt:true` para extras). No app, leia `#m=<id>` no carregamento para abrir a missão direto.
4. Na tela inicial do app, inclua o link de volta: `<a href="../">&lt; Nave-Mãe</a>`.

## Publicar uma versão nova

Antes de cada commit, rode `python3 bump.py`. Ele grava uma versão nova em `version.json` e nos apps. Quem estiver com o app aberto (inclusive pelo atalho da Tela de Início) recarrega sozinho quando a versão publicada muda.

## Dados

Nada é enviado para servidor. O progresso fica no `localStorage` do navegador do aparelho. Como todos os apps estão no mesmo domínio, a Nave-Mãe consegue ler o progresso de cada um.
