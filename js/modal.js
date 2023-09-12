class Modal {
  constructor() {
    this.modal = document.getElementById('playerModal')
    this.closeBtn = document.querySelector('.close')
    this.form = document.getElementById('playerForm')
    this.playerName = ''
    this.playerEmail = ''
    this.initEvents()
  }

  initEvents() {
    // Close modal on 'x' click
    this.closeBtn.addEventListener('click', () => this.close())

    // Form submission event
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.playerName = document.getElementById('playerName').value.trim()
      this.playerEmail = document.getElementById('playerEmail').value.trim()

      // Basic validation
      if (this.playerName && this.validateEmail(this.playerEmail)) {
        // Store information (You might want to use something more secure for a real application)
        localStorage.setItem('playerName', this.playerName)
        localStorage.setItem('playerEmail', this.playerEmail)

        // Display player name at the top of the game canvas
        c.fillStyle = 'white'
        c.font = '16px Arial'
        c.fillText(`Player: ${this.playerName}`, 10, 20)

        this.close()
      } else {
        alert('Invalid input. Please enter valid name and email.')
      }
    })
  }

  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  open() {
    this.modal.style.display = 'block'
  }

  close() {
    this.modal.style.display = 'none'
  }
}

// Initialize and open the modal
const playerModal = new Modal()
playerModal.open()
