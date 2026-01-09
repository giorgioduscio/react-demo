import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const sezioni =[
    { label:"Home", icon:'bi-house', path:'/' },
    { label:"Ordinazioni", icon:'bi-basket', path:'/ordinations' },
    { label:"Carrello", icon:'bi-cart3', path:'/cart' },
  ]

  const location = useLocation();
  function selectedClass(path:string){
    return location.pathname===path ?'btn-primary':'btn-outline-secondary'
  }

  return (
    <div className='py-3'>
      {/* Barra di navigazione inferiore con pulsanti */}
      <nav className="fixed-bottom navbar justify-content-evenly text-bg-c1">
        {sezioni.map((sezione, i)=>(
          <div key={i}>
            <Link to={sezione.path}
                  className={"p-1 btn min-w-60px h-60px " + selectedClass(sezione.path)}
                  id={sezione.label.toLowerCase()}>
              <div className="d-flex flex-column align-items-center">
                <i className={'h2 m-0 bi '+sezione.icon} ></i>
                <span className="fs-7 text-truncate">{sezione.label}</span>
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}