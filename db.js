const pg = require('pg');
const uuid = require('uuid');
const {Client} = pg;

const client = new Client('postgres://localhost/acme_department_db');

client.connect();

const HRId = uuid.v4();
const SalesId = uuid.v4();
const MarketingId = uuid.v4();
const ITId = uuid.v4();
const MoeId = uuid.v4();
const LarryId = uuid.v4();
const CurlyId = uuid.v4();
const LucyId = uuid.v4();
const ShepId = uuid.v4();


const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE users(
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  department_id UUID REFERENCES departments(id)
);

INSERT INTO departments(id, name) VALUES('${HRId}', 'HR');
INSERT INTO departments(id, name) VALUES('${SalesId}', 'Sales');
INSERT INTO departments(id, name) VALUES('${MarketingId}', 'Marketing');
INSERT INTO departments(id, name) VALUES('${ITId}', 'IT');


INSERT INTO users(id, name, department_id) VALUES('${MoeId}', 'Moe', '${HRId}');
INSERT INTO users(id, name, department_id) VALUES('${LarryId}', 'Larry', '${HRId}');
INSERT INTO users(id, name, department_id) VALUES('${CurlyId}', 'Curly', '${SalesId}');
INSERT INTO users(id, name, department_id) VALUES('${LucyId}', 'Lucy', '${ITId}');
INSERT INTO users(id, name) VALUES('${ShepId}', 'Shep');
`

const syncAndSeed = async () => {
  await client.query(SQL);
  console.log('success');
};

const findAllUsers = async() => {
  const response = await client.query('SELECT * FROM users');
  return response.rows;
}

const findAllDepartments = async() => {
  const response = await client.query('SELECT * FROM departments');
  return response.rows;
}


module.exports={
  syncAndSeed,
  findAllUsers,
  findAllDepartments
}
