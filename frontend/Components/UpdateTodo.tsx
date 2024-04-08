import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";


const API_URL = 'https://192.168.220.139:5000';
const UpdateTodo = () => {
    const { id } = useParams();
    const [todo, settodo] = useState({
        name: '',
        isCompleted: false,
    });


    useEffect(() => {
        const fetchtodo = async () => {
            try {
                const response = await axios.get(`${API_URL}/todos/${id}`);
                console.log("Data is", response.data.todo[0]);
                settodo(response.data.todo[0]);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };

        fetchtodo();
    }, [id]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        settodo({ ...todo, [name]: value });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`${API_URL}/todos/${id}`, {
                name: todo.name,
                isCompleted: todo.isCompleted
            });
            navigate('/');

        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };
    return (
        <>
            <div className="m-2 p-5">
                <div className="d-flex">
                    <h2 className="">Edit todo</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control" name="name" value={todo.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" name="isCompleted" checked={todo.isCompleted} onChange={(e) => settodo({ ...todo, isCompleted: e.target.checked })} />
                        <label className="form-check-label" >Is Completed</label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateTodo;
