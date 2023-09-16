class Modal {
  constructor(onSubmitCallback) {
    if (typeof onSubmitCallback !== 'function') {
      throw new Error('onSubmitCallback must be a function')
    }

    this.modal = document.getElementById('playerModal')
    this.closeBtn = document.querySelector('.close')
    this.form = document.getElementById('playerForm')
    this.playerNameInput = document.getElementById('playerName')
    this.playerEmailInput = document.getElementById('playerEmail')
    this.onSubmitCallback = onSubmitCallback
    this.initEvents()
  }

  initEvents() {
    this.closeBtn.addEventListener('click', () => this.close())

    this.playerNameInput.addEventListener('input', (e) => {
      if (e.target.value.length > 8) {
        e.target.value = e.target.value.slice(0, 8)
      }
    })

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const playerName = this.playerNameInput.value.trim()
      const playerEmail = this.playerEmailInput.value.trim()

      const isNameValid = this.validatePlayerName(playerName)
      const isEmailValid = await this.validateEmail(playerEmail)

      if (isNameValid && isEmailValid) {
        localStorage.setItem('playerName', playerName)
        localStorage.setItem('playerEmail', playerEmail)
        this.close()
        this.onSubmitCallback(playerName)
      } else {
        // Display validation error message
      }
    })
  }

  async validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email.trim())
  }

  validatePlayerName(name) {
    return name.length > 0 && name.length <= 8
  }

  open() {
    this.modal.style.display = 'block'
  }

  close() {
    this.modal.style.display = 'none'
  }
}
