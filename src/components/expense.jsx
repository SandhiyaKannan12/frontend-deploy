import React, { useState,useEffect } from 'react';
import './expense.css'; // Import external CSS file
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Expense = (props)=>{

    const [category,setCategory]=useState(""); // State for form category
    const [amount, setamount] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState("")

    // const {category,setCategory}=useParams();
   
    const {Users,setUsers}=props
      
    const filteredUsers=Users&&Users?.filter(user=>user.category===category); 


    // useEffect(() => {
    //     console.log("Category:", category); // Check if category is received correctly
    //     console.log("Filtered Users:", filteredUsers); // Check if Users are filtered correctly
    // }, [category, filteredUsers]);


    const handleDelete = async(id) => {
        const response=await axios.delete(`http://localhost:8000/api/${id}`)
        const newUser = Users.filter((ele) => ele._id !== id);
        setUsers(newUser);
        console.log(response)
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!isEdit) {
            const response=await axios.post("http://localhost:8000/api",{
                category:category,
                amount:amount
            });
        
            setUsers([...Users, response.data])
            setCategory("")
            setamount("")
        }
        else {
            const response=await axios.put(`http://localhost:8000/api/${editId}`,{category,amount})
            console.log(response);

            const updatedArray = Users&&Users.map((item) => {
                return item._id === editId ? { ...item, category, amount } : item;
            })
            setUsers(updatedArray);
            setIsEdit(false);
            setEditId("");
            
            setamount("")
        }
    }

    const handleEdit = (user) => {
        setEditId(user._id);
        setIsEdit(true);
        setCategory(user.category);
        setamount(user.amount);
    }

    

    let sum = 0;
    Users&&Users?.map((s) => {
        sum += parseInt(s.amount)
    })

    return (
        <div>
            <h1>{category} Expenses</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Users&&Users?.map((user) => (
                        <tr>
                            <td>{user.category}</td>
                            <td>{user.amount}</td>
                            <td>{user.date}</td>
                            <td >
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                            </td>
                        </tr>
        
                    ))}
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td>Rs.{sum}</td>
                    </tr>
                </tbody>
            </table>
            <form className="add-expense-container" onSubmit={(e) => handleSubmit(e)}>
                <h2>Expense Tracker</h2>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option>All</option>
                    <option>Income</option>
                    <option>Savings</option>
                    <option>Fees</option>
                    <option>Loan</option>
                    <option>Rent</option>
                    <option>Grocery</option>
                </select><br /><br /> 
                <input type="number" value={amount} placeholder='Enter Amount' onChange={(e) => setamount(e.target.value)} required /><br /><br />
                <button type="submit">{isEdit ? "Update" : "Add"}</button>
            </form>
        </div>
    );
};

export default Expense;

