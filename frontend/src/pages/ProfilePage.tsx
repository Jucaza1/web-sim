import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import { UserContext } from '../context/userContext';
import { API_URL } from '../config';


 interface ProfileData { 
        name: string;  
        email: string;
        profession: string;
}

function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const {setUser, setLoggedIn} = useContext(UserContext);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${API_URL}/users/me`, {
                    method: 'GET',
                    //credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al recuperar los datos del perfil');
                }

                const data = await response.json();
                setProfileData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        }   
        fetchProfileData();
    }, []);

    // Función para cerrar sesión
    // const handleLogout = () => {
    //     document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     localStorage.removeItem('token');

    //     setUser(null);
    //     setLoggedIn(false); 
    //     navigate('/'); 
    // }
    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 204) {
                setUser(null);
                setLoggedIn(false);
                navigate('/');
            } else {
                setError('Error al cerrar sesión');
            }
        } catch (err) {
            if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Error desconocido');
                }
        } 
    }

    if (loading) {
        return <div>Cargando...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!profileData) {
        return <div>No se encontraron datos de perfil.</div>;
    }

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
       <ProfileCard
        name={profileData.name}
        email={profileData.email}
        profession={profileData.profession}
       />
        <div>
            <button 
             className="bg-red-500 text-white px-4 py-2 rounded-full mt-6 hover:bg-red-900 "
             onClick={handleLogout}
         >
               Cerrar sesión
            </button>    
        </div>


    </div>
  )
}

export default ProfilePage