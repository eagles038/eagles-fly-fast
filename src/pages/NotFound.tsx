import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-8">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Frown className="w-full h-full text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-[6rem] font-black text-primary leading-none mb-2">404</h1>
        <p className="text-2xl font-bold text-foreground mb-2">Упс! Страница не найдена</p>
        <p className="text-muted-foreground mb-8">
          Возможно, вы ввели неверный адрес или страница была удалена.
        </p>
        <Button asChild className="btn-primary px-8 py-6 text-base rounded-2xl">
          <a href="/">
            <Home className="w-5 h-5 mr-2" />
            Вернуться на главную
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
