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

Cada app tem um botão "< Nave-Mãe" na tela inicial que volta para a aba Missões (ou para o planeta, quando a criança decolou de um planeta) (o jogo recebe `r=tasks` ou `r=p.<planeta>` no endereço e a Nave-Mãe abre `#v=tasks` ou `#p=<planeta>`). Ao entrar direto numa missão pela aba Missões, o voltar da missão vira "< Missões" e leva de volta para a lista.

## Abas

A barra inferior tem quatro abas:

- **Cockpit:** a interface é o cockpit de uma nave industrial (casco de metal escuro, luzes e telas CRT) e o conteúdo é a vista pelo para-brisa.
  - **Painel de cima** (fixo, abaixo da Dynamic Island): luzes piscando em quatro cores, uma tela CRT verde com o nome da tela atual e o número dela (missões feitas, energia, medalhas), a tecla de configurações no mapa e a tecla ◂ MAPA no planeta.
  - **Para-brisa:** colunas de metal dos lados e cantos chanfrados em degrau, com rebites, como a moldura de uma cabine.
  - **Console de baixo:** cada aba é uma tecla embutida com telinha; a tela atual acende a telinha e o LED âmbar. Faixas de alerta âmbar nas pontas e grade de ventilação na faixa da barra de início.
  - Configurações, avisos, a barra de LIBERAR e o terminal do mapa são monitores com moldura de metal e parafusos.
  - **Janela × interior:** só o que é vista de fora fica no para-brisa com estrelas: o mapa, o planeta e o palco do Hangar (este com moldura chanfrada própria). O que o piloto opera é interior do cockpit, em metal com monitores: o painel do piloto e o terminal do mapa (fixos logo acima do console, a janela do mapa rola entre o painel de cima e eles), Missões, Conquistas, Configurações, as teclas PILOTO | NAVE, as abas de categoria (teclas com telinha) e o inventário (cada peça é um monitor; em uso = moldura âmbar, prévia = ciano).
- **Mapa:** planetas e missões do dia. O painel do piloto leva ao Hangar.
- **Missões:** lista do que falta fazer hoje em todos os apps, agrupada por jogo. As obrigatórias aparecem primeiro, depois os extras, e as feitas ficam riscadas no fim. Tocar numa missão abre o jogo já dentro dela (link `app/#m=missao`). Um selo na aba mostra quantas faltam; com tudo feito ele vira um check verde. Cada jogo abre e fecha tocando no cabeçalho: começa aberto quando falta missão e fechado quando está completo (fechado, mostra só o progresso).
  Quando todas as missões do dia estão feitas, a aba mostra a nave em velocidade de cruzeiro, uma frase do dia, a sequência, o total de missões e quanto falta para as novas. Os desafios extras que faltam ficam em "Treino extra" e as missões feitas ficam recolhidas. Na primeira vez do dia toca uma musiquinha.
