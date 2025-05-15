interface ProfileCardProps {
    name: string;
    email: string;
    profession: string;
}

const ProfileCard = ({ name, email, profession }: ProfileCardProps) => {
  return (
    <div className="card shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
        <p className="text-lg font-semibold">Nombre: {name}</p>
        <p className="text-lg font-semibold">Correo: {email}</p>
        <p className="text-lg font-semibold">Profesión: {profession}</p>
    </div>
  )
}

export default ProfileCard;