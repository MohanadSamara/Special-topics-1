import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>Volunteer App</div>
            <ul style={styles.navLinks}>
                <li><a href="/" style={styles.link}>Home</a></li>
                <li><a href="/opportunities" style={styles.link}>Opportunities</a></li>
                <li><a href="/about" style={styles.link}>About Us</a></li>
                <li><a href="/contact" style={styles.link}>Contact</a></li>
            </ul>
            <div style={styles.authButtons}>
                <button style={styles.button}>Login</button>
                <button style={{ ...styles.button, ...styles.signup }}>Sign Up</button>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1976d2',
        padding: '0.5rem 2rem',
        color: '#fff',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    authButtons: {
        display: 'flex',
        gap: '0.5rem',
    },
    button: {
        background: '#fff',
        color: '#1976d2',
        border: 'none',
        borderRadius: '4px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    signup: {
        background: '#43a047',
        color: '#fff',
    },
};

export default Navbar;