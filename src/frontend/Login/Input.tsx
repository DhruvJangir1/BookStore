type Props = {
    value:string | number | readonly string[] | undefined,
    typeofInput:string,
    onChangeFx:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    error:String
}

export default function Input({value,onChangeFx,typeofInput,error}:Props){
    return ( 
    <div>
        <label className="block text-[11px] text-zinc-500 mb-1.5 uppercase tracking-widest">
            {typeofInput}
            </label>
            {error &&  <p>{error}</p>}
            <input
                value={value}
                required
                onChange={onChangeFx}
                type={typeofInput}
                placeholder="you@example.com"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 transition-all duration-200"/>
    </div>
            )
}