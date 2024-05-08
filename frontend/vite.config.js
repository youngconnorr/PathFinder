import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_OPENAI_API_KEY": JSON.stringify(
        env.VITE_APP_OPENAI_API_KEY
      ),
      "process.env.REACT_APP_GOOGLE_MAPS_API_KEY": JSON.stringify(
        env.VITE_APP_GOOGLE_MAPS_API_KEY
      ),
      "process.env.REACT_APP_MAP_ID": JSON.stringify(env.VITE_APP_MAP_ID),
    },
    plugins: [react()],
  };
});
