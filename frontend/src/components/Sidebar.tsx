import { useNavigate } from "react-router"

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <h1>Survey app</h1>
      <div className="buttons">
          <button onClick={() => navigate("/")} className="aside-button">Tous les sondages</button>
          <button onClick={() => navigate("/new")} className="aside-button">Créer un sondage</button>
      </div>
    </aside>
  )
}