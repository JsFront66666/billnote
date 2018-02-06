import React, { Component } from 'react';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billNumber:"",
            billDate:"",
            billType:"",
            billCategory1:"",
            billCategory2:"",
            billDescription:"",
            billPaymentType:"",
            billPayBy:"",
            billFor:""
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch("/form/config")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                billtypeList:result.billtypeList,
                billcategory1List:result.billcategory1List,
                billcategory2List:result.billcategory2List,
                billpaymenttypeList:result.billpaymenttypeList,
                billpaybyList:result.billpaybyList,
                billforList:result.billforList
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }
    componentWillUnmount(){
        //if the component unmounts before an AJAX call is complete
    }
    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
    }
    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="">Number:</label>
                            <input name="billNumber" type={'number'} value={this.state.billNumber} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="">Date:</label>
                            <input name="billDate" type={'date'} value={this.state.billDate} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label>Type:</label>
                            <select name="billType" value={this.state.billType}>
                            {this.state.billtypeList.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Category1:</label>
                            <select name="billCategory1" value={this.state.billCategory1} onChange={this.handleChange}>
                            {this.state.billcategory1List.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Category2:</label>
                            <select name="billCategory2" value={this.state.billCategory2} onChange={this.handleChange}>
                            {this.state.billcategory2List.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Description:</label>
                            <textarea name="billDescription" value={this.state.billDescription} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label>PaymentType:</label>
                            <select name="billPaymentType" value={this.state.billPaymentType} onChange={this.handleChange}>
                            {this.state.billpaymenttypeList.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>By:</label>
                            <select name="billPayBy" value={this.state.billPayBy} onChange={this.handleChange}>
                            {this.state.billpaybyList.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>For:</label>
                            <select name="billFor" value={this.state.billFor} onChange={this.handleChange}>
                               {this.state.billforList.map(option => {
                                    return <option value={option.id} key={option.id}>{option.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-field">
                            <button class="form-submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
  }

export default Form;