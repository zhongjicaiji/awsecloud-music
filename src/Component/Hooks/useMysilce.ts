import { useCallback } from "react"



 const sliceMethod:<T>(arr:Array<T>,size:number)=>Array<Array<T>>=useCallback( (arr,size)=>{

  let ans=[]
    for(let i=0;i<arr.length;i+=size){
      ans.push(arr.slice(i,i+size))
    }
  
  return ans

},[]

)
export default sliceMethod

