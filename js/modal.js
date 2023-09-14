class Modal {
  constructor(onSubmitCallback) {
    this.modal = document.getElementById('playerModal')
    this.closeBtn = document.querySelector('.close')
    this.form = document.getElementById('playerForm')
    this.playerName = ''
    this.playerEmail = ''
    this.onSubmitCallback = onSubmitCallback
    this.initEvents()
  }
  initEvents() {
    // Close modal on 'x' click
    this.closeBtn.addEventListener('click', () => this.close())
    // Limit character input for playerName
    const playerNameInput = document.getElementById('playerName')
    playerNameInput.addEventListener('input', (e) => {
      if (e.target.value.length > 8) {
        e.target.value = e.target.value.slice(0, 8)
      }
    })
    // Form submission event
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.playerName = document.getElementById('playerName').value.trim()
      this.playerEmail = document.getElementById('playerEmail').value.trim()
      // Basic validation
      if (this.validatePlayerName(this.playerName) && this.validateEmail(this.playerEmail)) {
        // Store information (You might want to use something more secure for a real application)
        localStorage.setItem('playerName', this.playerName)
        localStorage.setItem('playerEmail', this.playerEmail)
        this.close()
        // Start the game
        if (typeof this.onSubmitCallback === 'function') {
          this.onSubmitCallback(this.playerName)
        }
      } else {
        alert('Invalid input. Please enter a valid name and email.')
      }
    })
  }
  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
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
