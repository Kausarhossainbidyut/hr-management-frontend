import { LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logoutAndClearCache } from "@/features/auth/authSlice";
import { Avatar } from "@/components/shared/Avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAndClearCache());
    navigate("/login");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div />
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2">
            <Avatar name={user.name} />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs leading-tight text-muted">{user.role}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
