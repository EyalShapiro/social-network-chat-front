import { NavLink, NavLinkRenderProps, type To } from 'react-router';
import { UsernameDisplay } from './UsernameDisplay';

type LinkType = {
  label: string;
  to: To;
};

const LINK: LinkType[] = [
  { label: 'chat', to: { pathname: '/chat' } },
  { label: 'home', to: { pathname: '' } },
];
export function Header({ showUserDisplay = true }: { showUserDisplay?: boolean }) {
  return (
    <header
      style={{
        width: '100%',
        height: '7vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
      }}
    >
      <nav style={{ display: 'flex', alignItems: 'center', gap: 20, flex: 1, justifyContent: 'center' }}>
        {showUserDisplay &&
          LINK.map(({ label, to }, i) => (
            <NavLink key={`${label}-${i}`} to={to} style={navLinkStyles}>
              {label}
            </NavLink>
          ))}
      </nav>
      {showUserDisplay && <UsernameDisplay />}
    </header>
  );
}
const navLinkStyles = ({ isActive }: NavLinkRenderProps) => ({
  textDecoration: isActive ? 'underline' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  padding: '5px 10px',
});
