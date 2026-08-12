import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/app/store";
import { AppRouter } from "@/routes/AppRouter";
import { AuthInitializer } from "@/features/auth/AuthInitializer";

export default function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <AppRouter />
        <Toaster richColors position="top-right" />
      </AuthInitializer>
    </Provider>
  );
}
