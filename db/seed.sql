USE employee_tracker;

INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Legal'),
    ('Finance');

INSERT INTO role (title, department_id, salary) VALUES
    ('Sales Lead', 2, '100000');
    ('Salesperson', 2, '80000');
    ('Lead Engineer', 1, '150000');
    ('Software Engineer', 1, '135000');
    ('Account Manager', 4, '155000');
    ('Accountant', 4, '125000');
    ('Legal Team Lead', 3, '250000');
    ('Lawyer', 3, '190000');

INSERT INTO employee (
    first_name, 
    last_name,
    role_id,
    manager_id 
    ) VALUES
        ('Michael', 'Cera', 7, NULL),
        ('Fiona', 'Gallagher', 8, 1),
        ('Miles', 'Morales', 3, NULL),
        ('Peter', 'Parker', 4, 3),
        ('Kim', 'Possible', 1, NULL),
        ('Kofi', 'Kingston', 2, 5),
        ('Sam', 'Whitherspoon', 5, NULL),
        ('Michael', 'Scott', 6, 7);
