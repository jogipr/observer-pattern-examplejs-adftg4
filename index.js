// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h3>Two way Binding Example in Vanila js</h3>`;

let employee = {
  value: '',
};

Object.defineProperty(employee, 'name', {
  get: function () {
    return this.value;
  },
  set: function (value) {
    this.value = value;
    employeeSubscriptions.publish();
  },
});

let employeeSubscriptions = {
  subscribers: [],
  employee,

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  publish() {
    this.subscribers.forEach((sub) => sub(employee));
  },
};

const sourceInput = document.querySelector('#sourceInput');
const targetOutput = document.querySelector('#targetOutput');

sourceInput.addEventListener('keyup', function (e) {
  const {
    target: { value },
  } = e;
  employee.name = value;
});

function updateTarget({ value }) {
  targetOutput.innerHTML = value;
}

employeeSubscriptions.subscribe(updateTarget);