- **Hangar:** uma página só, com a chave **PILOTO | NAVE** no topo. O título, a chave, o palco e as abas de categoria ficam fixos (abaixo da Dynamic Island) enquanto a vitrine rola.
  - **Piloto (Vestiário):** exotraje com proporções humanas (inspirado em No Man's Sky, ~7 cabeças de altura, 30×86 px de arte exibidos a 2 px por pixel). Capacete com viseira escura e módulos laterais, mochila com cilindros acima dos ombros, placa de peito, ombreiras, joelheiras, botas e pulseira com tela. Personalizável: título, capacete (também colore as placas de armadura), viseira, traje, tom de pele (o queixo aparece atrás da viseira), emblema na ombreira e equipamento (lanterna, tanques de O₂, rastreador, maçarico, jetpack, antena, drone, bandeira).
  - **Nave:** a nave na plataforma. Use ◀ ▶ para trocar modelo (foguete, caça, cargueiro, disco, interceptor), pintura e propulsor.
- **Conquistas:** parede de medalhas por categoria (bronze, prata, ouro e níveis acima). Tocar numa medalha mostra o progresso e as recompensas no painel do topo; o cabeçalho (CONQUISTAS e a contagem) e o painel ficam fixos, abaixo da Dynamic Island, enquanto a parede rola.

Os jogos em que a criança aparece usam o piloto e a nave como foram customizados (hoje, o Desabamento de Numeris). A Nave-Mãe grava os desenhos prontos em `localStorage['navemae-avatar']` (`pilot` em SVG na escala 2, `ship` e `flame` na escala 1; versão `v:3`) e o jogo amplia na escala que precisar. O piloto aparece a 2 px por pixel de arte; na tela de missão cumprida ele comemora com o punho erguido (`cheer`, só cores, sem equipamento; na derrota fica a pose normal); no Desabamento a câmara cresce para caber o piloto e o teto ainda ter espaço para descer.

Missão feita aparece sempre como **FEITO**. Jogar de novo uma missão feita no dia é jogo livre: começa do zero, não guarda andamento e a missão continua feita, mesmo se a criança sair no meio.

**Peças com energia (no próprio Hangar):** PILOTO e NAVE mostram abas de categoria fixas junto do palco (capacete, viseira, traje, pele, emblema, equipamento, título; modelo, pintura, propulsor, adesivo, rastro) com ícone, a contagem de peças e um ponto âmbar quando dá para liberar algo ali. No palco, uma linha estilo painel de nave liga o nome da categoria (e da peça atual) à parte do piloto ou da nave que muda. Cada categoria é uma vitrine: EM USO, DISPONÍVEL (toque para usar; card com cor cheia) ou, se ainda não foi liberada, card rebaixado com miniatura apagada, cadeado e o preço em energia (toque para ver a prévia no palco e LIBERAR na barra de baixo; ao liberar, a peça já entra em uso). No fim da vitrine, "PRÓXIMO" leva à categoria seguinte.

- Energia por dia, por jogo: missão do dia +10, acerto de primeira +1 (até 10 por missão), turno completo +10, desafio +8; a partir do 3º dia seguido, +5 por dia. Repetir missão já feita não rende (só os acertos, com o limite).
- O cálculo sai do histórico dos jogos e fica guardado dia a dia em `st.eLed` (nunca diminui, mesmo quando o histórico antigo é apagado). Gasto em `st.spent`. Bônus de inauguração: 60.
- Quem já tinha peças liberadas por medalha continua com elas. As medalhas seguem como coleção.
- Catálogo: 114 peças (capacetes, viseiras, trajes, emblemas, equipamentos, títulos, modelos, pinturas, propulsores, adesivos e rastros), de 30 a 180 de energia.
- A aba Hangar ganha um selo com raio quando já dá para liberar alguma peça. Ao voltar dos jogos aparece "+N de energia", e a comemoração dos jogos mostra a energia ganha.

## Sons

Os três apps usam o mesmo sintetizador (`mkSYN`: notas com envelope, deslize de tom, vibrato e ruído filtrado). Cada contexto tem seu som: abas com notas diferentes, sopro ao abrir planeta, motor na decolagem, peças equipadas e bloqueadas, medalhas, dados exportados, área dos pais; nos jogos, bateria com tom subindo conforme a sala enche, equipes em acordes, esteira do hangar, raio contra o Alien, pedras com tom pelo valor do símbolo, desmoronar ao apagar, papel na tábua e contagem regressiva. Acertos seguidos sobem de tom (combo).

Volta do segundo plano: ao minimizar, o iOS interrompe o áudio do app. Ao voltar, os três apps tentam retomar; se o som continuar parado, o primeiro toque cria um áudio novo (e esse toque já faz som), sem precisar fechar o app.

Som no iPhone: a opção **Tocar no silencioso** (configurações) escolhe o modo de áudio do iOS. Desligada (padrão), os sons misturam com a música do celular e a chave de silencioso cala o app; ligada, o som sai mesmo no silencioso, mas o iOS pausa as outras mídias. O iOS não oferece a sites um modo que faça as duas coisas (o único que ignora o silencioso é o de reprodução, que não mistura). Todo contexto de áudio é criado logo depois de reafirmar o modo (`newAC()`), também quando o som é recriado ao voltar do segundo plano. A versão 20261005 desligou a opção uma vez para todos (`mig4`), já que ligada ela pausa a música.

Cada toque em botão gera uma vibração leve. No iPhone (iOS 18 ou mais recente) o Safari não tem API de vibração: cada botão recebe por dentro um `<label>` invisível que cobre o botão e aciona um `<input type=checkbox switch>` escondido, então o próprio toque do dedo cai no interruptor nativo, que vibra; o clique continua chegando ao botão. Um `MutationObserver` arma os botões criados depois. Precisa de Ajustes › Sons e Tato › Tato do Sistema ligado. No Android usa `navigator.vibrate`.

**Timbre estilo SNES:** todos os sons passam por um sintetizador comum (Nave-Mãe, jogos e fliperama). No lugar do quadrado puro (som de Atari), as ondas têm harmônicos suaves; cada nota tem duas vozes levemente desafinadas, para dar corpo; o volume cai de forma natural; um filtro tira o chiado agudo, um compressor segura os picos e um eco curto dá o ambiente, como o eco do chip de som do Super Nintendo. Frequências e momentos dos sons continuam os mesmos.

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

## Peças verdes

Para quem gosta de verde, cada categoria tem uma linha verde à venda no Hangar: capacetes Esmeralda, Floresta, Limão, Jade e Ácido; viseiras Esmeralda, Radar e Limão; trajes Esmeralda, Floresta, Limão, Jade e Ácido; emblemas Folha e Gosma; títulos Botânico Espacial, Lagarto Estelar e Guardião da Floresta; pinturas Esmeralda, Limão, Floresta, Jade e Ácido; propulsores Ácido e Esmeralda; adesivos Faixa verde, Raios verdes e Chamas verdes; rastros Gosma e Estrelas verdes (30 a 120 de energia).

## Fliperama (recompensa do dia)

Depois que o turno de missões do dia fica completo, o fliperama aparece em dois lugares: no topo da aba Missões, um cartão grande de neon (estação-fliperama flutuando, VOCÊ GANHOU 10 MIN!, ENTRAR NO FLIPERAMA) acima do TURNO COMPLETO; e na janela do mapa, um atalho de neon logo acima do mapa estelar. O terminal avisa: Fliperama liberado. Ele leva a um fliperama virtual em `fliperama/`, um jogo dentro do jogo com visual próprio (neon, carpete de fliperama):

- **A sala:** vista de cima, sempre 12 casas de largura (cabe na tela, sem rolagem para os lados) e 28 de altura; a câmera acompanha o piloto para cima e para baixo. A sala ocupa a tela inteira, abaixo do letreiro. Tem parede com letreiro de neon FLIPERAMA, oito máquinas (quatro no fundo e duas duplas no meio), garra, refrigerante, colunas de neon, mesa de hóquei, balcão de prêmios com atendente, lounge com tapete, sofá, banco, lixeira e plantas, e uma área nova perto da entrada: jukebox (toca uma música diferente a cada toque), máquina de dança com pista iluminada, salgadinhos, bebedouro, placar de recordes do piloto, cabine de fotos e luminárias. O piloto aparece pequeno, com as cores do Hangar.
- **Outros jogadores:** Kai e Zorp jogam hóquei, o robô R-0B tenta a garra, Luna e Tito passeiam, a Mel dança na máquina de dança e o Seu Nino cuida do balcão de prêmios. Ninguém atravessa ninguém.
- **Conversas** (`fliperama/conversas.js`): o texto aparece letra a letra, em páginas (A ou toque avança). Cada personagem tem uma **história** contada aos poucos, no máximo duas partes por dia (a primeira no primeiro encontro), e uma lista de **curiosidades** ditas do jeito dele, sem repetir até acabar a lista. Depois de algumas conversas, eles cumprimentam o piloto pelo nome. As histórias se cruzam: algumas partes só aparecem depois que outro personagem contou a dele (`req`), como o presente do R-0B para a Luna.
  - **Kai** (Terra, nasceu em Porto Alegre; a mãe é engenheira da estação): corpo humano, tempo, tabuada e divisão no esporte.
  - **Zorp** (planeta Glimmer): a Terra vista por um alienígena: oceanos, continentes, Amazônia, animais, plantas, Brasil.
  - **R-0B** (robô, fala em maiúsculas, quer pegar um alienzinho de pelúcia para a Luna e aprende o que é amizade): números romanos, tabuada, divisão com resto, frações, primos, binário, medidas, geometria.
  - **Luna** (quer ser astrônoma): Sol, planetas, Lua e fases, Saturno, luz, Cruzeiro do Sul, Plutão, estrelas cadentes.
  - **Tito** (gaúcho, filho do cozinheiro, horta hidropônica): ciclo da água, alimentação, capivara, chimarrão, Porto Alegre, sementes, compostagem, frações na receita.
  - **Mel** (dançarina de Salvador, monta uma banda com a turma): notas musicais, som e vibração, frações na música, samba, velocidade do som, agudo e grave, berimbau, frevo, Villa-Lobos, eco.
  - **Seu Nino** (ex-caminhoneiro espacial, balcão de prêmios): história e geografia do Brasil, pontos cardeais, acentos, dinossauros do RS, décadas e séculos.
  - O progresso de cada um fica em `navemae-arcade.npc` (`n` conversas, `arc` parte da história, `fi` curiosidade, `hoje` partes contadas no dia).
- **Máquinas fechadas:** letreiro apagado, fita de interditado na tela e plaquinha pendurada; a conversa diz EM BREVE.
- **Controles:** direcional e botão A "fantasmas", translúcidos por cima da sala (acendem quando tocados). O dedo pode deslizar entre as setas e duas setas juntas andam na diagonal em escada. A interage; quando há algo na frente, aparece um balão com A e o botão acende. Tocar na sala não move o piloto. O piloto nunca entra na faixa dos controles: a câmera o mantém acima deles e, perto do fim da sala, desce além do chão, deixando a parte de baixo da tela vazia. Na conversa, A ou toque na caixa avançam (a caixa fica acima dos controles). No computador: setas e Enter.
- **Máquinas:** a que tem jogo fica com o letreiro aceso e a tela em modo de demonstração; quando o piloto está de frente, aparece um balão com A. A conversa mostra o nome, como jogar e o recorde, com JOGAR. As outras mostram EM BREVE. Garra, refrigerante, banco e planta têm falas próprias.
- **Partida:** a tela inteira vira a frente da máquina, com o tema do jogo: em cima o letreiro iluminado com o nome (e a tecla ◂ SALA para voltar); no meio o monitor CRT na moldura preta, com placar e recorde no topo da tela, linhas de varredura, vinheta e reflexo do vidro; embaixo o painel com o **manche** e o botão **START** (começa, continua, joga de novo; pisca quando é a vez dele); no pé, a porta das fichas com o TEMPO restante. ◂ SALA durante a partida pausa; de novo, volta à sala. Deslizar o dedo na tela também controla. No computador: setas, Enter = START, Esc = voltar.
- **Manche:** o centro é onde o dedo encosta (não precisa acertar a bola). A direção só vale depois de 20 px de movimento e só troca quando um eixo vence o outro com folga; numa diagonal indecisa, mantém a direção atual. Se o dedo vai longe, o centro acompanha.
- **Tema de cada jogo:** o jogo pode trazer `tema:{cab, luz, deco}`. O Verme dos dutos usa gabinete verde-escuro industrial com luz verde-ácido (`deco:'acido'`): gosma escorrendo do letreiro, faixas de risco amarelas e pretas nas laterais e na base da máquina da sala, painel de chapa xadrez e visor verde.
- **Primeira entrada do dia:** aviso RECOMPENSA DO DIA com os minutos ganhos.
- **Tempo por dia:** definido na Área dos pais (Desligado, 5, 10, 15, 20 ou 30 min; padrão 10). Andar pela sala não gasta tempo; só a partida. Se acabar no meio, a partida vai até o fim (ÚLTIMA PARTIDA) e as máquinas não aceitam outra (FICHAS DE HOJE ACABARAM). Com 1 min restante, o relógio fica vermelho e toca um aviso.
- **Travas:** sem o turno completo de hoje, ou desligado pelos pais, a sala abre com FLIPERAMA FECHADO e as máquinas não ligam.
- **Recompensa:** só recorde pessoal por jogo, sem energia.
- **Saída:** pisar no tapete verde ou tocar em NAVE pergunta se quer voltar; volta para a aba Missões.
- **Dados:** `localStorage['navemae-arcade']` = `{day, used (segundos usados hoje), intro, pos (onde o piloto parou), best:{jogo:recorde}, plays:{jogo:partidas}}`. A liberação do dia é `navemae-v1.arcDay`, o tempo é `navemae-v1.arcMin` e as cores do piloto vêm de `navemae-avatar.ov`.

### Jogos

| Jogo | Arquivo | Como funciona |
|---|---|---|
| Hóquei de mesa | `fliperama/jogos/hoquei.js` | Jogado na mesa do meio da sala, contra o Kai e o Zorp. A mesa ocupa a tela toda (sem o painel de manche e START); tocar na mesa começa, continua e joga de novo. O rebatedor de baixo, maior, segue o dedo e fica um pouco acima dele, para não sumir embaixo; o disco também é maior, com borda amarela. Ganha a rodada quem fizer 5 gols; cada rodada vencida conta uma vitória e chama o próximo rival, mais rápido. Perder uma rodada encerra. Pontos = vitórias seguidas. O rebatedor do piloto usa a cor do capacete. |
| Verme dos dutos | `fliperama/jogos/verme.js` | Snake: um verme alien rasteja pelos dutos da estação comendo ovos. Cada ovo aumenta o corpo e a velocidade. Os dutos não têm fim: saindo por um lado, o verme entra pelo outro; só encostar no próprio corpo encerra. A cada 5 ovos, um ovo dourado aparece por pouco tempo (+3). |

### Adicionar um jogo

1. Crie `fliperama/jogos/<id>.js` chamando `ARC.add({...})`:

```js
ARC.add({id:'meujogo', name:'NOME NA TELA', unit:'PONTOS', cell:8,
  desc:'Uma frase de como jogar.',
  icon:[/* linhas de pixels do ícone do gabinete */], iconPal:{/* cor de cada letra */},
  make(api){ // api: {cv, ctx, cols, rows, cell, sfx, score(n), over()}
    return{ready(){}, start(){}, input(dir){}, pause(){}, resume(){}, stop(){}}}})
```

2. Acrescente o id na lista `JOGOS` em `fliperama/index.html`. Com `lugar:'hockey'` (o tipo de um objeto da sala), o jogo fica naquele objeto em vez de numa máquina. Com `controls:'touch'`, o manche some e o jogo recebe `touch(x,y)` em pixels da arte enquanto o dedo está na tela. O jogo ocupa a próxima máquina livre da sala (ordem em `SLOTS`: as quatro do meio, depois as do fundo).
3. Opcional: `attract(ctx,x,y,w,h,t)` desenha a tela da máquina na sala (8×7 pixels) em modo de demonstração.

`fliperama/index.html` traz cópias do motor de sprites, do sintetizador, da vibração e da correção de áudio da Nave-Mãe (o mesmo código dos jogos); ao mudar esses trechos na Nave-Mãe, copie para lá também.

A sala cuida do resto: conversa com recorde, tela do jogo do tamanho da tela do iPhone (em células de `cell` pixels, a 2 px por pixel), início ao primeiro movimento, relógio, pausa, fim de jogo e recorde. `api.score(n)` atualiza o placar e `api.over()` encerra a partida.

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

Toda navegação entre páginas leva `?v=<versão>` no endereço: a Nave-Mãe abre os jogos e o fliperama assim, e eles voltam para a Nave-Mãe assim (`../?v=<versão>#v=tasks`). Sem isso, o iPhone reabria a Nave-Mãe guardada (velha) ao voltar. Se uma página percebe que está velha, recarrega com `?v=<versão nova>`; se mesmo assim vier velha, não insiste.

## Dados

Nada é enviado para servidor. O progresso fica no `localStorage` do navegador do aparelho. Como todos os apps estão no mesmo domínio, a Nave-Mãe consegue ler o progresso de cada um.
