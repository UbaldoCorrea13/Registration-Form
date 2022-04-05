class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos()
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposSaoValidos()
    const senhasValidas = this.senhasSaoValidas()

    if (camposValidos && senhasValidas) {
      alert('Formulário enviado.')
      this.formulario.submit()
    }
  }

  senhasSaoValidas() {
    let valid = true

    const senha = this.formulario.querySelector('.senha')
    const repetirSenha = this.formulario.querySelector('.repetir-senha')

    if (senha.value !== repetirSenha.value) {
      valid = false
      this.criaErro(
        senha,
        'Password and repeat password fields must be the same.'
      )
      this.criaErro(
        repetirSenha,
        'Password and repeat password fields must be the same.'
      )
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false
      this.criaErro(senha, 'Password must be between 6 and 12 characters.')
    }

    return valid
  }

  camposSaoValidos() {
    let valid = true

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove()
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      const label = campo.previousElementSibling.innerText

      if (!campo.value) {
        this.criaErro(campo, `Field "${label}" cannot be blank.`)
        valid = false
      }

      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false
      }

      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false
      }
    }

    return valid
  }

  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'User must be between 3 and 12 characters.')
      valid = false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Username must contain only letters and/or numbers.')
      valid = false
    }

    return valid
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value)

    if (!cpf.valida()) {
      this.criaErro(campo, 'Invalid CPF.')
      return false
    }

    return true
  }

  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-text')
    campo.insertAdjacentElement('afterend', div)
  }
}

const valida = new ValidaFormulario()
