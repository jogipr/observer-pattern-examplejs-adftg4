// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h3>Two way Binding Example in Vanila js</h3>`;

let employee = {
  value: '',
};

const getEmployeeSubscription = (subToEmployee) => {
  const subscribers = [];

  function publish() {
    subscribers.forEach((sub) => sub(subToEmployee));
  }

  Object.defineProperty(subToEmployee, 'name', {
    get: function () {
      return this.value;
    },
    set: function (value) {
      this.value = value;
      publish();
    },
  });

  return {
    subscribe(callback) {
      subscribers.push(callback);
    },
  };
};

const sourceInput = document.querySelector('#sourceInput');
const targetOutput = document.querySelector('#targetOutput');
sourceInput.addEventListener('keyup', updateSource);

function updateSource(e) {
  const {
    target: { value },
  } = e;
  employee.name = value;
}

function updateTarget({ value }) {
  targetOutput.innerHTML = value;
}

let proxyEmp = getEmployeeSubscription(employee);
proxyEmp.subscribe(updateTarget);


//This does not look to me fair solution , but currently it is solving the problem
// will try to clean solution via proxy or better pattern