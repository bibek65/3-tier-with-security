import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
    MDBBadge,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBTooltip,

} from "mdb-react-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';




import axios from 'axios';

const API_URL = 'https://192.168.220.139:5000';

interface TodoInterface {
    id: number;
    name: string;
    isCompleted: boolean;
}

const ListTodos = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/todos`);
                console.log('Received data:', data);
                setTodos(data.todos);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    const deleteTodo = async (id: number) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this todo?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await axios.delete(`${API_URL}/todos/${id}`);
                            setTodos((prevInterns: TodoInterface[]) => prevInterns.filter((todo: any) => todo.id !== id));
                            toast.success('Todo Deleted');
                        } catch (error) {
                            console.error('Error deleting todo:', error);
                            toast.error('Error deleting todo. Please try again.');
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    return (
        <>

            <section className="gradient-custom-2 vh-100">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol md="12" xl="10">
                            <MDBCard>
                                <MDBCardHeader className="p-3">
                                    <h5 className="mb-0">
                                        <div>
                                            <MDBIcon className="me-2" />
                                            <FontAwesomeIcon icon={faListCheck} className='mx-1' /> Todo List
                                            <Link to="/create" className=" float-end">
                                                <FontAwesomeIcon icon={faPlus} className='mx-1' />
                                            </Link>
                                        </div>

                                    </h5>
                                </MDBCardHeader>
                                <MDBCardBody>

                                    <MDBTable className="mb-0">
                                        <MDBTableHead>
                                            <tr>
                                                <th scope="col">Todo</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        {
                                            todos.map((todo) => (
                                                <MDBTableBody key={todo.id}>
                                                    <tr className="fw-normal">
                                                        <td className="align-middle">
                                                            <span>{todo.name}</span>
                                                        </td>
                                                        <td className="align-middle">
                                                            <h6 className="mb-0">
                                                                <MDBBadge className="mx-2" color={todo.isCompleted ? "success" : "danger"}>
                                                                    {todo.isCompleted ? 'Done' : 'Not Done'}
                                                                </MDBBadge>
                                                            </h6>
                                                        </td>
                                                        <td className="align-middle">
                                                            <MDBTooltip tag="a"
                                                                title="Edit"
                                                            >
                                                                <Link to={`/edit/${todo.id}`}>
                                                                    <MDBIcon

                                                                        color="success"
                                                                        size="lg"
                                                                        className="me-3"
                                                                    />
                                                                    <FontAwesomeIcon icon={faPen} />

                                                                </Link>
                                                            </MDBTooltip>
                                                            <MDBTooltip
                                                                tag="a"

                                                                title="Remove"
                                                            >
                                                                <MDBIcon

                                                                    color="danger"
                                                                    size="lg"
                                                                    className="me-3"

                                                                />
                                                                <FontAwesomeIcon onClick={() => deleteTodo(todo.id)} icon={faTrashCan} />
                                                            </MDBTooltip>
                                                        </td>
                                                    </tr>

                                                </MDBTableBody>
                                            ))}
                                    </MDBTable>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
            <ToastContainer />
        </>
    );
};

export default ListTodos;
