import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    // const nameRef = useRef();
    // const emailRef = useRef();
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);

    // Update user
    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { name: updatedName, email: user.email };
        setUser(updatedUser)
    }
    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        // const updatedUser = {...user};
        // updatedUser.email = updatedEmail;
        const updatedUser = { name: user.name, email: updatedEmail }
        setUser(updatedUser)
    }
    const handleUserUpdate = e => {
        // const updatedUser = { name: nameRef.current.value, email: emailRef.current.value }
        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0) {
                    alert('Updated Successfully');
                    setUser({});
                }
            })

        e.preventDefault();
    }





    return (
        <div>
            <h2>Update: {user.name}</h2>
            <p><small>{id}</small></p>
            <form onSubmit={handleUserUpdate}>
                <input onChange={handleNameChange} type="text" value={user.name || ''} />
                <input onChange={handleEmailChange} type="email" value={user.email || ''} />
                {/* <input ref={nameRef} type="text" defaultValue={user.name} />
                <input ref={emailRef} type="email" defaultValue={user.email} /> */}
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;