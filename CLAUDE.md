# CONTRATEMPO© — Tema Shopify

Este repositório é o tema da loja da CONTRATEMPO, marca brasileira de moda urbana: camisetas de criação autoral, com repertório exclusivamente brasileiro.
A base é o **Dawn**, tema oficial da Shopify (Online Store 2.0). O trabalho é **adaptar a camada visual do Dawn** ao projeto da marca que está em `.contratempo/referencia/`, sem quebrar o que o Dawn já resolve: carrinho, variantes, checkout, busca, conta e acessibilidade.

O repositório está conectado à loja pela integração da Shopify com o GitHub. Cada envio (push) para o branch conectado atualiza o tema na loja. Por isso, **cada commit precisa deixar o tema funcionando**.

## Regras inegociáveis

1. **Tudo em português.** Nenhuma palavra em inglês em textos visíveis: botões, títulos, rótulos, mensagens de erro, textos alternativos, nomes de seções e de blocos no editor de temas.
   - Revise `locales/pt-BR.json` e `locales/pt-BR.schema.json` (o Dawn já traz os dois): ajuste os textos ao vocabulário da marca e adicione as chaves das seções novas. Não renomeie nem apague `en.default.json`.
   - Vocabulário da marca: **sacola** (não carrinho), lançamento (não drop), modelagem ampla (não oversized), moda urbana (não streetwear), coleção, prévia, bastidores, alto padrão (não premium), Feita no Brasil.
   - Nomes de código (classes, arquivos, variáveis) podem ficar em inglês, seguindo o padrão do Dawn.
2. **Não reescreva o núcleo do Dawn.** Não altere a lógica de `global.js`, `cart*.js`, `product-form.js`, `facets.js`, `predictive-search.js` e afins. Mudanças visuais vão em CSS e no markup das seções.
3. **Prefira criar a alterar.** Seções novas da marca levam o prefixo `ct-` (ex.: `sections/ct-hero.liquid`). Altere seções nativas do Dawn só quando for inevitável e registre no commit.
4. **Nada de conteúdo fixo no código.** Textos, imagens e links das seções `ct-` ficam em `{% schema %}`, editáveis no editor de temas. Produtos, preços, coleções e variantes vêm sempre de objetos Liquid.
5. **Cada produto tem seus dados.** Preço, cores, tamanhos, modelagem, nomes de peças e de coleções são cadastrados na Shopify, produto a produto. O tema só exibe. Os campos específicos vêm de metacampos (ver "Metacampos de produto").
6. **Acessibilidade e desempenho:** respeite `prefers-reduced-motion`, contraste, foco visível, `alt` em imagens e `image_url` + `image_tag` com `widths`.
7. Trabalhe **em etapas pequenas**, com um commit por etapa, e rode `shopify theme check` antes de cada commit, se o CLI estiver disponível.

## Regras comerciais (textos fixos do tema, editáveis nas configurações)

Crie estas configurações em `config/settings_schema.json`, num grupo "Regras da loja", com os valores padrão abaixo:

| Configuração | Valor padrão |
|---|---|
| Parcelas sem juros | 3 |
| Desconto no Pix (%) | 5 |
| Texto de frete | Frete calculado pelo CEP |
| Prazo de produção | 3 a 5 dias úteis |
| Prazo de devolução | 7 dias após a entrega |
| Prazo de reembolso | 30 dias |
| Horário de atendimento | Segunda a sexta, das 9h às 18h |
| Prazo de resposta | até 1 dia útil |
| WhatsApp | (vazio: esconde o botão enquanto não houver número) |
| Nome e CPF ou CNPJ do responsável | (vazio) |
| Endereço do vendedor | (vazio) |

- **Preço:** mostre `product.price | money` e, embaixo, "ou {parcelas}x de {preço ÷ parcelas} sem juros · {preço × (1 − desconto)} no Pix ({desconto}% de desconto)", calculado em Liquid.
- **Barra de avisos:** "COLEÇÃO 001 DISPONÍVEL · ATÉ 3X SEM JUROS · 5% DE DESCONTO NO PIX", editável.
- **Sem troca de tamanho.** É regra da marca. Mostre o aviso com borda amarela (`#F8D65B`) na página de produto, logo abaixo do seletor de tamanho, e outro na sacola, antes do resumo. Use exatamente os textos de `.contratempo/referencia/produto.html` e `.contratempo/referencia/sacola.html`.
- **Devoluções:** use o texto de "Devoluções e reembolso" de `.contratempo/referencia/produto.html`: 7 dias, postagem reversa grátis, conferência sem marcas de uso, reembolso em até 30 dias, sem cancelamento depois de iniciada a produção e reenvio cobrado por endereço incorreto.
- **Nunca** mencione o nome do fornecedor de produção em nenhum texto do tema.
- Rodapé: © {ano atual} CONTRATEMPO© · {nome e CPF ou CNPJ} · {endereço}. Enquanto não preenchidos, esconda esses campos (não mostre colchetes).

## Metacampos de produto

Leia estes campos no Liquid e esconda o bloco correspondente quando estiverem vazios. Documente no README como criá-los no painel (Configurações → Metacampos → Produtos):

