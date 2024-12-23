import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { InfoContext } from "../../../context/InfoContext"

function CustomerForm(){
    const {setInfo}=useContext(InfoContext)

    const navigate=useNavigate()
    return <>
    this is Customer form 
    <button onClick={()=>navigate("/admin/customer")}>back</button>
<input type="text" onChange={($event)=>{

setInfo({details:$event.target.value,role:"Admin"})
}}/>
    </>
}

export default CustomerForm