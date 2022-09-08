import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Modal() {

}

async function fetchEmployees() {
    try {
        const res = await fetch("https://randomuser.me/api/?results=12");
        const { results } = await res.json();
        console.log(results);
        return results;
    }
    catch (error) {
        console.error("fetch failure", error);
    }
}

function Employee({ employee }) {
    return (
        <div className='employee_block'>
            <img src={employee.picture.large}
                alt="img"
            />
            <h3>{employee.name.first}</h3>
            <ul>
                <li>{employee.email}</li>
                <li>{employee.location.city}</li>
            </ul>
        </div>
    );
}

function EmployeeList({employees}) {
    return (
        <div className='employee_home'>
            {employees.map(employee => (
                <Employee employee={employee} key={employee.login.uuid}/>
            ))}
        </div>
    );
}

// function renderEmployees(_employee) {
//     return (
//         <div className="employee" data-username={_employee.login.username}>
//           <div className="img-container">
//             <img
//               src='`${_employee.picture.large}`'
//               alt="img"
//             />
//           </div>
//           <div className="name">{_employee.name.first} {_employee.name.last}</div>
//           <div className="email">{_employee.email}</div>
//         </div>
//     )
// }


function Search() {

    return (
        <form className="form">
            <input
                type="search"
                placeholder="search employee directory"
                id="search"
            />
        </form>
    );
}


function Page() {
    const [employeeState, setEmployeeState] = useState({
        employee: []
    });

    useEffect(()=>{
        fetchEmployees().then(
            (result)=>{
                console.log('result:',result)
                setEmployeeState({employee: result});
            }
        );
    }, []);
    

    return (
        <div className='container'>
            <div className='title'>
                <h1>List of Employees</h1>
            </div>
            <Search />
            <div id='employees'>
                <EmployeeList employees={employeeState.employee}/>
            </div>
            <div id='modal'>

            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);