| Metacampo | Tipo | Uso |
|---|---|---|
| `custom.codigo` | texto | Código da peça (CT-001…), junto ao nome |
| `custom.colecao_numero` | texto | "001", "002"… exibido como "COLEÇÃO 001" |
| `custom.tabela_medidas` | tabela/JSON ou rich text | Tabela de medidas da peça, aberta pelo botão "Tabela de medidas" |
| `custom.modelagem` | texto | Padrão: "Modelagem ampla" |
| `custom.tecnica_impressao` | texto (DTG ou DTF) | Exibido como "impressão digital feita peça por peça" (só cite a técnica se o campo pedir) |
| `custom.modelo_veste` | texto | "A modelo veste M e tem 1,70 m" |
| `custom.de_perto` | imagem | Detalhe ampliado para a faixa "Bonita de longe. Interessante de perto." (se vazio, use a primeira imagem com zoom) |
| `custom.frente_texto` | texto | O que vai na frente da peça (ex.: "a assinatura CONTRATEMPO©") |

Malha padrão (texto fixo nas informações do produto): **malha penteada fio 30.1, 100% algodão**.

## Identidade visual

### Cores
| Função | Hex |
|---|---|
| Fundo principal | `#02070A` |
| Texto e linhas | `#EEE8DA` (linhas a 15–20% de opacidade) |
| Destaque verde | `#90E04B`: botão de finalizar, links ativos, selos |
| Destaque amarelo | `#F8D65B`: avisos, destaques |
| Destaque terracota | `#CD6547`: hover, numerais |
| Verde-garrafa | `#0E2A1E` / `#163A2B`: blocos de seção |
| Fundo de miniatura | `#1F002E` |

Crie um esquema de cor escuro principal no Dawn (fundo `#02070A`, texto `#EEE8DA`) e um esquema claro (fundo `#EEE8DA`, texto `#02070A`) para faixas como "Bonita de longe". Variáveis próprias em `assets/ct-base.css`:
```css
:root{
  --ct-preto:#02070A; --ct-creme:#EEE8DA; --ct-verde:#90E04B;
  --ct-amarelo:#F8D65B; --ct-terracota:#CD6547;
  --ct-garrafa:#0E2A1E; --ct-linha:rgba(238,232,218,.2);
}
```
Sem cantos arredondados e sem sombras.

### Tipografia
- **Poppins** (400–700): títulos em caixa alta, peso 700, `letter-spacing: -0.02em`; textos corridos.
- **IBM Plex Mono** (400–500): rótulos, códigos, barra de avisos, botões, preços secundários. De 11 a 13px, caixa alta, `letter-spacing: 0.08em`.
- Configure as fontes por `font_picker` em `settings_schema.json`.

### Elementos recorrentes
- **©** depois do nome: CONTRATEMPO©.
- Logo de quatro pontos com o **terceiro ponto fora do tempo** (classes `.pulo` / `.pulo-g`, ciclo de 4s, `cubic-bezier(.6,0,.3,1)`), que é a assinatura de movimento da marca.
- **Selo giratório** (`.selo-gira`, rotação de 24s).
- Botões retangulares, altura mínima de 52px, texto em mono e caixa alta.

## Referências (`.contratempo/referencia/`)

Os HTMLs vêm de uma ferramenta de projeto visual: usam `{{variavel}}`, `<x-dc>`, `<sc-for>`, `<sc-if>`, `<helmet>` e um `support.js` que **não existe aqui**. Eles não abrem no navegador. Leia como **código-fonte de referência**: estrutura, estilos inline, textos, grades, media queries e a lógica no `<script type="text/x-dc">`. Não copie as marcações do runtime. As imagens (`/_blob/...`) não estão incluídas: use `image_picker` nas seções e as imagens dos produtos.

| Arquivo | Vira no tema |
|---|---|
| `main.html` | `templates/index.json`: barra de avisos, cabeçalho, hero, faixa de benefícios (envio, 3x, Pix, devolução), lançamento, destaques, conceito, "Parece simples. Olha de novo.", cores de malha, "Vestir bem começa nos detalhes", rodapé com cadastro de e-mail |
| `loja.html` | `templates/collection.json`: trilha, filtros nativos (Search & Discovery), grade de produtos com selo, código, preço e parcelas |
| `colecoes.html` | `templates/list-collections.json`: cartões grandes por coleção e card "Coleção 003 · em breve" (bloco editável) |
| `produto.html` | `templates/product.json`: galeria, código e coleção, preço com parcelas e Pix, cor da malha e tamanho como variantes, tabela de medidas, **aviso de sem troca de tamanho**, lista de produção, envio e devolução, cálculo de frete, sanfonas, faixa "de longe / de perto", relacionados e **gaveta da sacola** ao adicionar |
| `sacola.html` | `templates/cart.json` e gaveta: itens, quantidade, remover, aviso de produção, **aviso de tamanho**, resumo com frete, cupom e total, estado vazio |
| `busca.html` | `templates/search.json`: campo grande, sugestões, resultados e estado vazio |
| `conta.html` | `templates/customers/*`: entrar, criar conta, pedidos com andamento (recebido → em produção → enviado → entregue), endereços |
| `erro404.html` | `templates/404.json`: "Saiu do compasso." |
| `embreve.html` | `templates/password.json` e `layout/password.liquid`: página antes do lançamento |
| `manifesto.html` | `templates/page.manifesto.json` |
| `sobre.html` | `templates/page.sobre.json`: fala de **uma equipe**, sem citar nomes |

## Ordem de trabalho

1. Base: cores, fontes, `ct-base.css`, botões, campos e configurações "Regras da loja".
2. Barra de avisos, cabeçalho e rodapé.
3. Página de produto, incluindo aviso de tamanho, metacampos e gaveta da sacola.
4. Sacola.
5. Coleção, lista de coleções e busca.
6. Página inicial, com as seções `ct-` uma por vez.
7. Manifesto, Sobre, 404, senha e conta.
8. Revisão de textos em português, `theme check` e teste em celular (pontos de quebra do projeto: 1000px, 560px e 420px).
