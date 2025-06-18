-- 1. Create Organization Table
CREATE TABLE IF NOT EXISTS organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    contact_email VARCHAR(255) NOT NULL
);

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(20) NOT NULL CHECK (role IN ('Volunteer', 'Organization')),
    organization_id INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organization(id) ON DELETE SET NULL
);

-- 3. Create Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    location VARCHAR(255),
    organization_id INTEGER NOT NULL,
    hours INTEGER DEFAULT 2,
    FOREIGN KEY (organization_id) REFERENCES organization(id) ON DELETE CASCADE
);

-- 4. Create Contributions Table
CREATE TABLE IF NOT EXISTS contributions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    opportunity_id INTEGER NOT NULL,
    hours INTEGER,
    contributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE
);

-- Optional: Add constraints to ensure data integrity
-- Ensure each opportunity has a valid organization reference
ALTER TABLE opportunities
    ADD CONSTRAINT fk_organization_id FOREIGN KEY (organization_id)
    REFERENCES organization(id) ON DELETE CASCADE;

-- Optional: Add index on frequently queried columns (like user_id and opportunity_id)
CREATE INDEX IF NOT EXISTS idx_user_id ON contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_opportunity_id ON contributions(opportunity_id);

-- Sample data insertion (Optional, replace with your actual data)
INSERT INTO organization (name, description, contact_email) 
VALUES ('HTU', 'Help The Unprivileged Organization', 'contact@htu.org');

INSERT INTO users (email, password, name, phone, role, organization_id) 
VALUES ('mohanad266samara@gmail.com', '12345', 'Mohanad Samara', '0790127623', 'Volunteer', 1);

INSERT INTO opportunities (title, description, date, location, organization_id) 
VALUES ('Help Poor People', 'Join us to help poor people.', '2025-06-21', 'Amman', 1);

INSERT INTO contributions (user_id, opportunity_id, hours) 
VALUES (1, 1, 2);

-- To view the data (Optional)
SELECT * FROM organization;
SELECT * FROM users;
SELECT * FROM opportunities;
SELECT * FROM contributions;
