import React, { useEffect } from 'react';

export default function Authagent() {
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('Token');

      const res = await fetch('http://localhost:5000/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);
    };

    fetchUser();
  }, []);

  return (
    <div>Auth</div>
  );
}
