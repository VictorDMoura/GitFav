import { GithubUser } from "./GithubUser.js"

// class to control the logic
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [] 
    }

    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username){
        try{

            const userExists = this.entries.find(entry => entry.login === username)

            if(userExists){
                throw new Error("Usuário ja cadastrado")
            }
            
            const user = await GithubUser.search(username)

            if(user.login === undefined){
                throw new Error("Usuário não encontrado!")
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        } catch(error){
            alert(error.message)
        }
    }

    delete(user){
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
        this.entries = filteredEntries
        this.update()
        this.save()
    }


}


//class to control the visual
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.tbody = document.querySelector('table.data tbody')
        this.update()
        this.onAdd()
    }

    onAdd(){
        const addButton = this.root.querySelector('.input-wrapper .favorite')
        addButton.onclick = () => {
            const {value} = this.root.querySelector('#input-search')
            this.add(value)
        }
    }

    update(){
        this.removeAllTr()
        
        if(this.entries.length === 0){            
            const emptyTable = this.root.querySelector('.empty.hide')
            const dataTable = this.root.querySelector(".data")
            dataTable.classList.add('empty')
            emptyTable.classList.remove("hide")
        } else if(this.entries.length === 1 && this.root.querySelectorAll(".empty").length > 1) {
            const dataTable = this.root.querySelector(".data.empty")
            const emptyTable = this.root.querySelectorAll(".empty")
            dataTable.classList.remove('empty')
            emptyTable[1].classList.add("hide")
        }



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


