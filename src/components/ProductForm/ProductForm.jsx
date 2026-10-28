import { useForm } from "react-hook-form";

const inputStyles = 'w-full px-3 py-2 rounded-md border bg-bg -text-sm text-text placeholder:text-text-muted outline-none focus: border-accent';
const errorMessageStyles = 'text-xs text-error';
const inputGroupStyles = "flex flex-col gap-1";
const labelStyles = 'text-sm text-text-muted';




export default function ProductForm({onSave, defaultValues, submitLabel, onCancel, categories}) {
    const {register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues});
    

    async function handleFormSubmit(data) {
        console.log(data)
        const formData = new FormData()
        formData.append("name", data.name);
        formData.append("price", +data.price);
        data.image?.length && formData.append("image", data.image[0]);

        formData.append("createdAt", new Date(data.createdAt).getTime());
        formData.append("category", data.category);
        formData.append("description", data.description);


        // data.image = data.image[0];
        // data.price = +data.price;
        // data.createdAt = new Date(data.createdAt).getTime();
        await onSave(formData)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`bg-surface ${!onCancel ? 'border border-borders' : ''} rounded-lg p-6 flex flex-col gap-4`}>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Producto</label>
                        <input className={inputStyles} {...register("name", {required: true, minLength: 3, maxLength: 50})} type="text" placeholder="Nombre del producto" />
                        {errors.name?.type === 'required' && <span className={errorMessageStyles}>El campo es requerido</span>}
                        {(errors.name?.type === 'minLength' || errors.name?.type === 'maxLength') && <span className={errorMessageStyles}>La cantidad de caracteres no es valida</span>}
                    </div>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Precio</label>
                        <input className={inputStyles} {...register("price", {required: true, min: 1})} type="number" placeholder="Precio"/>
                        {errors.price?.type === 'required' && <span className={errorMessageStyles}>El campo es requerido</span>}
                        {errors.price?.type === 'min' && <span className={errorMessageStyles}>El valor no puede ser menor o igual a 0</span>}
                    </div>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Imagen</label>
                        <input className={inputStyles} {...register("image")} type="file" accept="image/*"/>
                    </div>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Categoria</label>
                        <select className={`${inputStyles} cursor-pointer`} {...register("category")} type="url">
                            <option value="">Seleccioná una categoría</option>
                            {categories.map(c => {
                                return <option className="capitalize" value={c._id} key={c._id}>{c.viewValue}</option>
                            })}
                        </select>
                        {errors.category?.type === 'required' && <span className={errorMessageStyles}>El campo es requerido</span>}
                    </div>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Descripcion</label>
                        <textarea  className={inputStyles} {...register("description")} type="" placeholder="Descripcion"/>
                    </div>
                    <div className={inputGroupStyles}>
                        <label htmlFor="" className={labelStyles}>Fecha</label>
                        <input className={inputStyles} {...register("createdAt")} type="date" placeholder="Fecha en la que se obtuvo el producto"/>
                    </div>
                    <div className="flex gap-3">
                        {onCancel && (
                            <button type="button" onClick={onCancel} className="flex-1 py-2.5 rounded-md border border-borders bg-bg text-sm font-medium text-text hover:border-text-muted cursor-pointer transition-colors duration-200">
                                Cancelar
                            </button>
                        )}
                        <button type="submit" className="flex-1 py-2.5 rounded-md border border-accent bg-accent text-sm font-medium text-text-on-accent hover:bg-accent-hover hover:border-accent-hover cursor-pointer transition-colors duration-200">
                            {submitLabel}
                        </button>
                    </div>
                </form>
    )
}

