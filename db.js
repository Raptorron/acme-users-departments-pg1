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
DROP TABLE IF EXISTS deparments;

CREATE TABLE deparments(
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE users(
  id UUID PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  deparment_id UUID REFERENCES deparments(id)
);

INSERT INTO deparments(id, name) VALUES('${HRId}', 'HR');
INSERT INTO deparments(id, name) VALUES('${SalesId}', 'Sales');
INSERT INTO deparments(id, name) VALUES('${MarketingId}', 'Marketing');
INSERT INTO deparments(id, name) VALUES('${ITId}', 'IT');


INSERT INTO users(id, name, deparment_id) VALUES('${MoeId}', 'Moe', '${HRId}');
INSERT INTO users(id, name, deparment_id) VALUES('${LarryId}', 'Larry', '${HRId}');
INSERT INTO users(id, name, deparment_id) VALUES('${CurlyId}', 'Curly', '${SalesId}');
INSERT INTO users(id, name, deparment_id) VALUES('${LucyId}', 'Lucy', '${ITId}');
INSERT INTO users(id, name, deparment_id) VALUES('${ShepId}', 'Shep', '${ITId}');
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
