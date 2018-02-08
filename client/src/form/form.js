import React, { Component } from 'react';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billnumber:"",
            billdate:"",
            billcategory1:"",
            billcategory2:"",
            billpaymenttype:"",
            billpayby:"",
            billfor:"",
            billdescription:""
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
                filteredbillcategory2List:result.billcategory2List,
                billpaymenttypeList:result.billpaymenttypeList,
                billpaybyList:result.billpaybyList,
                billforList:result.billforList
              });
              this.setFormDefaultValue();
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
        this.relateCategoryType(name,value);
    }
    handleSubmit(event){
        var formData={
            billlogid:this.state.billlogid,
            billnumber:this.state.billnumber,
            billdate:this.state.billdate,
            billcategory1:this.state.billcategory1,
            billcategory2:this.state.billcategory2,
            billpaymenttype:this.state.billpaymenttype,
            billpayby:this.state.billpayby,
            billfor:this.state.billfor,
            billdescription:this.state.billdescription
        };
        fetch("/form/createRecord",{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
          .then(
            (result) => {
              
            },
            (error) => {

            }
          )
        event.preventDefault();
    }
    relateCategoryType(name,selected){
        if(name === "billcategory1"){
            var billcategory1List=this.state.billcategory1List;
            var billcategory2List=this.state.billcategory2List;
            var currentCategory=billcategory1List.filter((item)=>{
                return item.id===selected;
            })[0];
            var filteredbillcategory2List=billcategory2List.filter((item)=>{
                return item.parentcategorytype===currentCategory.categorytype;
            });
            this.setState({
                filteredbillcategory2List:filteredbillcategory2List
            });
        }
    }
    setFormDefaultValue(){
        const day=this.getCurrentDate();
        this.relateCategoryType("billcategory1",2);
        this.setState({
            billlogid:this.getUUID(),
            billdate:day,
            billcategory1:2,
            billcategory2:1,
            billpaymenttype:3,
            billpayby:1,
            billfor:1
          });
    }
    getUUID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c === 'x' ? r : ((r&0x3)|0x8);
            return v.toString(16);
        }).replace(/-/g,'');
    }
    getCurrentDate(){
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        return yyyy+"-"+mm+"-"+dd;
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
                            <label htmlFor="">数额:</label>
                            <input name="billnumber" type={'number'} value={this.state.billnumber} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label htmlFor="">日期:</label>
                            <input name="billdate" type={'date'} value={this.state.billdate} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label>大类:</label>
                            <select name="billcategory1" value={this.state.billcategory1} onChange={this.handleChange}>
                            {this.state.billcategory1List.map(option => {
                                return <option value={option.id} key={option.id} catetype={option.categorytype}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>小类:</label>
                            <select name="billcategory2" value={this.state.billcategory2} onChange={this.handleChange}>
                            {this.state.filteredbillcategory2List.map(option => {
                                return <option value={option.id} key={option.id} catetype={option.parentcategorytype}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>描述:</label>
                            <textarea name="billdescription" value={this.state.billdescription} onChange={this.handleChange} />
                        </div>
                        <div className="form-field">
                            <label>付款方式:</label>
                            <select name="billpaymenttype" value={this.state.billpaymenttype} onChange={this.handleChange}>
                            {this.state.billpaymenttypeList.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>付款人:</label>
                            <select name="billpayby" value={this.state.billpayby} onChange={this.handleChange}>
                            {this.state.billpaybyList.map(option => {
                                return <option value={option.id} key={option.id}>{option.name}</option>
                            })}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>消费者:</label>
                            <select name="billfor" value={this.state.billfor} onChange={this.handleChange}>
                               {this.state.billforList.map(option => {
                                    return <option value={option.id} key={option.id}>{option.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-field">
                            <button className="form-submit-btn">提交</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
  }

export default Form;