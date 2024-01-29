CREATE DATABASE IF NOT EXISTS employee_tracker;
USE employee_tracker;
USE employee_tracker;
SHOW TABLES LIKE 'employee';


SELECT
    e.first_name,
    e.last_name,
    r.title AS role_title,
    d.name AS department
    FROM employee e
        JOIN role r
            ON e.role_id = r.id
        JOIN department d
            ON r.department_id = d.id
    WHERE r.id = 1; 