// class to control the logic
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = [
            {
                login: "maykbrito",
                name: "Mayk Brito",
                public_repos: 123,
                followers: 123
            },
            {
                login: "VictorDMoura",
                name: "Victor de Moura",
                public_repos: 123,
                followers: 123
            }

        ]
    }

    delete(user){
        const filteredEntries = this.entries.filter((entry) => entry.login !== user.login)
        this.entries = filteredEntries
        this.update()
    }


}


//class to control the visual
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.tbody = document.querySelector('table.data tbody')
        this.update()
    }

    update(){
        this.removeAllTr()

        this.entries.forEach((user) => {
            const row = this.createRow()
            
            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector('.user a').href =  `https://github.com/${user.login}`
            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = user.login
            row.querySelector('.repositories').textContent = user.public_repos
            row.querySelector('.followers').textContent = user.followers
            row.querySelector('.remove').onclick = () => {
                const isOk = confirm('Tem Certeza que deseja deletar essa linha?')
                if(isOk){
                    this.delete(user)
                    this.update()
                }
            }


            this.tbody.append(row)
        })
    }

    createRow(){
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td class="user">
              <img
                src="https://github.com/maykbrito.png"
                alt="Image do usuário maykbrito"
              />
              <a href="https://github.com/maykbrito">
                <p>Mayk Brito</p>
                <span>/maykbrito</span>
              </a>
            </td>
            <td class="repositories">123</td>
            <td class="followers">1234</td>
            <td class="remove">Remover</td>
        `
        return tr
    }


    removeAllTr(){
        this.tbody.querySelectorAll('tr')
            .forEach((tr) => {
                tr.remove()
            })
    }
}


