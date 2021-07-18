
import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [
            {
                "_id": "1",
                "title": "Zapato deportivo 1",
                "src": "./img1.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 46.999,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Zapato deportivo 2",
                "src": "./img2.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 89.999,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Zapato deportivo 3",
                "src": "./img3.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 50.999,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Zapato deportivo 4",
                "src": "./img4.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 35.999,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Zapato deportivo 5",
                "src": "./img5.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 55.999,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Zapato deportivo 6",
                "src": "./img6.jpg",
                "description": "Calzado running",
                "content": "Una zapatilla de entrenamiento diario para quienes tengan una pisada neutra o también si utilizan una plantilla personalizada. Está enfocada principalmente para quienes busquen una máxima amortiguación y que además ésta sea muy suave.",
                "price": 95.999,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = products.filter(product =>{
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("El producto ha sido añadido al carrito.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("¿Quieres eliminar este producto?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };
    
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }
   

    render() {
        const {products, cart,total} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}