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

Cada app tem um botão "< Nave-Mãe" na tela inicial que volta para onde a criança estava: a aba Missões ou o planeta de onde decolou (o jogo recebe `r=tasks` ou `r=p.<planeta>` no endereço e a Nave-Mãe abre `#v=tasks` ou `#p=<planeta>`). Ao entrar direto numa missão pela aba Missões, o voltar da missão vira "< Missões" e leva de volta para a lista.

## Abas

A barra inferior tem quatro abas:

- **Mapa:** planetas e missões do dia. O painel do piloto leva ao Hangar. É a única tela com o cabeçalho NAVE-MÃE e a engrenagem das configurações; nas outras, o topo é o título da seção ou o botão de voltar.
- **Missões:** lista do que falta fazer hoje em todos os apps, agrupada por jogo. As obrigatórias aparecem primeiro, depois os extras, e as feitas ficam riscadas no fim. Tocar numa missão abre o jogo já dentro dela (link `app/#m=missao`). Um selo na aba mostra quantas faltam; com tudo feito ele vira um check verde. Cada jogo abre e fecha tocando no cabeçalho: começa aberto quando falta missão e fechado quando está completo (fechado, mostra só o progresso).
  Quando todas as missões do dia estão feitas, a aba mostra a nave em velocidade de cruzeiro, uma frase do dia, a sequência, o total de missões e quanto falta para as novas. Os desafios extras que faltam ficam em "Treino extra" e as missões feitas ficam recolhidas. Na primeira vez do dia toca uma musiquinha.
- **Hangar:** uma página só, com a chave **PILOTO | NAVE** no topo. O título, a chave e o palco ficam fixos (abaixo da Dynamic Island) enquanto as opções rolam.
  - **Piloto (Vestiário):** traje EVA industrial. Use ◀ ▶ para trocar título, capacete, viseira, traje, tom de pele, emblema no ombro e equipamento (lanterna, tanques de O₂, rastreador, maçarico, jetpack).
  - **Nave:** a nave na plataforma. Use ◀ ▶ para trocar modelo (foguete, caça, cargueiro, disco, interceptor), pintura e propulsor.
- **Conquistas:** parede de medalhas por categoria (bronze, prata, ouro e níveis acima). Tocar numa medalha mostra o progresso e as recompensas no painel do topo; o cabeçalho (CONQUISTAS e a contagem) e o painel ficam fixos, abaixo da Dynamic Island, enquanto a parede rola.

Os jogos em que a criança aparece usam o piloto e a nave como foram customizados (hoje, o Desabamento de Numeris). A Nave-Mãe grava os desenhos prontos em `localStorage['navemae-avatar']` (`pilot`, `ship`, `flame`, em SVG na escala 1) e o jogo amplia na escala que precisar.

Missão feita aparece sempre como **FEITO**. Jogar de novo uma missão feita no dia é jogo livre: começa do zero, não guarda andamento e a missão continua feita, mesmo se a criança sair no meio.

Itens bloqueados aparecem como prévia com cadeado e mostram o objetivo que falta. Os itens só dependem das missões diárias: total de missões, dias seguidos, acertos de primeira nas missões e nível em Numeris. Os desafios extras (Fuja do Alien, Desabamento) dão medalhas de honra, contadas a cada fuga, sem itens. O que foi conquistado fica guardado e não volta a travar.

## Sons

Os três apps usam o mesmo sintetizador (`mkSYN`: notas com envelope, deslize de tom, vibrato e ruído filtrado). Cada contexto tem seu som: abas com notas diferentes, sopro ao abrir planeta, motor na decolagem, peças equipadas e bloqueadas, medalhas, dados exportados, área dos pais; nos jogos, bateria com tom subindo conforme a sala enche, equipes em acordes, esteira do hangar, raio contra o Alien, pedras com tom pelo valor do símbolo, desmoronar ao apagar, papel na tábua e contagem regressiva. Acertos seguidos sobem de tom (combo).

Som no iPhone: a opção **Tocar no silencioso** (configurações) escolhe o modo de áudio do iOS. Desligada (padrão), os sons misturam com a música do celular e a chave de silencioso cala o app; ligada, o som sai mesmo no silencioso, mas o iOS pausa as outras mídias. O iOS não oferece a sites um modo que faça as duas coisas (o único que ignora o silencioso é o de reprodução, que não mistura).

Cada toque em botão gera uma vibração leve. No iPhone (iOS 18 ou mais recente) o Safari não tem API de vibração: cada botão recebe por dentro um `<label>` invisível que cobre o botão e aciona um `<input type=checkbox switch>` escondido, então o próprio toque do dedo cai no interruptor nativo, que vibra; o clique continua chegando ao botão. Um `MutationObserver` arma os botões criados depois. Precisa de Ajustes › Sons e Tato › Tato do Sistema ligado. No Android usa `navigator.vibrate`.

## Arte 16-bit

Todo desenho usa a mesma grade: cada pixel de arte ocupa 2px na tela. Os sprites continuam escritos em linhas de texto (`SPR`), e o `spriteRows(rows, s, cores)` amplia a arte com Scale2x/Scale3x até a grade de 2px (`s` 4 → 2x, `s` 6 → 3x), aplica luz de cima-esquerda, sombra embaixo-direita, faixas de volume com pontilhado e contorno colorido. Use sempre `s` par (2, 4, 6, 8). Os planetas são gerados direto na resolução final, com rampa de 7 tons.

## Configurações e backup

Toque na engrenagem no topo para abrir as configurações:

- **Som:** liga ou desliga em todo o app, inclusive nos jogos (é o único lugar com essa opção).
- **Tocar no silencioso:** ligada, o som sai mesmo com a chave no silencioso, mas pausa a música do celular; desligada, toca junto com a música e a chave de silencioso cala o app.
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
