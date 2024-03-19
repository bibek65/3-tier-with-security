import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://api.bibek65.tech';

const Create = () => {
    const [name, setName] = useState("");
    const [isCompleted, setisCompleted] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!name) {
            toast.error("Please fill the required fields.");
            return;
        }

        try {
            await axios.post(`${API_URL}/todos`, {
                name: name,
                isCompleted: isCompleted
            });
            alert('Intern Added');
            navigate('/');

        } catch (error) {
            console.error("Error adding todo", error);
            toast.error("Error adding todo. Please try again.");
        }
    };


    return (
        <>

            <div className="m-2 p-5">
                <div className="d-flex">
                    <h2 className="">Add Todo</h2>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" onChange={(e) => setisCompleted(e.target.checked)} />
                        <label className="form-check-label">Is Complete</label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"

                    >
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default Create;
