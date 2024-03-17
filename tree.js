'use strict';

const DATA = [
    {
        id: 1,
        name: "Anthony",
        title: "Mentor",
        supervisor: null,
    },
    {
        id: 2,
        name: "Yung",
        title: "Scrum Master",
        supervisor: 1,
    },
    {
        id: 3,
        name: "Harvey",
        title: "Product Manager",
        supervisor: 2,
    },
    {
        id: 4,
        name: "ByungJoo",
        title: "Dev Lead",
        supervisor: 1,
    },
    {
        id: 5,
        name: "Danbi",
        title: "FE Lead",
        supervisor: 4,
    },
    {
        id: 6,
        name: "Bora",
        title: "UI/UX",
        supervisor: 1,
    },
    {
        id: 7,
        name: "Hawoo",
        title: "BE Engineer",
        supervisor: 4,
    },
    {
        id: 8,
        name: "Yongjun",
        title: "FE Engineer",
        supervisor: 5,
    },
    {
        id: 9,
        name: "Hannah",
        title: "FE Engineer",
        supervisor: 5,
    },
    {
        id: 10,
        name: "Bowon",
        title: "Intern",
        supervisor: 1,
    },
]

let ROOT = null;

class Employee {
    constructor(id, name, title, supervisor = null) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.supervisor = supervisor;
        this.supervisees = new Set();
    }
}

const traverseTree = (node, elem, depth = 0) => {
    const { name, title, supervisees } = node;
    const newElem = document.createElement('div');
    // newElem.textContent = `${depth}, ${name}`;
    newElem.textContent = `${name} (${title})`;
    newElem.setAttribute('style', `margin-left: ${58 * depth}px`);
    newElem.classList.add('cell');
    elem.appendChild(newElem);

    for (let supervisee of supervisees) {
        traverseTree(supervisee, elem, depth + 1);
    }

}

const renderOrgTree = () => {
    const elem = document.getElementById('root');
    traverseTree(ROOT, elem);
}

const main = () => {
    const employees = new Map();

    DATA.forEach(employee => {
        const { id, name, title, supervisor } = employee;
        employees.set(id, new Employee(id, name, title, supervisor));
    });
    
    for (const [id, employee] of employees) {
        const { supervisor: supervisorId } = employee;
        if (supervisorId) {
            const supervisor = employees.get(supervisorId);
            supervisor.supervisees.add(employee);
        } else {
            ROOT = employee;
        }
    }
    
    console.log(employees);
    renderOrgTree();
}

main();




