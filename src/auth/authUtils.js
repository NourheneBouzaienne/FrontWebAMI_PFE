// authUtils.js
import jwtDecode from "jwt-decode";


export const getUserRole = () => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
        const tokenParts = authToken.split('.');
        if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            const userRole = payload.roles && payload.roles.length > 0 ? payload.roles[0] : null;
            console.log("User role:", userRole);
            return userRole;
        }
    }
    return null;
};

