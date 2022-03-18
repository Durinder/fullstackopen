describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ name: 'Testi Testaaja', username: 'tester', password: 'salainen' })
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
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'salainen' })
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

    describe('and a blog in database', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Blog',
          author: 'Writer',
          url: 'www.google.com',
        })
      })

      it('A blog can be liked', function() {
        cy.get('#allInfo').click()

        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('Blog can be removed by user who added it', function() {
        cy.get('#allInfo').click()

        cy.get('#remove-button').click()
        cy.get('html').should('not.contain', 'Blog Writer')
        cy.get('.notification').should('contain', 'removed Blog by Writer')
      })

      it('Blog cannot be removed by other users', function() {
        cy.createUser({ name: 'Wrong User', username: 'impostor', password: 'salainen' })
        cy.login({ username: 'impostor', password: 'salainen' })

        cy.get('#allInfo').click()
        cy.get('html').should('not.contain', '#remove-button')
      })

      it.only('Blogs are ordered by likes', function() {
        cy.createBlog({ title: 'Another Blog', author: 'Writer', url: 'www.google.com', likes: 3 })
        cy.createBlog({ title: 'And Another Blog', author: 'Writer', url: 'www.google.com', likes: 7 })

        cy.get('button[id=allInfo]')
          .each(($btn) => {
            cy.wrap($btn).click()
          })

        const likes = [7,3,0]
        cy.get('div[id=likes]').each(($likediv, index) => {
          cy.wrap($likediv[0].innerText).should('contains', likes[index])
        })
      })
    })
  })
})