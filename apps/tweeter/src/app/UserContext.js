import React from 'react';

const UserContext = React.createContext({
    email: 'byrnes.joel@gmail.com',
    firstName: 'Joel',
    lastName: 'Byrnes',
    username: 'jbyrnes'
});

export default UserContext;
