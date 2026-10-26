// const URL = 'https://69f20a88b15130b973526bd8.mockapi.io/'
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login () {
    const { login } = useUser()
    const {register, handleSubmit} = useForm();

    function onLogin(data) {
        
        login(data)

    }

    const inputStlye = "bg-bg border border-borders text-text placeholder:text-text-muted placeholder:text-xs focus:border-accent outline-none p-1.5 rounded-md"

    return (
            <div className="w-full flex flex-1 flex-col items-center justify-center mx-auto overflow-hidden relative p-8">
                <div className="bg-accent rounded-4xl z-1 w-100 h-100 absolute blur-2xl opacity-90 after:w-110 after:h-110  after:absolute after:bg-oro-700 animate-spining after:animate-spining-reverse after:blur-3xl"></div>
                <form className="flex flex-col px-3 gap-1 bg-surface border-borders border w-full sm:max-w-sm rounded-md font-sans z-2" onSubmit={handleSubmit(onLogin)}>
                    <h1 className="p-4 text-3xl text-text font-heading border-b-accent border-b w-full text-center mb-4">Ingresar</h1>
                    <label className="text-text text-sm">Correo electronico</label>
                    <input {...register("email", {required: true})} className={`${inputStlye} mb-4`} type="email" placeholder="Correo electronico"/>

                    <label className="text-text text-sm">Contraseña</label>
                    <input {...register("password", {required: true, maxLength: 20})} className={inputStlye} type="password" placeholder="Contraseña"/>

                    <button type="submit" className="bg-accent text-text-on-accent rounded p-1 my-3 cursor-pointer" >Ingresar</button>
                </form>
            </div>
    )
}