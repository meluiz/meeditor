const MEEditor = {
  selector: null,
  start: function({ selector }) {
    this.selector = document.querySelector(selector)
  }
}

export default MEEditor
window.MEEditor = MEEditor