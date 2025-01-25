import { RouterProvider } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/config";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouter } from "./pages/Routes";

const queryClient = new QueryClient();
const router = useRouter();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
