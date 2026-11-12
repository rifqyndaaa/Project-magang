import { Link } from 'react-router-dom';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="gov-breadcrumb" aria-label="Breadcrumb">
      <div className="gov-container">
        <ol className="gov-breadcrumb-list">
          <li>
            <Link to="/">Beranda</Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index}>
                <span aria-hidden="true">/</span>
                {isLast || !item.to ? (
                  <span aria-current="page" style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to}>{item.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
