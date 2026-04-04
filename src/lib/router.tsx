import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  params: {},
});

export const useRouter = () => useContext(RouterContext);

interface Route {
  path: string;
  component: React.ComponentType<any>;
}

interface RouterProps {
  children: ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1) || '/';
      setCurrentPath(path);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
};

interface RoutesProps {
  children: ReactNode;
}

export const Routes: React.FC<RoutesProps> = ({ children }) => {
  const { currentPath } = useRouter();

  const routes = Array.isArray(children) ? children : [children];

  for (const route of routes) {
    if (!route || !route.props) continue;

    const { path, element } = route.props;
    const pathPattern = path.replace(/:[^/]+/g, '([^/]+)');
    const regex = new RegExp(`^${pathPattern}$`);
    const match = currentPath.match(regex);

    if (match) {
      return element;
    }
  }

  return null;
};

interface RouteProps {
  path: string;
  element: ReactNode;
}

export const Route: React.FC<RouteProps> = () => null;

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = to;
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export const useParams = (): Record<string, string> => {
  const { currentPath } = useRouter();
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const pathParts = currentPath.split('/').filter(Boolean);

    if (pathParts[0] === 'report' && pathParts[1]) {
      setParams({ slug: pathParts[1] });
    } else {
      setParams({});
    }
  }, [currentPath]);

  return params;
};
