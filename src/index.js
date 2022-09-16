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
        <div className='employee-block'>
            <img src={employee.picture.large}
                alt="img"
            />
            <span className='hidden-username'>{employee.login.username}</span>
            <h3 className='name'>{employee.name.first}</h3>
            <ul>
                <li>{employee.email}</li>
                <li>{employee.location.city}</li>
            </ul>
        </div>
    );
}

function EmployeeList({employees}) {
    return (
        <div className='employee-home'>
            {employees.map(employee => (
                <Employee
                    employee={employee}
                    key={employee.login.uuid}
                />
            ))}
        </div>
    );
}

// function Search() {
//     const blocklist = document.querySelectorAll('.employee-block');
//     const blockarray = Array.from(blocklist);

//     const onSearch = (e) => {
//         e.preventDefault();
//         const value = e.target.value.toLowerCase();
//         if (!value.length) return;
//         console.log(value, blockarray);
//         blockarray.forEach((eblock) => {
//             const name = eblock.querySelector('.name').innerHTML.toLowerCase();
//             const username = eblock.querySelector('.hidden-username').innerHTML.toLowerCase();
//             console.log(username, name);
//             if ((value && name.includes(value)) || username.includes(value)) {
//                 eblock.style.display = "inline-block";
//             } else {
//                 eblock.style.display = "none";
//             }
//         })
//     }

//     return (
//         <input
//             type="search"
//             placeholder="search employee directory"
//             id="search"
//             onChange={onSearch}
//         />
//     );
// }

//{employees}: employee 배열
function Search(props) {

    const onSearch = (e) => {
        e.preventDefault();
        const value = e.target.value.toLowerCase();
        if (!value.length) return;
        console.log(value, props.employees);
        const searchresult = props.employees.filter(
            employee => employee.login.username.toLowerCase().includes(value)
            || employee.name.first.toLowerCase().includes(value)
        )
        props.setEmployeeState({employee: searchresult});
        // const searchresult = employees;
        // searchresult.forEach((employee) => {
        //     const name = employee.name.first.toLowerCase();
        //     const username = employee.login.username.toLowerCase();
        //     console.log(username, name);
        //     if ((value && name.includes(value)) || username.includes(value)) {
        //     } else {
        //     }
        // })
        // setEmployeeState({employee: searchresult});
    }

    return (
        <input
            type="search"
            placeholder="search employee directory"
            id="search"
            onChange={onSearch}
        />
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
            <Search setEmployeeState={setEmployeeState} employees={employeeState.employee}/>
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

//setstate는 비동기적으로 한번에 실행됨
//리액트는 직접조작을 지양
//위에서는 employee리스트 만들고 search로 조작하여 하위로 전달