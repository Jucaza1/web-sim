import { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';

 interface ProfileData {
        name: string;  
        email: string;
        profession: string;
}

function ProfilePage() {
   
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/dev/users', {
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
    </div>
  )
}

export default ProfilePage