describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testaaja',
      username: 'tester',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Testi Testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'tester', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Blog')
      cy.get('#author').type('Writer')
      cy.get('#url').type('www.google.com')
      cy.get('#create-button').click()

      cy.get('.notification').should('contain', 'added Blog by Writer')
      cy.contains('Blog Writer')
    })
  })
})