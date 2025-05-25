import defaultProfileDark32 from  "../assets/logo/user_icon_32_dark.png" 
import defaultProfileLight32 from  "../assets/logo/user_icon_32_light.png" 

interface ProfileCardProps {
    name: string;
    email: string;
    profession: string;
}

const ProfileCard = ({ name, email, profession }: ProfileCardProps) => {
  return (
    <div className="card shadow-md rounded-lg p-4">
       
        <div className="flex items-center mb-4 gap-x-4">
            <img src={defaultProfileDark32} alt="Perfil" className='rounded-full logo-light justify-center'/>
            <img src={defaultProfileLight32} alt="Perfil" className='rounded-full logo-dark justify-center'/>
            <h2 className="text-xl font-bold">{name}</h2>
        </div>
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <p className="text-lg font-semibold">Nombre: {name}</p>
        <p className="text-lg font-semibold">Correo: {email}</p>
        <p className="text-lg font-semibold">Profesión: {profession}</p>
    </div>
  )
}

export default ProfileCard;