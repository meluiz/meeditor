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
      if (element.events) node.addEventListener(element.events.listener, element.events.function)
      if (element.html) node.innerHTML += element.html
      if (element.children) this.createElement(element.children)
    })
  },
  createEditor: function () {
    const elements = [
      {
        name: 'editor',
        type: 'div',
        parentNode: null,
        attributes: [
          { class: 'mee-box' },
          { theme: this.editorConfig.theme }
        ],
        children: [
          {
            name: 'editorToolbar',
            type: 'div',
            parentNode: 'editor',
            attributes: [
              { class: 'mee-toolbar' },
              { role: 'group' }
            ],
            children: [
              {
                name: 'editorToolbarOverlord',
                type: 'div',
                parentNode: 'editorToolbar',
                attributes: [
                  { class: 'mee-toolbar-overlord' },
                  { role: 'group' },
                  { 'aria-disabled': 'false' }
                ],
                children: [
                  {
                    name: 'editorToolbarGroups',
                    type: 'div',
                    parentNode: 'editorToolbarOverlord',
                    attributes: [
                      { class: 'mee-toolbar-groups' },
                      { role: 'group' }
                    ],
                    children: [
                      {
                        name: 'editorToolbarFormatting',
                        type: 'div',
                        parentNode: 'editorToolbarGroups',
                        attributes: [
                          { class: 'mee-toolbar-group' },
                          { title: 'formatting' },
                          { role: 'toolbar' },
                        ],
                        children: null
                      },
                      {
                        name: 'editorToolbarAlignment',
                        type: 'div',
                        parentNode: 'editorToolbarGroups',
                        attributes: [
                          { class: 'mee-toolbar-group' },
                          { title: 'alignment' },
                          { role: 'toolbar' },
                        ],
                        children: null
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: 'editorWrapper',
            type: 'div',
            parentNode: 'editor',
            attributes: [
              { class: 'mee-wrapper' }
            ],
            children: [
              {
                name: 'editorWrapperContent',
                type: 'div',
                parentNode: 'editorWrapper',
                attributes: [
                  { class: 'mee-content' },
                  { contenteditable: true },
                  { spellcheck: false }
                ],
                children: null
              }
            ]
          },
          {
            name: 'editorFooter',
            type: 'div',
            parentNode: 'editor',
            attributes: [
              { class: 'mee-footer' }
            ],
            children: [
              {
                name: 'editorFooterChar',
                type: 'div',
                parentNode: 'editorFooter',
                attributes: [
                  { class: 'mee-counter' }
                ],
                children: [
                  {
                    name: 'editorFooterCounter',
                    type: 'span',
                    parentNode: 'editorFooterChar',
                    attributes: null,
                    children: null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    this.createElement(elements)
    this.selector.replaceWith(this.target.editor)
  },
  pressedButton: function ({ currentTarget }, content) {
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
      {
        name: 'boldButton',
        type: 'button',
        parentNode: 'editorToolbarFormatting',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-bold' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Negrito' },
          { 'data-cmd': 'bold' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'italicButton',
        type: 'button',
        parentNode: 'editorToolbarFormatting',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-italic' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Itálico' },
          { 'data-cmd': 'italic' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'underlineButton',
        type: 'button',
        parentNode: 'editorToolbarFormatting',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-underline' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Sublinhado' },
          { 'data-cmd': 'underline' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'justifyLeftButton',
        type: 'button',
        parentNode: 'editorToolbarAlignment',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-align' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Alinha à esquerda' },
          { 'data-cmd': 'justifyLeft' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M3 4h18v2H3V4zm0 15h14v2H3v-2zm0-5h18v2H3v-2zm0-5h14v2H3V9z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'justifyCenterButton',
        type: 'button',
        parentNode: 'editorToolbarAlignment',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-align' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Sublinhado' },
          { 'data-cmd': 'justifyCenter' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M3 4h18v2H3V4zm2 15h14v2H5v-2zm-2-5h18v2H3v-2zm2-5h14v2H5V9z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'justifyRightButton',
        type: 'button',
        parentNode: 'editorToolbarAlignment',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-align' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Alinhar à direita' },
          { 'data-cmd': 'justifyRight' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M3 4h18v2H3V4zm4 15h14v2H7v-2zm-4-5h18v2H3v-2zm4-5h14v2H7V9z"/>
          </svg>
        `,
        children: null
      },
      {
        name: 'justifyFullButton',
        type: 'button',
        parentNode: 'editorToolbarAlignment',
        events: {
          listener: 'click',
          function: (event) => this.pressedButton(event, this.target.editorWrapperContent)
        },
        attributes: [
          { class: 'mee-button mee-button-align' },
          { type: 'button' },
          { role: 'button' },
          { title: 'Justificar' },
          { 'data-cmd': 'justifyFull' },
          { 'aria-pressed': false }
        ],
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M3 4h18v2H3V4zm0 15h18v2H3v-2zm0-5h18v2H3v-2zm0-5h18v2H3V9z"/>
          </svg>
        `,
        children: null
      } 
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