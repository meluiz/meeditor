# ME Editor
### Apenas mais um simples ritch-text editor.
<br />

**Esse editor foi criado para fins de estudos.** Com base nisso, o projeto proderá sofrer diversas atualizações com melhorias no código e com novas ferramentas.

<br />

**Não é recomendado o uso desse editor para sites em produção**

[Demonstração](https://meluiz.github.io/meeditor/)

# Comece
Inclua os arquivos `meeditor.min.css` e `meeditor.min.js` no `<head>` da sua página.

```html
<head>
  …
  <!-- jsDelivr  -->
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/meluiz/meeditor/dist/meeditor.min.css">
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/meluiz/meeditor/dist/meeditor.min.js"></script>

  
  <!-- Unpkg  -->
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@meluiz/meeditor@1.0.0/dist/meeditor.min.css">
  <script type="text/javascript" src="https://unpkg.com/@meluiz/meeditor@1.0.0/dist/meeditor.min.js"></script>
</head>
```

`meeditor.min.css` inclui os estilos padrão para o toolbar, editor e seus anexos. Você pode ignorar arquivo caso queira definir um estilo próprio para seu editor.

## Criando o editor

Você pode iniciar seu editor em qualquer elemento da sua página web, basta definir um identificador único para esse elemento.

```html
<body>
  <div id="editor"></div>
</body>
```

Em seguida, basta abrir uma tag `<script>` em seu body e chamar a função `MEEditor.start()` do objeto global passando um objeto com o parâmetro `selector: seletor`.

```html
<body>
  <div id="editor"></div>
  <script>
    MEEditor.start({
      selector: '#editor'
    })
  </script>
</body>
```

Pronto, seu editor foi criado com sucesso.

## Autor
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/meluiz">
        <img src="https://avatars.githubusercontent.com/u/52682525?v=4" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Luiz Felipe</b>
        </sub>
      </a>
    </td>
  </tr>
</table>