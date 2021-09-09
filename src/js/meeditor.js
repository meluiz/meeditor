const MEEditor = {
  selector: null,
  editorConfig: {
    width: '768px',
    height: '192px',
    theme: 'light',
    defaultSparator: 'div',
  },
  target: {},
  createElement: function (elements) {
    elements.forEach((element) => {
      const node = document.createElement(element.type)
      if (element.attributes) {
        element.attributes.forEach((attribute) => {
          Object.entries(attribute).forEach(([ key, value ]) => {
            node.setAttribute(key, value)
          })
        })
      }

      this.target[element.name] = node

      if (element.parentNode) this.target[element.parentNode].appendChild(node)
      if (element.html) node.innerHTML += element.html
      if (element.children) this.createElement(element.children)
    })
  },
  createEditor: function () {
    const editor = document.createElement('div')
    const editorToolbar = document.createElement('div')
    const editorToolbarButtons = document.createElement('div')
    const editorWrapper = document.createElement('div')
    const editorWrapperContent = document.createElement('div')

    this.createElement(elements)

    this.selector.replaceWith(this.target.editor)
  },
  pressedButton: ({ currentTarget }, { content }) => {
    const pressed = currentTarget.getAttribute('aria-pressed')
    const command = currentTarget.getAttribute('data-cmd')

    if (command.startsWith('justify')) {
      document.querySelectorAll('[data-cmd]').forEach((target) => {
        const command = target.getAttribute('data-cmd')
        if (command.startsWith('justify')) target.setAttribute('aria-pressed',false)
      })
    }

    currentTarget.setAttribute('aria-pressed', pressed === 'true' ? 'false' : 'true')
    document.execCommand(command, false, null)
    content.focus()
  },
  createButtons: function () {
    const buttons = [
      [
        {
          name: 'bold',
          description: 'Negrito',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-bold',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'italic',
          description: 'Itálico',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-italic',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'underline',
          description: 'Sublinhado',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-underline',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'text',
          description: 'Mais texto',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M13 6v15h-2V6H5V4h14v2z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-extra-text',
              type: 'button',
              role: 'button',
              'aria-pressed': false,
            }
          ]
        }
      ],
      [
        {
          name: 'justifyLeft',
          description: 'Alinhar à esquerda',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-align',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'justifyCenter',
          description: 'Alinhar ao centro',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-align',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'justifyRight',
          description: 'Alinhar à direita',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-align',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
        {
          name: 'justifyFull',
          description: 'Justificado',
          value: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z"/>
            </svg>
          `,
          attributes: [
            {
              class: 'mee-button mee-button-align',
              type: 'button',
              role: 'button',
              'aria-pressed': false
            }
          ]
        },
      ]
    ]

    this.createElement(buttons)
  },
  charCounter: function (event, editor) {
    const charCounter = event.target.innerHTML.replace(/(<([^>]+)>)/gi, "").length
    editor.target.counter.textContent = charCounter
  },
  start: function({ selector, width, height, theme, defaultSparator }) {
    this.selector = document.querySelector(selector)

    this.editorConfig.width = width || this.editorConfig.width
    this.editorConfig.height = height || this.editorConfig.height
    this.editorConfig.theme = theme || this.editorConfig.theme
    this.editorConfig.defaultSparator = defaultSparator || this.editorConfig.defaultSparator

    this.createEditor(this)
    this.createButtons(this)

    return
  }
}

export default MEEditor
window.MEEditor = MEEditor