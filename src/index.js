import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

async function fetchEmployees() {
  try {
    const res = await fetch("https://randomuser.me/api/?results=12");
    const { results } = await res.json();
    return results;
  } catch (error) {
    alert("Fetch Failure. Refresh Recommended.");
  }
}

function Modal(props) {
  return (
    <div
      id="modal-back"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.setIsModal(false);
      }}
    >
      <div
        id="modal"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <img src={props.employee.picture.large} alt="img" />
        <h3 className="name">{props.employee.name.first}</h3>
        <div className="username">{props.employee.login.username}</div>
        <div>{props.employee.email}</div>
        <div>{props.employee.location.city}</div>
      </div>
    </div>
  );
}
//모달 닫기가 안됨 --> 모달이 emp block 아래에 있어서 true false 클릭이 겹침. stopPropagation

function Employee({ employee }) {
  const [isModal, setIsModal] = useState(false);
  return (
    <div
      className="employee-block"
      onClick={() => {
        setIsModal(true);
      }}
    >
      {isModal === true ? (
        <Modal setIsModal={setIsModal} employee={employee} />
      ) : null}
      <img src={employee.picture.large} alt="img" />
      <span className="hidden-username">{employee.login.username}</span>
      <h3 className="name">{employee.name.first}</h3>
      <div>{employee.email}</div>
      <div>{employee.location.city}</div>
    </div>
  );
}

function EmployeeList({ employees }) {
  return (
    <div className="employee-home">
      {employees.map((employee) => (
        <Employee employee={employee} key={employee.login.uuid} />
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
    // if (!value.length) return;
    console.log(value, props.employees);
    const searchresult = props.employees.filter(
      (employee) =>
        employee.login.username.toLowerCase().includes(value) ||
        employee.name.first.toLowerCase().includes(value)
    );
    props.setEmployeeState({ employee: searchresult });
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
  };

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
  const [fetchedState, setFetchedState] = useState({
    employees: [],
  });

  const [employeeState, setEmployeeState] = useState({
    employees: [],
  });

  useEffect(() => {
    fetchEmployees().then((result) => {
      console.log("result:", result);
      setFetchedState({ employees: result });
      setEmployeeState({ employees: result });
    });
  }, []);

  // useEffect(()=>{
  //     console.log('use effect: ', employeeState)
  //     return ()=>{
  //         console.log('return callback: ', employeeState)
  //     }
  // }, [employeeState]);

  return (
    <div className="container">
      <div className="title">
        <h1>List of Employees</h1>
      </div>
      <Search
        setEmployeeState={setEmployeeState}
        employees={fetchedState.employees}
      />
      <div id="employees">
        <EmployeeList employees={employeeState.employees} />
      </div>
    </div>
  );
}

// function Wrapper(props) {
//     const [show, setShow] = useState(true);

//     return <div>
//         <button onClick={()=>setShow(!show)}> SHOW</button>
//         {show && <div {...props} ></div>}
//     </div>
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);

// root.render( <Wrapper><Page /></Wrapper>);
//setstate는 비동기적으로 한번에 실행됨
//리액트는 직접조작을 지양
//위에서는 employee리스트 만들고 search로 조작하여 하위로 전달
