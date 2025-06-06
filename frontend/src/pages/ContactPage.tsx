import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Juan Cano",
    role: "Backend Developer",
    image: "/avatares/jucaza_photo.png",
    github: "https://github.com/jucaza1",
    linkedin: "https://www.linkedin.com/in/juan-cano-zamora/",
  },
  {
    name: "Byron Aurelio Panimboza",
    role: "Frontend Developer",
    image: "/avatares/byron_photo.png",
    github: "https://github.com/Byron-115",
    linkedin: "https://www.linkedin.com/in/bpu115/",
  },
  {
    name: "Jairo Trenado",
    role: "Frontend Developer",
    image: "/avatares/jairo_photo.png",
    github: "https://github.com/JairoTreBo",
    linkedin: "https://www.linkedin.com/in/jairo-trenado-bocero-a5b56912a/",
  },
  {
    name: "José Perellón",
    role: "Frontend Developer",
    image: "/avatares/perellon_photo.png",
    github: "https://github.com/Perellon15",
    linkedin: "https://www.linkedin.com/in/josé-antonio-perellón-martínez",
  },
  {
    name: "Paulo Frasco",
    role: "Logo Designer",
    image: "/avatares/paulo_photo.JPEG",
    github: "https://github.com/PauloFnp",
    linkedin: "https://www.linkedin.com/in/paulo-frasco-434805207/"
  }
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 1 + i * 0.3,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.95 }}
        viewport={{ once: true, amount: 0.6 }}
        className="text-4xl font-bold text-gray-800 mb-12"
      >
        Nuestro equipo
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-24 gap-10 justify-items-center">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs text-center space-y-4 
              ${
                index === teamMembers.length - 1
                  ? "lg:col-span-full lg:justify-self-center"
                  : ""
              }`}
          >
            <img
              src={member.image}
              alt={`Avatar de ${member.name}`}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-gray-600">{member.role}</p>
            <div className="flex justify-center gap-4 pt-2">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <img
                  src="/web_logos/icons8-github.svg"
                  alt="GitHub"
                  className="w-6 h-6 hover:opacity-80 transition"
                />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img
                  src="/web_logos/icons8-linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6 hover:opacity-80 transition"
                />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
