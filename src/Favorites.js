// class to control the logic
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
    }
}


//class to control the visual
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)
        this.tbody = document.querySelector('table.data tbody')
        console.log(this.tbody)        
    }
}


