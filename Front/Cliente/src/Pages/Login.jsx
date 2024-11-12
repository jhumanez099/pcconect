import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    if (Object.keys(data).length === 0) {
      return console.log("Campos vacíos");
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex flex-column justify-content-center align-items-center  page-background">
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="bg-white rounded card shadow p-4"
          style={{
            width: '100%', // Ancho completo en dispositivos pequeños
            maxWidth: '400px', // Ancho máximo para mantener el formulario compacto
            minHeight: '400px', // Altura mínima para evitar un aspecto aplastado
            maxHeight: '600px', // Altura máxima en dispositivos más grandes
          }}
        >
          <div className="row my-4 gx-5">
            <div className="col-12 text-start">
              <h1 className="text-center mb-4">Iniciar Sesion</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-3">
            {[
              { label: "Usuario", id: "usuario", type: "text" },
              { label: "Contraseña", id: "contraseña", type: "password" }
            ].map((field, index) => (
              <div className="mb-4 row align-items-center" key={index}>
                <label htmlFor={field.id} className="col-sm-4 col-form-label text-end">
                  {field.label}:
                </label>
                <div className="col-sm-8">
                  <input
                    type={field.type}
                    className="form-control"
                    id={field.id}
                    {...register(field.id)}
                  />
                </div>
              </div>
            ))}
            <div className="text-center">
              <button type="submit" className="btn btn-success px-4 py-2">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;
