# Nave-Mãe

Central de apps escolares em estilo 8-bits, feita para o celular. Cada matéria é um planeta no mapa estelar, e cada planeta reúne os jogos daquela matéria.

Publicado em `https://a-hanauer.github.io/nave-mae/`.

## Apps

| Planeta | App | Pasta |
|---|---|---|
| Matemática | Estação Nostro-9 (divisão) | `nostro-9/` |
| Matemática | Ruínas de Numeris (números romanos) | `numeris/` |
| Matemática | Mina de Cristais (conta armada de divisão) | `mina/` |
| Português | Biblioteca Estelar (leitura e interpretação de texto) | `biblio/` |
| Ciências | em breve | |
| Inglês | em breve | |
| História (a Terra) | Máquina do Tempo (história de Ivoti/RS) | `ivoti/` |
| Geografia | em breve | |

## Como funciona

- **Primeiro acesso:** a criança digita o nome de piloto.
- **Mapa estelar:** mostra quantas tarefas faltam hoje em cada planeta e a sequência de dias seguidos com o turno completo. Os planetas com jogos ficam sempre no topo do mapa; os que ainda estão sem sinal vêm depois. O planeta História é a Terra (mapa-múndi em pixel com a América do Sul de frente; na tela do planeta, um ponto vermelho marca Ivoti).
- **Tela do planeta:** lista os jogos. O card inteiro é o botão que abre o jogo: ícone à esquerda; ao lado, nome, assunto e uma barra fina com o progresso do dia (n/total, com check quando completo); seta à direita. Jogo nunca aberto mostra NOVA.

Cada app tem um botão "< Nave-Mãe" na tela inicial que volta para a aba Missões (ou para o planeta, quando a criança decolou de um planeta) (o jogo recebe `r=tasks` ou `r=p.<planeta>` no endereço e a Nave-Mãe abre `#v=tasks` ou `#p=<planeta>`). Ao entrar direto numa missão pela aba Missões, o voltar da missão vira "< Missões" e leva de volta para a lista.

## Turno do dia (sorteio)

A partir de 07/10/2026, o turno tem **5 missões sorteadas** entre todos os jogos: 1 de cada planeta com jogo (Matemática, Português, História) e as outras 2 entre todas, no máximo 2 do mesmo jogo. O sorteio evita repetir as missões do dia anterior. Ele usa a data como semente (mulberry32), então a Nave-Mãe e os jogos chegam à mesma lista sem trocar dados. O bloco `PLAN_*` / `navePlan` / `reqFor` / `planDay` / `planStreak` é o mesmo na Nave-Mãe e em todos os jogos; para incluir um jogo novo no sorteio, acrescente-o em `PLAN_APPS` em todos os arquivos.

- Todas as missões continuam abertas: as que não saíram no sorteio aparecem como **TREINO EXTRA** e o planeta mostra "FORA DO TURNO HOJE · TREINO LIVRE" no jogo sem missões do dia.
- A aba Missões lista só as 5 do dia. O terminal de cada jogo mostra o turno da nave inteira (n / 5, a semana e a sequência).
- Turno completo e sequência valem para as 5 juntas. Energia: missão do turno +10 (mais bônus de acertos); treino extra +5; turno completo +10.
- Nível de Numeris e galeria da Mina: sobem a cada 6 missões principais concluídas (cada missão conta 1 vez por dia), feitas no turno ou como treino.
- Antes de 07/10/2026 valia a regra antiga (rodízio de 2 missões de cada jogo de Matemática e as 3 da Máquina do Tempo).

## Mina de Cristais

Conta armada de divisão pelo método da chave, no **processo longo**: o produto e a subtração ficam escritos embaixo de cada passo, numa folha quadriculada (cada quadrado é uma casa). Segue a BNCC EF04MA07 (divisor com até 2 algarismos). Começa com divisor de 1 algarismo; o de 2 algarismos chega na galeria 3, misturado com o de 1.

