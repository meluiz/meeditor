const MEEditor = {
  selector: null,
  target: {
    content: null,
    buttons: null
  },
  createEditor: ({ selector, target }) => {
    const editor = document.createElement('div')
    const editorToolbar = document.createElement('div')
    const editorToolbarButtons = document.createElement('div')
    const editorWrapper = document.createElement('div')
    const editorWrapperContent = document.createElement('div')

    editor.className = 'mee-box'
    editorToolbar.className = 'mee-toolbar'
    editorToolbarButtons.className = 'mee-buttons'
    editorWrapper.className = 'mee-wrapper'
    editorWrapperContent.className = 'mee-content'

    editorWrapperContent.setAttribute('contenteditable', true)

    editorToolbar.appendChild(editorToolbarButtons)
    editorWrapper.appendChild(editorWrapperContent)

    editor.appendChild(editorToolbar)
    editor.appendChild(editorWrapper)

    selector.replaceWith(editor)

    target.buttons = editorToolbarButtons
    target.content = editorWrapperContent

    return
  },
  start: function({ selector }) {
    this.selector = document.querySelector(selector)
    this.createEditor(this)

    return
  }
}

export default MEEditor
window.MEEditor = MEEditor