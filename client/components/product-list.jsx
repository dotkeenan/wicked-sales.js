import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
    this.createProducts = this.createProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        this.setState({
          products: products
        });
      })
      .catch(err => console.error(err));
  }

  createProducts() {
    const productList = this.state.products.map(product => {
      return (
        <ProductListItem
          key = {product.productId}
          productId = {product.productId}
          product = {product}
          setView = {this.props.setView}
        />
      );
    });
    return (
      <div className="container product-list-container">
        <div className="row justify-content-center">
          {productList}
        </div>
      </div >
    );
  }

  render() {
    const renderedProducts = this.createProducts();
    return (
      <div className="card-deck justify-content-between mt-5">
        {renderedProducts}
      </div>
    );
  }
}

export default ProductList;
