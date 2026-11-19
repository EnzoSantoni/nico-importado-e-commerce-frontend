// const URL = 'https://69f20a88b15130b973526bd8.mockapi.io/'
import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL;

export default function Login() {
  const { login } = useUser();
  const { register, handleSubmit } = useForm();

  function onLogin(data) {
    login(data);
  }

  const inputStlye =
    "bg-bg border border-borders text-text placeholder:text-text-muted placeholder:text-xs focus:border-accent outline-none p-1.5 rounded-md";

  return (
    <div className="relative mx-auto flex w-full flex-1 flex-col items-center justify-center overflow-hidden p-8">
      <div className="after:animate-spining-reverse absolute z-1 h-100 w-100 animate-spining rounded-4xl bg-accent opacity-90 blur-2xl after:absolute after:h-110 after:w-110 after:bg-oro-700 after:blur-3xl"></div>
      <form
        className="z-2 flex w-full flex-col gap-1 rounded-md border border-borders bg-surface px-3 font-sans sm:max-w-sm"
        onSubmit={handleSubmit(onLogin)}
      >
        <h1 className="mb-4 w-full border-b border-b-accent p-4 text-center font-heading text-3xl text-text">
          Ingresar
        </h1>
        <label className="text-sm text-text">Correo electronico</label>
        <input
          {...register("email", { required: true })}
          className={`${inputStlye} mb-4`}
          type="email"
          placeholder="Correo electronico"
        />

        <label className="text-sm text-text">Contraseña</label>
        <input
          {...register("password", { required: true, maxLength: 20 })}
          className={inputStlye}
          type="password"
          placeholder="Contraseña"
        />

        <button
          type="submit"
          className="my-3 cursor-pointer rounded bg-accent p-1 text-text-on-accent"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
