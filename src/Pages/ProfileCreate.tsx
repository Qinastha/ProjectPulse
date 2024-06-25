import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProfileCreate:React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        navigate(token ? "/" : "/login")
    }, [])
    return (
        <div>
            <h1>Create Profile Page</h1>
        </div>
    )
}