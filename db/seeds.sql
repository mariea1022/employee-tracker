USE employee_db;

INSERT INTO department (name)
VALUES ('Finance'),
        ('Engineering'),
        ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Controller', 100000, 1),
        ('Front End Engineer', 150000, 2),
        ('Recruiter', 120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
        ('Harry', 'Styles', 2, NULL),
        ('Megan', 'Stallion', 3, 1),
        ('Ringo', 'Star', 1, 2);