Cada passo acende uma luz **DIVIDIR · MULTIPLICAR · SUBTRAIR · BAIXAR**:

1. **Dividir:** começa sempre pelo primeiro algarismo do dividendo e escolhe o algarismo do quociente. Com divisor de 2 algarismos (galeria 3 em diante) aparece a dica de arredondar (23 ≈ 20, pense em 7 ÷ 2).
2. **Multiplicar:** digita algarismo × divisor. Se o produto passa do pedaço, a linha fica vermelha e ela diminui o algarismo.
3. **Subtrair:** digita a diferença. Se sobra um número maior ou igual ao divisor, a linha fica vermelha e ela aumenta o algarismo.
4. **Baixar:** toca no próximo algarismo do dividendo, que desce para o lado do resto.
5. Quando o divisor não cabe (inclusive no primeiro algarismo), o quociente ganha um **0**, a criança faz **− 0** e a subtração, e só então baixa o próximo — como ela aprende na escola. Ex.: 745 ÷ 23 → 7 − 0 = 7, baixa o 4; 74 − 69 = 5, baixa o 5; 55 − 46 = 9 → quociente 032 (= 32), resto 9. No fim, a tela explica que o 0 da frente não muda o número.

No fim de cada conta: quociente, resto, a **prova real** (quociente × divisor + resto = dividendo) e a frase do problema (repartir em vagonetes ou quantos vagonetes enchem).

Missões:

- **Carga guiada** (4 contas, divisor de 1 algarismo): o algarismo do quociente se escolhe com − e +, vendo uma barra do produto contra o pedaço (PASSOU! ou SOBRA N). A máquina faz a multiplicação.
- **Turno completo** (3 contas): a criança faz todos os passos. Sempre tem uma conta com 0 no quociente e, da galeria 3 em diante, uma com divisor de 2 algarismos.
- **Complete a conta** (4 contas): o robô ROB-8 armou a conta inteira e deixou uma casa vazia, já destacada: um algarismo do quociente, um produto ou uma subtração. A criança calcula só aquela casa (a guia mostra qual conta é: dividir, multiplicar ou subtrair). Errou: explica; na segunda vez, mostra a resposta para digitar. Ver o processo pronto e completar um passo ajuda quem está começando.
- **Tempestade** (desafio opcional): 3 contas completas antes da tempestade chegar à mina. Cada passo certo afasta a nuvem; cada erro aproxima.

Galerias (níveis): 1) divisor de 1 algarismo, dividendo até 999; 2) divisor de 1 algarismo, dividendo até 9999; 3) entra o divisor de 2 algarismos, até 19; 4) divisor de 2 algarismos até 99. Sobe a cada 6 missões concluídas. Os pais podem trocar a galeria na área dos pais (por exemplo, liberar o divisor de 2 algarismos antes).

Erros guardados por tipo (`errM`) para a área dos pais: estimativa alta, estimativa baixa, zero no quociente, multiplicação, subtração, baixar o algarismo e, em Complete a conta, o tipo de casa que errou.

Saindo no meio, a missão continua da conta em que parou. Se a criança sai na tela da última conta, a missão é entregue quando ela voltar.

## Máquina do Tempo (planeta História)

Jogo sobre a história de Ivoti/RS para uma criança de 9 anos. História pede menos teste e mais narrativa, então o jogo combina:

- **Narrativa:** o conteúdo vem como capítulos de uma viagem no tempo, com cena em pixel art e texto curto.
- **Um capítulo novo por dia:** espaça o conteúdo novo.
- **Recuperação espaçada:** cada pergunta vira uma ficha que volta no Arquivo da memória depois de 1, 1, 3, 7, 14 e 30 dias (acertou: sobe de gaveta; errou: volta para a primeira).
- **Linha do tempo:** ordenar acontecimentos treina a noção de antes e depois.
- **Lugar real e história oral:** o Passaporte de Ivoti leva a visitas e a uma entrevista com a família.

Missões (entram no sorteio do turno):

