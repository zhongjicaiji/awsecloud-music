const useDebounce=(fn:Function,delay:number)=>{
    let timer:any=null
  
    return function(...args:any){
        //@ts-ignore
        const context=this
       if(timer) clearTimeout(timer)
        timer=setTimeout(function(){
            fn.apply(context,args)
        },delay)
    }

}
export default useDebounce