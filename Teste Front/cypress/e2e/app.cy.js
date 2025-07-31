class RegistroForm {
  elements ={
    titleInput: () => cy.get('#title'),
    titleFeedback: () => cy.get('#titleFeedback'),
    imageUrlInput: () => cy.get('#imageUrl'),
    imageUrlInputFeedback: () => cy.get('#urlFeedback'),
    submitBtn: () => cy.get('#btnSubmit')
  }

  clickSubmit(){
    this.elements.submitBtn().click()
  }

  typeTitle(text){
    if(!text) return;
    this.elements.titleInput().type(text)
  }

  typeUrl(url){
    if(!url) return;
    this.elements.imageUrlInput().type(url)
  }
}

const registroForm = new RegistroForm();


describe('Registro de imagem' , () => {
  describe('Enviar uma imagem com entradas invalidas', () => {
    const imagem = {
      titulo: '',
      url: ''
    }

    
    it('Estou na pagina de cadastro de imagens', () => {
      cy.visit('/')
    })
    it(`Quando eu digito "${imagem.titulo}" no campo do titulo`, () => {
      registroForm.elements.titleInput(imagem.titulo).type('teste')
    })
    it(`Quando eu digito "${imagem.url}" no campo de url`, () => {
      registroForm.typeUrl(imagem.url)
    })
    it('Eu clico no botao de envio', () => {
      registroForm.clickSubmit()
    })
    it('Entao eu devo ver a mensagem "Please type a title for the image" acima do campo de titulo', () => {
      registroForm.elements.titleFeedback().should("contains.text", "Please type a title for the image")
    })
    it('E eu devo ver a mensagem "Please type a valid URL" acima do campo de Url da imagem', () => {
      registroForm.elements.imageUrlInputFeedback().should("contains.text", "Please type a valid URL")
    })
  })

  describe('Enviar uma imagem com entradas validas', (setTimeout) => {
    const imagem = {
      titulo: 'bichinho',
      url: 'https://i.redd.it/totk-rewatching-the-trailers-and-saw-this-one-specific-v0-1pdida9b61ia1.png?width=720&format=png&auto=webp&s=b825b719204147e3b7cdc38dd75261a6f5832ceb'
    }

    it('Estou na pagina de cadastro de imagens', () => {
      cy.visit('/')
    })
    it(`Quando eu digito "${imagem.titulo}" no campo do titulo`, () => {
      registroForm.elements.titleInput(imagem.titulo).type('teste')
    })
    it(`Quando eu digito "${imagem.url}" no campo de url`, () => {
      registroForm.typeUrl(imagem.url)
    })
    it('Eu clico no botao de envio', () => {
      registroForm.clickSubmit()
    })
    it('Entao eu devo ver a mensagem "title for the image" acima do campo de titulo', () => {
      registroForm.elements.titleFeedback().should("contains.text", "Please type a title for the image")
    })
    it('E eu devo ver a mensagem "valid" acima do campo de Url da imagem', () => {
      registroForm.elements.imageUrlInputFeedback().should("contains.text", "Please type a valid URL")
    })

  })
})