- **Diário da viagem:** abertura com a "viagem no tempo" até o ano do capítulo; páginas com cena e texto em papel antigo; a última página traz a palavra nova; no fim, 3 a 5 perguntas. Capítulos já lidos podem ser relidos tocando neles no menu; com os 12 lidos, o Diário relê o capítulo visto há mais tempo.
- **Linha do tempo:** 3 rodadas; a criança toca no acontecimento mais antigo que falta, até a linha ficar completa. Usa só acontecimentos dos capítulos já lidos e sempre inclui um do capítulo mais recente.
- **Arquivo da memória:** até 6 fichas por dia, primeiro as vencidas.
- **Desafio opcional, Monte a casa enxaimel:** alicerce, madeiras em pé, vigas, diagonais, pregos de pau, preenchimento com barro ou tijolo e telhado; depois, 3 perguntas do mestre carpinteiro.

Capítulos: 1 Pouso em Ivoti (visão geral e linha do tempo) · 2 Os primeiros moradores (Tradição Umbu, há ~12 mil anos; Guarani e Kaingang) · 3 A grande viagem (Hunsrück, 25/07/1824 em São Leopoldo) · 4 A Picada dos Berghahn (1826, 48 lotes no Arroio Feitoria) · 5 Casas de enxaimel (Feitoria Nova, 1826–1950; museu de 1995) · 6 Igrejas e língua (1846, 1857, 1868; dialeto do Hunsrück) · 7 A Ponte do Imperador (1857–1864, 148 m, três arcos, 30 contos de réis de D. Pedro II, IPHAN 1986) · 8 Bom Jardim (1867, distrito de São Leopoldo) · 9 Ivoti quer dizer flor (1938) · 10 Ivoti vira cidade (plebiscito 12/07/1964, lei 19/10/1964, posse 26/01/1965) · 11 Vizinhos do Japão (1966, famílias Sasada e Tanisaki; Memorial de 2011) · 12 Ivoti hoje (1992: Lindolfo Collor e Presidente Lucena; calçados, feiras).

Fontes: páginas da Prefeitura de Ivoti (Ponte do Imperador, Núcleo de Casas Enxaimel, Museu Cláudio Oscar Becker, Memorial da Colônia Japonesa), Wikipédia (Ivoti e Colônia Ivoti) e Cidades do Meu Brasil. Quando as fontes divergem (ano da ponte), vale a da Prefeitura. O conteúdo fica em `CAPS`, `EVENTS`, `PASS` e `CASA_Q`, no começo do script de `ivoti/index.html`.

**Passaporte de Ivoti:** 6 carimbos (Ponte do Imperador, Núcleo de Casas Enxaimel, Museu Cláudio Oscar Becker, Memorial da Colônia Japonesa, Feira das Flores e Entrevista com a família). Um adulto confirma na área dos pais (Máquina do Tempo › Passaporte de Ivoti › Confirmar visita). Na próxima vez que o jogo abre, aparece "CARIMBO NOVO!". Cada carimbo vale +15 de energia. Medalhas de honra: Máquina do Tempo (3, 6 e 12 capítulos) e Passaporte de Ivoti (1, 3 e 6 carimbos).

## Biblioteca Estelar (planeta Português)

Leitura e interpretação de texto. A biblioteca recebe "transmissões" da nave: 15 textos originais de gêneros variados (bilhete, receita, conto, diário, notícia, poema, carta, instruções, texto informativo), escritos para 9 anos. Os textos **crescem com o nível**: 1) textos curtos (6 textos); 2) médios (5); 3) longos (4). Sobe de nível depois de 3 Leituras com 3 acertos ou mais. O texto sempre vem antes das perguntas, e o botão de seguir só libera depois de alguns segundos (dá tempo de ler). Não há narração: a criança lê.

Missões:

- **Leitura da transmissão:** lê um texto (primeiro os ainda não lidos) e responde 4 perguntas, umas de informação do texto ("está escrito no texto"), outras de inferência ("pense e responda"). Depois de responder, aparece a frase do texto que traz a pista. VER TEXTO reabre o texto a qualquer momento.
- **Palavra misteriosa:** 3 palavras difíceis, cada uma no trecho em que aparece; a criança escolhe o sentido pelo contexto. As palavras vão para o **Caderno de palavras**.
- **Ordem dos fatos:** 2 textos narrativos ou de instruções; depois de ler, toca nos fatos na ordem em que aconteceram.
- **Detetive** (desafio opcional): 3 casos; responde e depois toca na frase do texto que prova a resposta. No segundo erro, a frase certa pisca.

Erros guardados por tipo (`errM`): informação do texto, inferência, palavra, ordem dos fatos e achar a frase que prova. O conteúdo fica em `TEXTS`, no começo do script de `biblio/index.html`.

## Abas

A barra inferior tem quatro abas:

- **Cockpit:** a interface é o cockpit de uma nave industrial (casco de metal escuro, luzes e telas CRT) e o conteúdo é a vista pelo para-brisa.
  - **Painel de cima** (fixo, abaixo da Dynamic Island): luzes piscando em quatro cores, uma tela CRT verde com o nome da tela atual e o número dela (missões feitas, energia, medalhas), a tecla de configurações no mapa e a tecla ◂ MAPA no planeta.
  - **Para-brisa:** colunas de metal dos lados e cantos chanfrados em degrau, com rebites, como a moldura de uma cabine.
  - **Console de baixo:** cada aba é uma tecla embutida com telinha; a tela atual acende a telinha e o LED âmbar. Faixas de alerta âmbar nas pontas e grade de ventilação na faixa da barra de início.
  - Configurações, avisos, a barra de LIBERAR e o terminal do mapa são monitores com moldura de metal e parafusos.
  - **Painel do mapa:** piloto e terminal ficam numa tela só (fósforo verde): retrato, título, nome, HANGAR ▸ e a sequência em cima; linha tracejada; mensagem do terminal embaixo. Tocar no piloto abre o Hangar.
  - **Janela × interior:** só o que é vista de fora fica no para-brisa com estrelas: o mapa, o planeta e o palco do Hangar (este com moldura chanfrada própria). O que o piloto opera é interior do cockpit, em metal com monitores: o painel do piloto e o terminal do mapa (fixos logo acima do console, a janela do mapa rola entre o painel de cima e eles), Missões, Conquistas, Configurações, as teclas PILOTO | NAVE, as abas de categoria (teclas com telinha) e o inventário (cada peça é um monitor; em uso = moldura âmbar, prévia = ciano).
- **Mapa:** planetas e missões do dia. O painel do piloto leva ao Hangar.
- **Missões:** lista do que falta fazer hoje em todos os apps, agrupada por jogo. As obrigatórias aparecem primeiro, depois os extras, e as feitas ficam riscadas no fim. Tocar numa missão abre o jogo já dentro dela (link `app/#m=missao`). Um selo na aba mostra quantas faltam; com tudo feito ele vira um check verde. Cada jogo abre e fecha tocando no cabeçalho: começa aberto quando falta missão e fechado quando está completo (fechado, mostra só o progresso).
  Quando todas as missões do dia estão feitas, a aba mostra a nave em velocidade de cruzeiro, uma frase do dia, a sequência, o total de missões e quanto falta para as novas. Os desafios extras que faltam ficam em "Treino extra" e as missões feitas ficam recolhidas. Na primeira vez do dia toca uma musiquinha.
- **Hangar:** uma página só, com a chave **PILOTO | NAVE** no topo. O título, a chave, o palco e as abas de categoria ficam fixos (abaixo da Dynamic Island) enquanto a vitrine rola.
  - **Piloto (Vestiário):** exotraje com proporções humanas (inspirado em No Man's Sky, ~7 cabeças de altura, 30×86 px de arte exibidos a 2 px por pixel). Capacete com viseira escura e módulos laterais, mochila com cilindros acima dos ombros, placa de peito, ombreiras, joelheiras, botas e pulseira com tela. Personalizável: título, capacete (também colore as placas de armadura), viseira, traje, tom de pele (o queixo aparece atrás da viseira), emblema na ombreira e equipamento (lanterna, tanques de O₂, rastreador, maçarico, jetpack, antena, drone, bandeira).
  - **Nave:** a nave na plataforma. Use ◀ ▶ para trocar modelo (foguete, caça, cargueiro, disco, interceptor), pintura e propulsor.
- **Conquistas:** parede de medalhas por categoria (bronze, prata, ouro e níveis acima). Tocar numa medalha mostra o progresso e as recompensas no painel do topo; o cabeçalho (CONQUISTAS e a contagem) e o painel ficam fixos, abaixo da Dynamic Island, enquanto a parede rola.

Os jogos em que a criança aparece usam o piloto e a nave como foram customizados (o Desabamento de Numeris, a Tempestade da Mina de Cristais e o fliperama). A Nave-Mãe grava os desenhos prontos em `localStorage['navemae-avatar']` (`pilot` em SVG na escala 2, `ship` e `flame` na escala 1; versão `v:3`) e o jogo amplia na escala que precisar. O piloto aparece a 2 px por pixel de arte; na tela de missão cumprida ele comemora com o punho erguido (`cheer`, só cores, sem equipamento; na derrota fica a pose normal); no Desabamento a câmara cresce para caber o piloto e o teto ainda ter espaço para descer.

No menu de cada jogo, a mensagem do terminal e o turno do dia ficam numa tela só, na estética de tela de computador (fósforo da cor do jogo): mensagem, linha tracejada, "TURNO DE HOJE" com a contagem, os 7 dias da semana e a sequência. Assim a primeira missão fica mais perto do topo.

O logo de cada jogo é o mesmo ícone do card do jogo na tela do planeta (quadro de 72 px, ícone a 4 px por pixel); o desenho fica em `HUB_ICON` no jogo e em `SPR` na Nave-Mãe.

Os cards de missão seguem o mesmo padrão nos quatro jogos: ícone num quadro de 56 px à esquerda (no maior tamanho nítido que cabe), título em Press Start 10, subtítulo em VT 20 e status embaixo (FEITO, PRÓXIMA, CONTINUAR · n/total, TREINO EXTRA ou A FAZER), nas cores do jogo. O card do desafio também: "DESAFIO OPCIONAL" com o FEITO à direita, título em maiúsculas, subtítulo e ícone num quadro de 56 px à direita.

Missão feita aparece sempre como **FEITO**. Jogar de novo uma missão feita no dia é jogo livre: começa do zero, não guarda andamento e a missão continua feita, mesmo se a criança sair no meio.

**Peças com energia (no próprio Hangar):** PILOTO e NAVE mostram abas de categoria fixas junto do palco (capacete, viseira, traje, pele, emblema, equipamento, título; modelo, pintura, propulsor, adesivo, rastro) com ícone, a contagem de peças e um ponto âmbar quando dá para liberar algo ali. No palco, uma linha estilo painel de nave liga o nome da categoria (e da peça atual) à parte do piloto ou da nave que muda. Cada categoria é um carrossel que rola para os lados, com altura fixa (a tela do Hangar não rola): EM USO, DISPONÍVEL (toque para usar) ou, se ainda não foi liberada, card apagado com cadeado e o preço. Tocar numa bloqueada mostra a prévia no palco e o card vira LIBERAR ⚡ (ou FALTAM ⚡ se não der); tocar de novo libera e a peça já entra em uso. O último card leva à próxima categoria. O nome do piloto agora se edita nas configurações (Nome do piloto).

- Energia por dia, por jogo: missão do turno +10, treino extra +5, carimbo do Passaporte de Ivoti +15, acerto de primeira +1 (até 10 por missão), turno completo +10, desafio +8; a partir do 3º dia seguido, +5 por dia. Repetir missão já feita não rende (só os acertos, com o limite).
- O cálculo sai do histórico dos jogos e fica guardado dia a dia em `st.eLed` (nunca diminui, mesmo quando o histórico antigo é apagado). Gasto em `st.spent`. Bônus de inauguração: 60.
- Quem já tinha peças liberadas por medalha continua com elas. As medalhas seguem como coleção.
- Catálogo: 114 peças (capacetes, viseiras, trajes, emblemas, equipamentos, títulos, modelos, pinturas, propulsores, adesivos e rastros), de 30 a 180 de energia.
- A aba Hangar ganha um selo com raio quando já dá para liberar alguma peça. Ao voltar dos jogos aparece "+N de energia", e a comemoração dos jogos mostra a energia ganha.

## Sons

Os apps usam o mesmo sintetizador (`mkSYN`: notas com envelope, deslize de tom, vibrato e ruído filtrado). Cada contexto tem seu som: abas com notas diferentes, sopro ao abrir planeta, motor na decolagem, peças equipadas e bloqueadas, medalhas, dados exportados, área dos pais; nos jogos, bateria com tom subindo conforme a sala enche, equipes em acordes, esteira do hangar, raio contra o Alien, pedras com tom pelo valor do símbolo, desmoronar ao apagar, papel na tábua e contagem regressiva; na Mina, cristal ao separar, algarismo descendo, vagonetes saindo e trovão na tempestade. Acertos seguidos sobem de tom (combo).

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
- **Jogo:** números do jogo, missões, gráfico dos últimos 14 dias, erros mais comuns, troca de nível (Numeris e Mina de Cristais) e apagar histórico do jogo.
- **Missão:** acerto, respostas, dias concluída, última vez, acerto por dia (14 dias) e o que mais errou. Os botões no topo trocam entre as missões do jogo.

Faixas: Ótimo (85% ou mais), Bom (65% a 84%), Atenção (abaixo de 65%), Poucos dados (menos de 5 respostas).

Para isso, cada jogo grava no seu `localStorage` um `log` diário (`{data:{missao:[respostas,certas]}}`) e os erros por missão (`errM`). Esses dois começaram a ser gravados nesta versão; os totais e os erros gerais vêm de antes.

Ao criar um app novo, informe em `APPS` o campo `store` com a chave do `localStorage` do app, para ele entrar no backup.

## iPhone

Abra o link no Safari, toque em Compartilhar e escolha **Adicionar à Tela de Início**. A Nave-Mãe abre em tela cheia, com ícone próprio, e os apps abrem dentro dela.

## Naves

As naves são desenhadas por formas (como o piloto), com luz vindo de cima à esquerda e as rampas da pintura, em duas resoluções do mesmo desenho: **grande** (48 de largura, a 2 px por pixel, o mesmo grão do piloto) no Hangar e nas telas grandes, e **pequena** (18 de largura) no mapa, no logo e nas miniaturas. Cada modelo tem o fogo saindo dos próprios propulsores. Adesivos e pinturas valem para todos.

| Modelo | Como liberar |
|---|---|
| Foguete | inicial |
| Caça | 10 missões |
| Cargueiro | 7 dias seguidos |
| Disco | 15 missões |
| Interceptor | 75 missões |
| Lançadeira (asas curtas e porta de carga) | 50 de energia |
| Sonda (núcleo redondo e painéis solares) | 50 |
| Explorador (casco largo e motores em cápsulas, estilo No Man's Sky) | 80 |
| Besouro (casco redondo com élitros, antenas e patinhas) | 80 |
| Cruzador (asas em delta e cauda dupla) | 120 |
| Raia (asa curva em forma de raia) | 180 |

## Peças verdes

Para quem gosta de verde, cada categoria tem uma linha verde à venda no Hangar: capacetes Esmeralda, Floresta, Limão, Jade e Ácido; viseiras Esmeralda, Radar e Limão; trajes Esmeralda, Floresta, Limão, Jade e Ácido; emblemas Folha e Gosma; títulos Botânico Espacial, Lagarto Estelar e Guardião da Floresta; pinturas Esmeralda, Limão, Floresta, Jade e Ácido; propulsores Ácido e Esmeralda; adesivos Faixa verde, Raios verdes e Chamas verdes; rastros Gosma e Estrelas verdes (30 a 120 de energia).

## Fliperama (recompensa do dia)

Depois que o turno de missões do dia fica completo, o fliperama aparece em dois lugares: no topo da aba Missões, um cartão grande de neon (estação-fliperama flutuando, VOCÊ GANHOU 10 MIN!, ENTRAR NO FLIPERAMA) acima do TURNO COMPLETO; e na janela do mapa, um atalho de neon logo acima do mapa estelar. O terminal avisa: Fliperama liberado. Ele leva a um fliperama virtual em `fliperama/`, um jogo dentro do jogo com visual próprio (neon, carpete de fliperama):

- **A sala:** vista de cima, sempre 12 casas de largura (cabe na tela, sem rolagem para os lados) e 28 de altura; a câmera acompanha o piloto para cima e para baixo. A sala ocupa a tela inteira, abaixo do letreiro. Tem parede com letreiro de neon FLIPERAMA, oito máquinas (quatro no fundo e duas duplas no meio), garra, refrigerante, colunas de neon, mesa de hóquei, balcão de prêmios com atendente, lounge com tapete, sofá, banco, lixeira e plantas, e uma área nova perto da entrada: jukebox (toca uma música diferente a cada toque), máquina de dança com pista iluminada, salgadinhos, bebedouro, placar de recordes do piloto, cabine de fotos e luminárias. O piloto aparece pequeno, com as cores do Hangar.
- **Outros jogadores:** Kai e Zorp jogam hóquei, o robô R-0B tenta a garra, Luna e Tito passeiam, a Mel dança na máquina de dança e o Seu Nino cuida do balcão de prêmios. Ninguém atravessa ninguém. Perto do piloto eles andam devagar (até 3 casas) e esperam mais entre os passeios; com o piloto do lado (até 2 casas), ficam parados.
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
- **Telas da partida:** cartões com botões grandes, na cor da luz da máquina. Antes de jogar: nome, como jogar e JOGAR (ou mexer/tocar para começar). Pausa (tecla ◂ SALA durante a partida): pontos, tempo, CONTINUAR e VOLTAR À SALA. Fim: FIM DE JOGO ou NOVO RECORDE! (com estrelas), os pontos grandes, o recorde (ou o anterior) e o tempo restante, com JOGAR DE NOVO (começa direto) e VOLTAR À SALA; sem tempo, só VOLTAR. Os botões do fim ficam travados por 0,7 s para um toque do jogo não apertar sem querer; tocar fora deles não faz nada.
- **Manche:** o centro é onde o dedo encosta (não precisa acertar a bola). A direção só vale depois de 20 px de movimento e só troca quando um eixo vence o outro com folga; numa diagonal indecisa, mantém a direção atual. Se o dedo vai longe, o centro acompanha.
- **Tema de cada jogo:** o jogo pode trazer `tema:{cab, luz, deco}`. O Verme dos dutos usa gabinete verde-escuro industrial com luz verde-ácido (`deco:'acido'`): gosma escorrendo do letreiro, faixas de risco amarelas e pretas nas laterais e na base da máquina da sala, painel de chapa xadrez e visor verde.
- **Entrada:** ao abrir o fliperama, o piloto sempre aparece no tapete da porta (som da porta) e dá um passo para dentro.
- **Primeira entrada do dia:** aviso RECOMPENSA DO DIA com os minutos ganhos.
- **Tempo por dia:** definido na Área dos pais (Desligado, 5, 10, 15, 20 ou 30 min; padrão 10). Andar pela sala não gasta tempo; só a partida. Se acabar no meio, a partida vai até o fim (ÚLTIMA PARTIDA) e as máquinas não aceitam outra (FICHAS DE HOJE ACABARAM). Com 1 min restante, o relógio fica vermelho e toca um aviso.
- **Travas:** sem o turno completo de hoje, ou desligado pelos pais, a sala abre com FLIPERAMA FECHADO e as máquinas não ligam.
- **Recompensa:** só recorde pessoal por jogo, sem energia.
- **Saída:** pisar no tapete verde ou tocar em NAVE pergunta se quer voltar; volta para a aba Missões.
- **Dados:** `localStorage['navemae-arcade']` = `{day, used (segundos usados hoje), intro, best:{jogo:recorde}, plays:{jogo:partidas}}`. A liberação do dia é `navemae-v1.arcDay`, o tempo é `navemae-v1.arcMin` e as cores do piloto vêm de `navemae-avatar.ov`.

### Jogos

| Jogo | Arquivo | Como funciona |
|---|---|---|
| Patrulha Estelar | `fliperama/jogos/patrulha.js` | Tiro de nave vista de cima (Star Fox, jogos de nave de fliperama), com a nave do Hangar (modelo, pintura, adesivo e fogo). O dedo arrasta a nave, que fica um pouco acima dele e atira sozinha. Infinito: a cada 20 s sobe o nível (mais inimigos, mais rápidos e resistentes); a cada 5 níveis, uma nave-mãe inimiga. Inimigos: drones em fila, caças em zigue-zague, atiradores que miram, kamikazes que perseguem (nível 4+) e asteroides (nível 3+; os grandes se partem). 3 corações (até 5); levar dano tira 1 coração e 1 nível de tiro. Itens: **P** tiro mais forte (até 5: duplo, triplo, leque, laser), **♥** vida, **◆** escudo por 6 s. Gabinete azul com luz laranja e faixas de luz de pista. |
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
 url:'leitura/', store:'leitura-stats-v1', desc:'Descrição curta.',
 tasks:[{id:'m1',n:'Missão 1',sub:'...'}, /* ... */ {id:'desafio',n:'Desafio',sub:'...',opt:true}]}
```

O progresso (`progress()`) sai sozinho de `store`: o app guarda os dias em `days[AAAA-MM-DD] = [missões feitas]`. Para o jogo entrar no sorteio do turno, acrescente-o em `PLAN_APPS` (id, planeta, store, missões principais) na Nave-Mãe e em todos os jogos.

Os ids dos planetas são `mat`, `por`, `cie`, `ing`, `his` e `geo`.

3. Liste as missões do app no campo `tasks` (id, nome, subtítulo e `opt:true` para extras). No app, leia `#m=<id>` no carregamento para abrir a missão direto.
4. Na tela inicial do app, inclua o link de volta: `<a href="../">&lt; Nave-Mãe</a>`.

## Publicar uma versão nova

Antes de cada commit, rode `python3 bump.py`. Ele grava uma versão nova em `version.json` e nos apps. Quem estiver com o app aberto (inclusive pelo atalho da Tela de Início) recarrega sozinho quando a versão publicada muda.

No navegador comum (fora do atalho da Tela de Início), os apps marcam `html.web` e usam menos folga no topo (sem Dynamic Island nem desfoque ali); no atalho (`html.app`) a folga extra continua.

Toda navegação entre páginas leva `?v=<versão>` no endereço: a Nave-Mãe abre os jogos e o fliperama assim, e eles voltam para a Nave-Mãe assim (`../?v=<versão>#v=tasks`). Sem isso, o iPhone reabria a Nave-Mãe guardada (velha) ao voltar. Se uma página percebe que está velha, recarrega com `?v=<versão nova>`; se mesmo assim vier velha, não insiste.

## Dados

Nada é enviado para servidor. O progresso fica no `localStorage` do navegador do aparelho. Como todos os apps estão no mesmo domínio, a Nave-Mãe consegue ler o progresso de cada um.
